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
    name:'production'
}


module.exports = development;