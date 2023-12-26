module .exports.profile =async (req,res)=>{
    return res.render('user_profile.ejs',{
        title: "profile"
   });}

// exports.signin =async (req,res)=>{
//     return res.end("user sign in  page");
// }