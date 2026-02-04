require('dotenv').config();
const AWS = require('aws-sdk');

// Configure AWS SDK
AWS.config.update({
  region: process.env.AWS_REGION,
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
});

// Create DynamoDB client
const dynamoDB = new AWS.DynamoDB.DocumentClient();

// Create S3 client
const s3 = new AWS.S3();

module.exports = {
  dynamoDB,
  s3,
  tableName: process.env.DYNAMODB_TABLE_NAME,
  bucketName: process.env.S3_BUCKET_NAME
};
