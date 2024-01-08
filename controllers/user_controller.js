//import user model
const User = require('../models/user');
const fs = require('fs');
const path = require('path');
const flash = require('connect-flash');

module .exports.profile =async (req,res)=>{
    const user = await User.findById(req.params.id);
    if(user){
        return res.render('user_profile.ejs',{
            title: "User profile",
            profile_user: user
       });
    }
  }

  module.exports.update = async (req,res)=>{
    try{ 
        console.log("inside update function");
        if(req.user.id == req.params.id){
        // const {name,email} = req.body;
        // const user = await User.findByIdAndUpdate(req.params.id,req.body);
        // we cannot use now above line(req.body) as form contains multipart/form-data
        const user = await User.findById(req.params.id);
        User.uploadedAvatar(req,res,function(err){
            if(err){console.log("Error in multer",err);}
            user.name = req.body.name;
            user.email = req.body.email;
            if(req.file){
                //remove if any avatar exist
                if(user.avatar){ // tofix later
                    fs.unlinkSync(path.join(__dirname,'..',user.avatar));
                }
                //this is just saving the path of uploaded file into the avatar field in the user
               user.avatar = User.avatarPath + '/' + req.file.filename
            }
            user.save();
            req.flash('success','your profile has been updated !');
            return res.redirect('back');
        }
        );
        const updateOtherDetails = await User.findByIdAndUpdate(req.params.id,req.body);

        
        
    }else{
        req.flash('error','Unauthorize');
    return res.redirect('back');    
    }
 }catch(err){
    req.flash('error',err);
    return res.redirect('back');

 }
   
  }

// render sign up page
module.exports.signUp = async (req,res)=>{
    //if it is signed in it shouldn't open 'user_sign_up.ejs'
    if(req.isAuthenticated()){
      return res.redirect('/users/profile');
    }
    return res.render('user_sign_up.ejs',{
        title: "Sign Up"
   });}
   // render sign in page
 module.exports.signIn = async (req,res)=>{
     //if it is signed in it shouldn't open 'user_sign_in.ejs'
     if(req.isAuthenticated()){
       return res.redirect('/users/profile');
      }
    return res.render('user_sign_in.ejs',{
        title: "Sign In"
   });}
   // get the sign up data
   module.exports.create = async (req,res)=>{
    try{
        const {email,password,name} = req.body;
        console.log("name is",req.body.name);
        // check whether the confirm password are equal or not
        if(password != req.body.confirm_password){
            return res.redirect('back');
        }
        const userfound =await User.findOne({email});
        if(!userfound){
           const user=await User.create({email,password,name}) ;
           return res.redirect('/users/sign-in');
        }
        //if user is already exist
        return res.redirect('back');
        

    }catch(err){
        console.log("Error in sign up",err);
        res.status(400).json({ error: "Error in signup process" });

    }
    


    }

// get the sign in data
module.exports.createSession = async (req,res)=>{
    // all funcionalities done by passport localStrategy 
    req.flash('success','Logged in Successfully');
    return res.redirect('/');

}

// sign-out
module.exports.destroySession = async(req,res,next)=>{
    //function given by passport
    req.logout((err)=>{
        if(err){return next(err);}
        req.flash('success','You have Logged out!');

        return res.redirect('/');
    });
}