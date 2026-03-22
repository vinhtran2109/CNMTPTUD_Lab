const AWS = require('aws-sdk');

const config = {
  region: process.env.AWS_REGION || 'us-east-1',
  ...(process.env.DYNAMODB_ENDPOINT && { endpoint: process.env.DYNAMODB_ENDPOINT }),
  ...(process.env.AWS_ACCESS_KEY_ID && process.env.AWS_SECRET_ACCESS_KEY && {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
  })
};

const dynamodb = new AWS.DynamoDB(config);
const documentClient = new AWS.DynamoDB.DocumentClient(config);

module.exports = { dynamodb, documentClient };