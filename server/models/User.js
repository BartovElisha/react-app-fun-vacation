const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true,
        minlength: 2,
        maxlength: 256,
    },
    email: {
        type: String,
        require: true,
        minlength: 6,
        maxlength: 256,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
        maxlength: 1024,
    },
    isAdmin: {
        type: Boolean,
        default: false
    }    
});

const User = mongoose.model('User', userSchema);

exports.User = User;