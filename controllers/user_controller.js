//import user model
const User = require('../models/user');
const fs = require('fs');
const path = require('path');
const flash = require('connect-flash');
const forgetPasswordMailer = require('../mailers/forget_password_mailers');

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

// for forgot password 
module.exports.forgotPassword = async (req,res)=>{
    return res.render('forgot_password',{
        title: "Forgot-Password"
    });

}
// send link to mail & navitaion for go t gmail
// sendResetLinkToMail
module.exports.sendResetLinkToMail = async (req, res) => {
    // or we can use req.params.email if we send email inside broser link as /:email
    try {
        const user = await User.findOne({ email: req.body.email });

        if (user) {
            try {
                var emailBody = `
                <h1>Click on the link to reset Password</h1>
                <a href="http://localhost:5000/users/reset-password/?user_id=${user.id}">Reset Password</a>
                `
                const sendMail = await forgetPasswordMailer.forgetPassword(req.body.email,emailBody);
                console.log('sendMail:', sendMail);
                // req.flash('success', 'reset link has been sent to your gmail');

                return res.render('reset_through_gmail', {
                    title: "Reset-Link",
                });
            } catch (error) {
                console.error("Error in forgetPasswordMailer.forgetPassword:", error);
                req.flash('error', 'Failed to send reset link. Please try again.');
                return res.redirect('back');
            }
        } else {
            req.flash('error', 'User does not exist');
            return res.redirect('back');
        }
    } catch (err) {
        console.error("Error in sending reset password mail link:", err);
        req.flash('error', 'Internal server error. Please try again later.');
        return res.redirect('back');
    }
};

// for reset passwword
// for reset password
module.exports.resetPassword = async (req, res) => {
    try {
        const userId = req.query.user_id;

        const user = await User.findOne({ _id: userId });

        if (user) {
            return res.render('reset_password', {
                title: "Reset-Password",
                userId: userId
            });
        } else {
            req.flash('error', 'userId might be tampered');
            console.log("userId might be tampered");
            return res.redirect('/users/sign-in');
        }
    } catch (error) {
        // Handle any errors that might occur during the execution of the code
        console.error('An error occurred:', error);
        req.flash('error', 'An error occurred while processing your request');
        return res.redirect('/users/sign-in');
    }
};

// change password
module.exports.changePassword = async (req, res) => {

    try {
        const userId = req.query.user_id;

        const password = req.body.password;
        const confirmPassword = req.body.confirmPassword;

        const user = await User.findOne({ _id: userId });

        if (user) {
              if (password == confirmPassword) {
                console.log("checking password");
                user.password = password;
                await user.save();
                req.flash('success', 'Password changed sucessfully !');
                return res.redirect('/users/sign-in');
            }
        } else {
            req.flash('error', 'User does not exist or some issue');
            console.log("User does not exist or some issue");
            return res.redirect('/users/sign-in');
        }
    } catch (error) {
        console.error('An error occurred:', error);
        req.flash('error', 'An error occurred while processing your request');
        return res.redirect('/users/sign-in');
    }
};

