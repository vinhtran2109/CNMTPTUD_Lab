const AWS = require('aws-sdk');

const endpoint = process.env.DYNAMODB_ENDPOINT || 'http://localhost:8000';

const dynamodb = new AWS.DynamoDB({
  region: 'us-east-1',
  endpoint,
  accessKeyId: 'dummy',
  secretAccessKey: 'dummy'
});

const documentClient = new AWS.DynamoDB.DocumentClient({
  region: 'us-east-1',
  endpoint,
  accessKeyId: 'dummy',
  secretAccessKey: 'dummy'
});

module.exports = { dynamodb, documentClient };
