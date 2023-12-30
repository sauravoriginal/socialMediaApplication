const Comment = require('../models/comment');
const Post = require('../models/post');

module .exports.create =async (req,res)=>{
    try{
        //find the post with postId
        const post = await Post.findById(req.body.post);
        if(post){
            const comment =await Comment.create(
                { 
                content:req.body.content, 
                post:req.body.post,
                user:req.user._id
            }
                );
                if(comment){
                  // adding comment to the post
                  post.comments.push(comment); // given by mongodb
                  post.save();// is called whenever i am updating something   
                  return res.redirect('back');

                }
        }
        
    }catch(err){
        console.log("Error in creating comment",err);
        return;
    }

}
