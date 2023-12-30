const Post = require('../models/post');
module .exports.home =async (req,res)=>{
    // console.log(req.cookie);
    // res.cookie('user_id',25);
    // return res.end("Social. media app");
    try{
        //populate the user of each post(by doing popultae 
        // we have whole user object instead of only userobejct id)
        const posts = await Post.find({}).populate('user').exec();
        
        return res.render('home.ejs',{
            title: "Home",
            posts:posts
       });  
    }catch(err){ 
        console.log("error in displaying post",err);
    }
   
}