const { sendResponse } = require('../utils/sendResponse');
module.exports = (err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Something went wrong';
    console.log('errorHandler worked.')
    
    return sendResponse(res, {
    success: false,
    message,
    data: null,
    statusCode
  });
}