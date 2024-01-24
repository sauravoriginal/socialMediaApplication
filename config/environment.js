const development = {
    name:'development',
    asset_path:'./assets',
    session_cookie_key:'blasomething',
    db:'social_media_app',
    smtp:    {
        service: 'gmail',
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
            user: 'sauravsinghdummy2110@gmail.com',
            pass: 'zbyv reel mnfa smlg'
        }
    },
    google_clientID:"627986290414-2k8s9nu0d9tl0flf77dncsmun6epl5ur.apps.googleusercontent.com",
    google_clientSecret:"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",
    google_callbackURL: "http://localhost:5000/users/auth/google/callback",
    jwt_secret:'codeial',
    
}


const production = {
    name:'production',
    asset_path:process.env.SOCIALMEDIA_ASSET_PATH,
    session_cookie_key:process.env.SOCIALMEDIA_SESSION_COOKIE_KEY,
    db:process.env.SOCIALMEDIA_DB,
    smtp:    {
        service: 'gmail',
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
            user: process.env.SOCIALMEDIA_USER,
            pass:process.env.SOCIALMEDIA_PASS
        }
    },
    google_clientID:process.env.SOCIALMEDIA_GOOGLE_CLIENTID,
    google_clientSecret:process.env.SOCIALMEDIA_GOOGLE_CLIENTSECRET,
    google_callbackURL:process.env.SOCIALMEDIA_GOOGLE_CALLBACKURL,
    jwt_secret:process.env.SOCIALMEDIA_JWT_SECRET
 
}


module.exports = eval(process.env.SOCIALMEDIA_ENVIRONMENT) == undefined ?development :eval(process.env.SOCIALMEDIA_ENVIRONMENT);
