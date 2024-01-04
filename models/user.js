const mongoose = require('mongoose');
// import multer & set up avatar path
const multer = require('multer');
const path = require('path');
const AVATAR_PATH = path.join('/uploads/useres/avatars');

const userSchema = new mongoose.Schema({
    email:{
        type: "String",
        require:true,
        lowercase:true,
        unique:true
    },
    password:{
        type: "String",
        require: true,
    },
    name:{
        type: "String",
        require: true,
    }
},{
    timestamps:true
});

const User = mongoose.model('User', userSchema);
module.exports = User;