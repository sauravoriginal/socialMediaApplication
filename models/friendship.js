const mongoose = require('mongoose');
const friendshipSchema = new mongoose.Schema({
    fromUser:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'  

    },
    toUser:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'  

    }
},{
    timestamps:true
});

const Friendship = mongoose.model('Friendship',friendshipSchema);
module.exports = Friendship;
