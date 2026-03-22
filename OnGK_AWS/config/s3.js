const AWS = require('aws-sdk');
const path = require('path');

const bucket = process.env.S3_BUCKET_NAME;
if (!bucket) throw new Error('Missing S3_BUCKET_NAME');

const s3 = new AWS.S3({ region: process.env.AWS_REGION || 'us-east-1' });

const key = (name = 'image') => {
  const ext = path.extname(name);
  const base = path.basename(name, ext)
    .replace(/[^a-zA-Z0-9-_]/g, '-')
    .replace(/-+/g, '-')
    .toLowerCase();

  return `products/${Date.now()}-${Math.random().toString(36).slice(2)}-${base}${ext.toLowerCase()}`;
};

exports.uploadBuffer = async (buffer, name, type) =>
  (await s3.upload({
    Bucket: bucket,
    Key: key(name),
    Body: buffer,
    ContentType: type
  }).promise()).Location;

exports.deleteByUrl = async (url) => {
  try {
    const Key = decodeURIComponent(new URL(url).pathname.slice(1));
    await s3.deleteObject({ Bucket: bucket, Key }).promise();
  } catch (e) {
    console.warn('Delete failed:', e.message);
  }
};