const jwt = require('jsonwebtoken');

const generateToken = (userId) => {
  return jwt.sign(
    { id: userId }, // Payload (token içinde saklanacak data)
    process.env.JWT_SECRET, // Secret key
    { expiresIn: '30d' } // 30 gün geçerli
  );
};

module.exports = generateToken;