module .exports.profile =async (req,res)=>{
    return res.render('user_profile.ejs',{
        title: "profile"
   });}

// render sign up page
module.exports.signUp = async (req,res)=>{
    return res.render('user_sign_up.ejs',{
        title: "Sign Up"
   });}
   // render sign in page
 module.exports.signIn = async (req,res)=>{
    return res.render('user_sign_in.ejs',{
        title: "Sign In"
   });}
   // get the sign up data
   module.exports.create = async (req,res)=>{
    return res.render('user_profile.ejs',{
        title: "profile"
   });}

// get the sign in data
module.exports.createSession = async (req,res)=>{
    return res.render('user_profile.ejs',{
        title: "profile"
   });}