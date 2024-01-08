const Comment = require('../models/comment');
const Post = require('../models/post');
const commentsMailer = require('../mailers/comments_mailer');
const queue = require('../config/kue');
const commetEmailWorker = require('../workers/comment_email_worker');
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
                  await post.save();// is called whenever i am updating something 
                  console.log(post.comments);
                  await comment.populate('user', 'name email');  
                  // commentsMailer.newComment(comment);
            let job = queue.create('emails',comment).save(function(err){
                if(err){
                console.log('Error in sending to the queue',err)
                return;
              }
              console.log('job enqueued',job.id);
  
              });
        
                  req.flash('success','Comment added sucessfully !');
                  return res.redirect('/');

                
        }
        req.flash('error','Error in adding Comment');
        return res.redirect('/');

        
    }catch(err){
        req.flash('error',err);
        return res.redirect('/');
        ;
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
               req.flash('success','Comment deleted sucessfully !');

              
              return res.redirect('back'); 
    
              }else{
                req.flash('error','You cannot delete this comment!');

                return res.redirect('back'); 

              }
           
        
           
    }catch(err){
        console.log("Error in deleting a comment",err);
        req.flash('error',err);

        return res.redirect('back'); 
        
    }
}