    const passport = require('passport');
    const googleStrategy = require('passport-google-oauth').OAuth2Strategy;
    const crypto = require('crypto');
    const User = require('../models/user');
    const env = require('./environment');

    //tell passport to use thid=s google auth strategy
    passport.use(new googleStrategy({
        clientID:env.google_clientID,
        clientSecret:env.google_clientSecret,
        callbackURL:env.google_callbackURL

    },
    async function(accessToken,refreshToken,profile,done){
        console.log("inside kkkkkkk");
        try{
            const user = await User.findOne({email:profile.emails[0].value});
            console.log(profile);
            // if user is found create user as req.user
            if(user){
            return done(null,user);
            }else{
            //if user not found ten create the new user & set it as req.user
            const newUser= await User.create({
                    name:profile.displayName,
                    email:profile.emails[0].value,
                    password:crypto.randomBytes(20).toString('hex')
                });
                if(newUser){
                return done(null,newUser);

                }else{
                    return done(null,false);
                }
            }
        }catch(err){
            console.log("err in google strategy passport", err);
            return done(err, null);
        }
    
    }
    ) );

    module.exports = passport;
