const {mongoose}= require('../config/db');
const passEncrypt = require('../utils/passEncrypt');

const UserSchema = new mongoose.Schema({
    firstName:{
        type:String,
        trim:true
    },
    lastName:{
        type:String,
        trim:true
    },
    email:{
        type:String,
        trim:true,
        required: [true, 'Email field must be required'],
        unique: [true, 'There is this email. Email field must be unique'],
        // ? By checking the conformity of the email according to the statements given.
        validate: [
            (email) => /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email),
            'Email type is not correct.'
        ]
    },
    password:{
        type:String,
        required:true,
        // ? It checks the suitability of the password according to the given expressions and saves it by encrypting it.
        set: (password) => {
            if (/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/.test(password)) {
                return passEncrypt(password)
            } else {
                throw new Error('Password type is not correct.')
            }
        },
        select:false 
    },
}, { timestamps: true ,collection: 'users'});

UserSchema.methods.matchPassword = function (enteredPassword) {
    return passEncrypt(enteredPassword) === this.password;
};

module.exports = mongoose.model('User', UserSchema);