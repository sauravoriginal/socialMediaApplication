const Like = require('../models/like');
const Post = require('../models/post');
const Comment = require('../models/comment');


module.exports.toggleLike = async(req,res)=>{
    try{
      // route will be  likes/toggle/?id=abcd&type=post
      // req.query.id - is like id
      // req.query.type - is Post/Comment
      let likeable;
      let deleted  =false;
      if(req.query.type =='Post'){
         likeable = await Post.findById(req.query.id).populate('likes');
      }else{
         likeable = await Comment.findById(req.query.id).populate('likes');

      }
      // check for exsiting like
      let exsitingLike = await Like.findOne({
           likeable:req.query.id,
           onModel:req.query.type,
           user:req.user._id,    // since we are checking autentication already
      })
    // if a like alreday exist then delete it
      if(exsitingLike){
         // pull like id from post/comment schema
          likeable.likes.pull(exsitingLike._id);
          likeable.save();
         //  then delete exsiting like
          exsitingLike.remove();
          deleted=true;

      }else{
        // make a new like
        let newLike = await Like.create({
            likeable:req.query.id,
            onModel:req.query.type,
            user:req.user._id,  
         });
         // push like id into post/comment schema
         likeable.likes.push(newLike._id);  // since we populated likes object inside likeable
         likeable.save();
      }

      return res.json(200,{
               message:'Request successsfull !',
            data:{
              deleted:deleted
             }
         })

    }catch(err){
         console.log(err);
         return res.json(500,{
            message:"Internal server error"
         })  ; 
    }
}
