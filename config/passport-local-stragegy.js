const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User =require('../models/user');
//authentication using passport
passport.use(new LocalStrategy({
    usernameField:'email',
    passReqToCallback:true
},

    async(req,email,password,done)=>{
        try{
        // find a user and establish the identity
        const user =await User.findOne({ email: email });
        if(!user ||user.password!=password){
           req.flash('error','Invalid username/password');
           return done(null,false); 
        }
        // if user is found
        return done(null,user);
    }catch(err){
        req.flash('error',err);
        return done(err);
    }
}

)); 

//serializing the user to decide which key is to be kept in the session cookies
passport.serializeUser((user,done)=>{
    //set id to the cookies
    done(null,user.id);
});


//deserializing the user from the key in the session cookies
passport.deserializeUser(async(id,done)=>{
    try{
        const user = await User.findById(id);
        return done(null,user);
    }catch(err){
        console.log('Error in finding user',err);
        return done(err);
    }
});

//check if the user is authenticated
passport.checkAuthentication = (req,res,next)=>{
    // if the user is signed in ,then pass on the request to the next function(controller's action)
    if(req.isAuthenticated()){
        return next();
    }
    // if the user is not signed in
    return res.redirect('/users/sign-in');
}

passport.setAuthenticatedUser =(req,res,next)=>{
    if(req.isAuthenticated()){ //note req.isAuthenticated() is global function
        // req.user contains the current signed in user  from the session cookie
        // and we are just sending this(req.user) to the locals for the views
        res.locals.user = req.user;
    }
    next();
}

module.exports = passport;