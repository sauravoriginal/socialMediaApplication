const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    content:{
        type:String,
        require:true
       },
       user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
       },
       user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Post'
       }
    
    },{
        timestamps:true
    });

    
const Comment = mongoose.model('Comment',postSchema);
module.exports = Comment;
    