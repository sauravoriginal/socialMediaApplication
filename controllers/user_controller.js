module .exports.profile =async (req,res)=>{
    return res.render('user_profile.ejs',{
        title: "profile"
   });}

// exports.signin =async (req,res)=>{
//     return res.end("user sign in  page");
// }
module.exports.signUp = async (req,res)=>{
    return res.render('user_sign_up.ejs',{
        title: "Sign Up"
   });}
   module.exports.signIn = async (req,res)=>{
    return res.render('user_sign_in.ejs',{
        title: "Sign In"
   });}