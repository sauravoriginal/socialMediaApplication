const mongoose = require('mongoose');
// import multer & set up avatar path
const multer = require('multer');
const path = require('path');
const AVATAR_PATH = path.join('/uploads/users/avatars');

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
    },
    avatar:{
        type:"String",
        
    },
},{
    timestamps:true
});

// diskstorage avatar
let storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(__dirname,'..',AVATAR_PATH)) //i.e models/../uploads/users/avatars
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, file.fieldname + '-' + uniqueSuffix)
    }
  })
  
//   const upload = multer({ storage: storage });

const User = mongoose.model('User', userSchema);
module.exports = User;