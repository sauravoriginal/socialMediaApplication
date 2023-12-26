const mongoose = require('mongoose');

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
    }
    name:{
        type: "String",
        require: true,
    }
});

const User = mongoose.model('user',userSchema);
module.exports = User;