module .exports.home =async (req,res)=>{
    // return res.end("Social. media app");
    return res.render('home.ejs',{
         title: "Home"
    });
}