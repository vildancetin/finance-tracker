const User = require('../models/User');
const generateToken = require('../utils/generateToken');
module.exports={
    loginUser: async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email }).select('+password');

        if (!user || !(await user.matchPassword(password))) {
        return res.status(401).json({ message: 'Wrong password or email' });
        }

        const token = generateToken(user._id);

        res.json({
        success: true,
        data: {
            _id: user._id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            token
            }
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
    },
    registerUser: async (req, res) => {
  try {
    const { firstName,lastName, email, password } = req.body;

     if (!firstName || !lastName || !email || !password) {
                return res.status(400).json({
                    success: false,
                    message: "All fields required."
                });
            }
    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(400).json({ message: 'This email is already in use' });
    }

    const user = await User.create({
      firstName,
      lastName,
      email,
      password 
    });

    const token = generateToken(user._id);

    res.status(201).json({
      success: true,
      message: "User created succesfully.",
      data: {
        _id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        token
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
},
  logoutUser: (req, res) => {
    try {
      
      res.status(200).json({
        success: true,
        message: "Logout successful. Please remove token on client."
      });

    } catch (error) {
      console.log(error);
      res.status(500).json({
        success: false,
        message: "Server error during logout"
      });
    }
  }
}