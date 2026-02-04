const express = require('express');
const router = express.Router();
const multer = require('multer');
const { v4: uuidv4 } = require('uuid');
const { dynamoDB, s3, tableName, bucketName } = require('../config/aws-config');

// Configure multer to use memory storage
const upload = multer({
    storage: multer.memoryStorage(),
    limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
    fileFilter: function (req, file, cb) {
        if (file.mimetype.startsWith('image/')) {
            cb(null, true);
        } else {
            cb(new Error('Only image files are allowed!'), false);
        }
    }
});

// Helper function to upload to S3
async function uploadToS3(file) {
    const fileName = `products/${uuidv4()}-${file.originalname}`;
    const params = {
        Bucket: bucketName,
        Key: fileName,
        Body: file.buffer,
        ContentType: file.mimetype,
        ACL: 'public-read'
    };

    await s3.putObject(params).promise();
    return `https://${bucketName}.s3.${process.env.AWS_REGION}.amazonaws.com/${fileName}`;
}

// CREATE - Add new product
router.post('/', upload.single('image'), async (req, res) => {
    try {
        const { name, price } = req.body;
        console.log('CREATE - Received:', { name, price, hasFile: !!req.file });

        if (!name || !price) {
            return res.status(400).json({ error: 'Name and price are required' });
        }

        const productId = uuidv4();
        let imageUrl = null;

        // Upload image to S3 if provided
        if (req.file) {
            imageUrl = await uploadToS3(req.file);
            console.log('Image uploaded to:', imageUrl);
        }

        const product = {
            'product-id': productId,
            'product-name': name,
            'product-price': parseFloat(price),
            'product-image': imageUrl,
            createdAt: new Date().toISOString()
        };

        const params = {
            TableName: tableName,
            Item: product
        };

        await dynamoDB.put(params).promise();
        console.log('CREATE - Success:', product);
        res.status(201).json(product);
    } catch (error) {
        console.error('CREATE - Error:', error.message, error.stack);
        res.status(500).json({ error: 'Failed to create product', details: error.message });
    }
});

// READ - Get all products
router.get('/', async (req, res) => {
    try {
        const params = {
            TableName: tableName
        };

        const result = await dynamoDB.scan(params).promise();
        console.log('GET ALL - Success, count:', result.Items.length);
        res.json(result.Items || []);
    } catch (error) {
        console.error('Error fetching products:', error);
        res.status(500).json({ error: 'Failed to fetch products' });
    }
});

// READ - Get single product
router.get('/:id', async (req, res) => {
    try {
        const params = {
            TableName: tableName,
            Key: {
                'product-id': req.params.id
            }
        };

        const result = await dynamoDB.get(params).promise();

        if (!result.Item) {
            return res.status(404).json({ error: 'Product not found' });
        }

        console.log('GET ONE - Success');
        res.json(result.Item);
    } catch (error) {
        console.error('Error fetching product:', error);
        res.status(500).json({ error: 'Failed to fetch product' });
    }
});

// UPDATE - Update product
router.put('/:id', upload.single('image'), async (req, res) => {
    try {
        const { name, price } = req.body;
        console.log('UPDATE - Received:', { id: req.params.id, name, price, hasFile: !!req.file });
        const productId = req.params.id;

        // First, get the existing product
        const getParams = {
            TableName: tableName,
            Key: { 'product-id': productId }
        };

        const existingProduct = await dynamoDB.get(getParams).promise();

        if (!existingProduct.Item) {
            return res.status(404).json({ error: 'Product not found' });
        }

        let imageUrl = existingProduct.Item['product-image'];

        // If new image is uploaded
        if (req.file) {
            // Delete old image from S3 if exists
            if (existingProduct.Item['product-image']) {
                const oldImageKey = existingProduct.Item['product-image'].split('.com/')[1];
                if (oldImageKey) {
                    try {
                        await s3.deleteObject({
                            Bucket: bucketName,
                            Key: oldImageKey
                        }).promise();
                        console.log('Old image deleted:', oldImageKey);
                    } catch (err) {
                        console.error('Error deleting old image:', err);
                    }
                }
            }

            // Upload new image
            imageUrl = await uploadToS3(req.file);
            console.log('New image uploaded:', imageUrl);
        }

        const updateParams = {
            TableName: tableName,
            Key: { 'product-id': productId },
            UpdateExpression: 'set #name = :name, #price = :price, #image = :image, updatedAt = :updatedAt',
            ExpressionAttributeNames: {
                '#name': 'product-name',
                '#price': 'product-price',
                '#image': 'product-image'
            },
            ExpressionAttributeValues: {
                ':name': name || existingProduct.Item['product-name'],
                ':price': price ? parseFloat(price) : existingProduct.Item['product-price'],
                ':image': imageUrl,
                ':updatedAt': new Date().toISOString()
            },
            ReturnValues: 'ALL_NEW'
        };

        const result = await dynamoDB.update(updateParams).promise();
        console.log('UPDATE - Success');
        res.json(result.Attributes);
    } catch (error) {
        console.error('UPDATE - Error:', error.message, error.stack);
        res.status(500).json({ error: 'Failed to update product', details: error.message });
    }
});

// DELETE - Delete product
router.delete('/:id', async (req, res) => {
    try {
        const productId = req.params.id;
        console.log('DELETE - Product ID:', productId);

        // First, get the product to find the image URL
        const getParams = {
            TableName: tableName,
            Key: { 'product-id': productId }
        };

        const existingProduct = await dynamoDB.get(getParams).promise();

        if (!existingProduct.Item) {
            return res.status(404).json({ error: 'Product not found' });
        }

        // Delete image from S3 if exists
        if (existingProduct.Item['product-image']) {
            const imageKey = existingProduct.Item['product-image'].split('.com/')[1];
            if (imageKey) {
                try {
                    await s3.deleteObject({
                        Bucket: bucketName,
                        Key: imageKey
                    }).promise();
                    console.log('Image deleted from S3:', imageKey);
                } catch (err) {
                    console.error('Error deleting image:', err);
                }
            }
        }

        // Delete product from DynamoDB
        const deleteParams = {
            TableName: tableName,
            Key: { 'product-id': productId }
        };

        await dynamoDB.delete(deleteParams).promise();
        console.log('DELETE - Success');
        res.json({ message: 'Product deleted successfully' });
    } catch (error) {
        console.error('DELETE - Error:', error.message, error.stack);
        res.status(500).json({ error: 'Failed to delete product', details: error.message });
    }
});

module.exports = router;
