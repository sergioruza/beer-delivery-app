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
  const key = await secretKey();
  const token = jwt.sign(payload, key);
  return token;
};

module.exports = generateToken;
