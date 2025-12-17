const User = require('../models/User');
const generateToken = require('../utils/generateToken');
const { sendResponse } = require('../utils/sendResponse');
const asyncHandler=require('../middleware/asyncHandler');
const AppError = require('../utils/AppError');

module.exports={
    loginUser: asyncHandler (async(req, res,next) => {

        const { email, password } = req.body;
        const user = await User.findOne({ email }).select('+password');

        if (!user || !(await user.matchPassword(password))) {
            throw new AppError('Wrong password or email', 401);
        }

        const token = generateToken(user._id);

        sendResponse(res,
          {
            message: "Login successful", 
            data: {
            user:{
            _id: user._id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            },
            token
          },
          });
        }),

    registerUser: asyncHandler(async (req, res,next) => {
    const { firstName,lastName, email, password } = req.body;

     if (!firstName || !lastName || !email || !password) {
                throw new AppError("Please provide all required fields", 400);
            }
    const userExists = await User.findOne({ email });

    if (userExists) {
      throw new AppError("This email is already in use", 400);
    }

    const user = await User.create({
      firstName,
      lastName,
      email,
      password 
    });

    const token = generateToken(user._id);

    sendResponse(res,
      {
        message: "User created succesfully.", 
        data: {
        user:{
        _id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        },
        token
      },
        statusCode:201});

}),
  logoutUser: (req, res) => {
    return sendResponse(res, {
      message: "Logout successful. Please remove token on client."
    });
  }
}