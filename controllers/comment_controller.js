const Comment = require('../models/comment');
const Post = require('../models/post');
const { findById } = require('../models/user');

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
                
                  // adding comment to the post
                  post.comments.push(comment); // given by mongodb
                  post.save();// is called whenever i am updating something   
                  return res.redirect('/');

                
        }
        
    }catch(err){
        console.log("Error in creating comment",err);
        return;
    }

}

// deleting a comment
module.exports.destroy =async(req,res)=>{
    try{
        const comment = await Comment.findById(req.params.id);//from url -/posts/destroy/:id
          // req.user._id converted to string my mongoose req.user.id
          // also comment.user is ref to user i.e userid
           const currentpost = await Post.findById(comment.post);
        
            if(currentpost && currentpost.user == req.user.id){
                // for deleting comment id from  comment array inside post
                // store post id to fetch commentid from array
                let postId =comment.post;
                await comment.deleteOne(); // delete this comment
                // delete comment id from array and update the post
               const post= await Post.findByIdAndUpdate(postId,{$pull:{comments:req.params.id}});
             
              
              return res.redirect('back'); 
    
              }else{
                return res.redirect('back'); 

              }
           
        
           
    }catch(err){
        console.log("Error in deleting a comment",err);

        return;
    }
}