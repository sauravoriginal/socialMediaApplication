const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User =require('../models/user');
//authentication using passport
passport.use(new LocalStrategy({
    usernameField:'email'
},

    async(email,passport,done)=>{
        try{
        // find a user and establish the identity
        const user =await User.findOne({ email: email });
        if(!user ||user.password!=password){
           console.log("Error in finding username/password");
           return done(null,false); 
        }
        // if user is found
        return done(null,user);
    }catch(err){
        console.log("Error in finding user",err);
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

module.exports = passport;