const express= require('express') ;
const expressEjsLayouts = require('express-ejs-layouts');
const expressLayouts =require('express-ejs-layouts');
const app = express();
const cookieParser = require('cookie-parser');

const db =require('./config/mongoose.js')
// import expres session
const session = require('express-session');
//import passport 
const passport = require('passport');
// import passport local starategey
const passportLocal = require('./config/passport-local-stragegy.js');
// import mongo store to reduce the session time out for cookie or server restart
const MongoStore= require('connect-mongo');
// for saas middleware
const sassMiddleware = require('node-sass-middleware');
// import connect-flash 
const flash = require('connect-flash');
const customMware = require('./config/middleware.js');
app.use(sassMiddleware({
    /* Options */
    src: './assets/scss',
    dest: './assets/css',
    debug:true,
    outputStyle: 'extended',
    prefix:'/css'
}));
//for cookie parser
app.use(express.urlencoded());
app.use(cookieParser());

//// before routes i.e before views we need static files to be accessed
app.use(express.static('./assets'));
// mnake the uploads path availabe to the browser
app.use('/uploads',express.static(__dirname+'/uploads'));

// before routes i.e before views we need layouts
app.use(expressEjsLayouts);
//extract the style from sub pages into layout
app.set('layout extractStyles',true);
app.set('layout extractScripts',true);


//setting up views using ejs
app.set('view engine','ejs');
app.set('views', './views'); // same as path.join for html page to send

//mongo store is used to store the session cookie in db
//after we set the views -use passport middliware
app.use(session({
    name:'codial',
    // TODO change the secrete  before deploymet in production code
    secret:'blasomething', //to encode 
    saveUninitialized:false,
    resave:false,
    cookie:{
        maxAge:(1000 * 60 * 100)
    },
    store: new MongoStore(
        {
            mongoUrl: "mongodb://127.0.0.1:27017/social_media_app", // Specify your database name
            collection: 'session', 

            autoRemove:'disabled'
        },(err)=>{console.log(err || 'connect-mongodb setup ok');}
    )

}));

app.use(passport.initialize());
app.use(passport.session());
// each time this middle ware need to run 
app.use(passport.setAuthenticatedUser);

// after session is set and above the routes we use flash middleware
app.use(flash());
app.use(customMware.setFlash);

// to use index routes as base/starting route
app.use('/',require('./routes/index.js'));

app.listen(5000, () => {
    console.log('Server started at http://localhost:5000');
});