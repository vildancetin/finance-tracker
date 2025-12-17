const User = require('../models/User');
const { sendResponse } = require('../utils/sendResponse');
const AppError = require('../utils/AppError');
const asyncHandler = require('../middleware/asyncHandler');

module.exports = {
    list:asyncHandler(async (req,res,next)=>{

            const users = await User.find().select('-password');
            sendResponse(res,
              {
                message:"Users fetched successfully",
                data: {
                    users,
                    count: users.length
                },
            });
    }),
    read:asyncHandler(async(req,res,next)=>{
            const user = await User.findById(req.params.userId).select('-password');

            if (!user) {
                throw new AppError("User not found", 404);
            }
            sendResponse(res,
              {
                message:"User fetched successfully",
                data:user,
            });
    }),
    getMe: asyncHandler(async (req, res,next) => {
        const user = await User.findById(req.user._id).select("-password");
        if (!user) {
            throw new AppError("User not found", 404);
        }
        sendResponse(res,{
            data: {
        _id: user._id,
        name: user.name,
        email: user.email
      },
      message: "User fetched successfully"
        })
}),
    update: asyncHandler(async (req, res,next) => {
        const updateData = req.body;

            const updatedUser = await User.findByIdAndUpdate(
                req.params.userId,
                updateData,
                { new: true, runValidators: true }
            ).select('-password');

            if (!updatedUser) {
                throw new AppError("User not found", 404);
            }
           return sendResponse(res, {
        message: "User updated successfully",
        data: updatedUser,
      });
    }),

    delete: asyncHandler(async (req, res,next) => {
        const deletedUser = await User.findByIdAndDelete(req.params.userId);

            if (!deletedUser) {
                throw new AppError("User not found", 404);
            }
      return sendResponse(res, {
        message: "User deleted successfully",
        data: null,
      });
})
}