module .exports.home =async (req,res)=>{
    console.log(req.cookie);
    res.cookie('user_id',25);
    // return res.end("Social. media app");
    return res.render('home.ejs',{
         title: "Home"
    });
}