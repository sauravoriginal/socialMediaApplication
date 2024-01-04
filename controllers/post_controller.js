const Post = require('../models/post');
const Comment = require('../models/comment');
module .exports.create =async (req,res)=>{
    try{
        const post =await Post.create({ content:req.body.content, user:req.user._id });
        if(req.xhr){
            return res.status(200).json({
                data:{
                    post:post
                },
                message:"Post created !"
            });
        }
        req.flash('success','Post published !');
        return res.redirect('back');
    }catch(err){
        req.flash('error',err);

        return res.redirect('back');
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
           req.flash('success','Post & associated comments deleted !');

            return res.redirect('back');
            
           

          }else{
            req.flash('error','You cannot delete this post!');

            return res.redirect('back');

          }
    }catch(err){
        req.flash('error',err);
        return res.redirect('back');
    }
}