//import user model
const User = require('../models/user');
module .exports.profile =async (req,res)=>{
    return res.render('user_profile.ejs',{
        title: "profile"
   });}

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
        const {email,password} = req.body;
        console.log("name is",req.body.name);
        // check whether the confirm password are equal or not
        if(password != req.body.confirm_password){
            return res.redirect('back');
        }
        const userfound =await User.findOne({email});
        if(!userfound){
           const user=await User.create({email,password}) ;
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
    return res.redirect('/');

}

// sign-out
module.exports.destroySession = async(req,res,next)=>{
    //function given by passport
    req.logout((err)=>{
        if(err){return next(err);}
        return res.redirect('/');
    });
}