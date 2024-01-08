const Post = require('../../../models/post');
const Comment = require('../../../models/comment');
module.exports.index =async (req,res)=>{
    try{const posts = await Post.find({})
    .sort('-createdAt') 
    .populate('user')
    .populate({
         path:'comments',
         populate: {
            path:'user'
         }
    });
    return res.json(200,{
        message:"List of posts",
        posts:posts
    });
}catch(err){
    console.log(err);
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
          

           return res.json(200,{
            message:"post and its associated comments got deleted",
            
        });            
    }else{
        return res.json(401,{
            message:"You cannot delete this post"
        })
    }   

          
    }catch(err){
        console.log(err);
        return res.json(500,{
            message:"Internal server error",
            
            
        });  
    }
}