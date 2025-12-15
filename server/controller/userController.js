const User = require('../models/User');

module.exports = {
    list:async (req,res)=>{
        try {
            const users = await User.find().select('-password');

            res.status(200).json({
                success: true,
                count: users.length,
                data: users
            });

        } catch (error) {
            res.status(500).json({ success: false, message: error.message });
        }
    },
    read:async(req,res)=>{
        try {
            const user = await User.findById(req.params.userId).select('-password');

            if (!user) {
                return res.status(404).json({
                    success: false,
                    message: "User not found"
                });
            }

            res.status(200).json({
                success: true,
                data: user
            });

        } catch (error) {
            res.status(500).json({ success: false, message: error.message });
        }
    },
    getMe: async (req, res) => {
    try {
        const user = await User.findById(req.user._id).select("-password");

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        res.status(200).json({
            success: true,
            data: {
        _id: user._id,
        name: user.name,
        email: user.email
      }
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: error.message });
    }
},
    update:async(req,res)=>{
        try {
            const updateData = req.body;

            const updatedUser = await User.findByIdAndUpdate(
                req.params.userId,
                updateData,
                { new: true, runValidators: true }
            ).select('-password');

            if (!updatedUser) {
                return res.status(404).json({
                    success: false,
                    message: "User not found"
                });
            }

            res.status(200).json({
                success: true,
                message: "User updated successfully",
                data: updatedUser
            });

        } catch (error) {
            res.status(500).json({ success: false, message: error.message });
        }
    },

    delete:async(req,res)=>{
        try {
            const deletedUser = await User.findByIdAndDelete(req.params.userId);

            if (!deletedUser) {
                return res.status(404).json({
                    success: false,
                    message: "User not found"
                });
            }

            res.status(200).json({
                success: true,
                message: "User deleted successfully"
            });

        } catch (error) {
            res.status(500).json({ success: false, message: error.message });
        }
    }

}