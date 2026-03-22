const { documentClient, dynamodb } = require('../config/dynamodb');
const { v4: uuidv4 } = require('uuid');

class Product {
  static async init() {
    const params = {
      TableName: 'Products',
      KeySchema: [
        { AttributeName: 'id', KeyType: 'HASH' }
      ],
      AttributeDefinitions: [
        { AttributeName: 'id', AttributeType: 'S' }
      ],
      BillingMode: 'PAY_PER_REQUEST'
    };

    try {
      await dynamodb.createTable(params).promise();
      console.log('Products table created');
    } catch (error) {
      if (error.code !== 'ResourceInUseException') {
        console.error('Error creating table:', error.message);
      }
    }
  }

  static async getAll() {
    try {
      const result = await documentClient.scan({ TableName: 'Products' }).promise();
      return result.Items || [];
    } catch (error) {
      console.error('Error fetching products:', error);
      throw error;
    }
  }

  static async getById(id) {
    try {
      const result = await documentClient.get({
        TableName: 'Products',
        Key: { id }
      }).promise();
      return result.Item || null;
    } catch (error) {
      console.error('Error fetching product:', error);
      throw error;
    }
  }

  static async create(productData) {
    const id = uuidv4();
    try {
      await documentClient.put({
        TableName: 'Products',
        Item: {
          id,
          name: productData.name,
          price: parseFloat(productData.price),
          unit_in_stock: parseInt(productData.unit_in_stock),
          url_image: productData.url_image,
          createdAt: new Date().toISOString()
        }
      }).promise();
      return { id, ...productData };
    } catch (error) {
      console.error('Error creating product:', error);
      throw error;
    }
  }

  static async update(id, productData) {
    let updateExpression = 'SET #name = :name, #price = :price, #unit_in_stock = :unit_in_stock';
    const expressionAttributeNames = {
      '#name': 'name',
      '#price': 'price',
      '#unit_in_stock': 'unit_in_stock'
    };
    const expressionAttributeValues = {
      ':name': productData.name,
      ':price': parseFloat(productData.price),
      ':unit_in_stock': parseInt(productData.unit_in_stock)
    };

    if (productData.url_image) {
      updateExpression += ', #url_image = :url_image';
      expressionAttributeNames['#url_image'] = 'url_image';
      expressionAttributeValues[':url_image'] = productData.url_image;
    }

    updateExpression += ', updatedAt = :updatedAt';
    expressionAttributeValues[':updatedAt'] = new Date().toISOString();

    try {
      const result = await documentClient.update({
        TableName: 'Products',
        Key: { id },
        UpdateExpression: updateExpression,
        ExpressionAttributeNames: expressionAttributeNames,
        ExpressionAttributeValues: expressionAttributeValues,
        ReturnValues: 'ALL_NEW'
      }).promise();
      return result.Attributes;
    } catch (error) {
      console.error('Error updating product:', error);
      throw error;
    }
  }

  static async delete(id) {
    try {
      await documentClient.delete({
        TableName: 'Products',
        Key: { id }
      }).promise();
      return true;
    } catch (error) {
      console.error('Error deleting product:', error);
      throw error;
    }
  }
}

module.exports = Product;
