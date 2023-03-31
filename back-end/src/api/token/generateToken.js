const jwt = require('jsonwebtoken');
const fs = require('fs/promises');

const secretKey = async () => {
  const data = await fs.readFile(
    './jwt.evaluation.key', 
    'utf-8',
  );
  return data;
};

const generateToken = async (payload) => {
  const options = {
    expiresIn: '3d',
    algorithm: 'HS256',
  };
  const key = await secretKey();
  const token = jwt.sign(payload, key, options);
  return token;
};

module.exports = { generateToken, secretKey };
