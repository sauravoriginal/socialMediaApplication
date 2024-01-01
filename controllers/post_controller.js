const Post = require('../models/post');
const Comment = require('../models/comment');
module .exports.create =async (req,res)=>{
    try{
        const post =await Post.create({ content:req.body.content, user:req.user._id });
        return res.redirect('back');
    }catch(err){
        console.log("Error in creating post",err);
        return;
    }

}

module.exports.destroy =async(req,res)=>{
    try{
          const post =await Post.findById(req.params.id);//from url -/posts/destroy/:id
          // req.user._id converted to string my mongoose req.user.id
          // also post.user is ref to user i.e userid
          if(post.user == req.user.id){
            await post.deleteOne();            // delete all comment associated with this post
           const isCommentDltd= await Comment.deleteMany({post: req.params.id});
           if(isCommentDltd){
            console.log("comment associated with post deleted");
            return res.redirect('back');
            
           }

          }
    }catch(err){
        console.log("Error in deleting a post",err);

        return;
    }
}