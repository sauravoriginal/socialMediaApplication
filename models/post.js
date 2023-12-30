const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
   content:{
    type:String,
    require:true
   },
   user:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'User'
   },
   //add all  array of id's belongs to this post in postSchema itself
   comments:[{
    //it refer to one objectId
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Comment'  //refer to comment Schema
}],

},{
    timestamps:true
});



const Post = mongoose.model('Post',postSchema);
module.exports = Post;