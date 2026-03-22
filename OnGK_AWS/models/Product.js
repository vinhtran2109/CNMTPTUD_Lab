const { documentClient, dynamodb } = require('../config/dynamodb');
const { v4: uuid } = require('uuid');

const TABLE = 'Products';

const Product = {
  init: async () => {
    try {
      await dynamodb.createTable({
        TableName: TABLE,
        KeySchema: [{ AttributeName: 'id', KeyType: 'HASH' }],
        AttributeDefinitions: [{ AttributeName: 'id', AttributeType: 'S' }],
        BillingMode: 'PAY_PER_REQUEST'
      }).promise();
      console.log('Table created');
    } catch (e) {
      if (e.code !== 'ResourceInUseException') throw e;
    }
  },

  getAll: async () =>
    (await documentClient.scan({ TableName: TABLE }).promise()).Items || [],

  getById: async (id) =>
    (await documentClient.get({ TableName: TABLE, Key: { id } }).promise()).Item || null,

  create: async ({ name, price, unit_in_stock, url_image = '' }) => {
    const item = {
      id: uuid(),
      name,
      price: +price,
      unit_in_stock: +unit_in_stock,
      url_image,
      createdAt: new Date().toISOString()
    };
    await documentClient.put({ TableName: TABLE, Item: item }).promise();
    return item;
  },

  update: async (id, data) => {
    const now = new Date().toISOString();

    const names = {
      '#name': 'name',
      '#price': 'price',
      '#stock': 'unit_in_stock',
      ...(data.url_image && { '#img': 'url_image' })
    };

    const values = {
      ':name': data.name,
      ':price': +data.price,
      ':stock': +data.unit_in_stock,
      ':updatedAt': now,
      ...(data.url_image && { ':img': data.url_image })
    };

    const updateExp =
      'SET #name=:name, #price=:price, #stock=:stock, updatedAt=:updatedAt' +
      (data.url_image ? ', #img=:img' : '');

    return (
      await documentClient.update({
        TableName: TABLE,
        Key: { id },
        UpdateExpression: updateExp,
        ExpressionAttributeNames: names,
        ExpressionAttributeValues: values,
        ReturnValues: 'ALL_NEW'
      }).promise()
    ).Attributes;
  },

  delete: async (id) => {
    await documentClient.delete({ TableName: TABLE, Key: { id } }).promise();
    return true;
  }
};

module.exports = Product;