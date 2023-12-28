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

//for cookie parser
app.use(express.urlencoded());
app.use(cookieParser());

//// before routes i.e before views we need static files to be accessed
app.use(express.static('./assets'));
// before routes i.e before views we need layouts
app.use(expressEjsLayouts);
//extract the style from sub pages into layout
app.set('layout extractStyles',true);
app.set('layout extractScripts',true);


//setting up views using ejs
app.set('view engine','ejs');
app.set('views', './views'); // same as path.join for html page to send

//after we set the views -use passport middliware
app.use(session({
    name:'codial',
    // TODO change the secrete  before deploymet in production code
    secret:'blasomething', //to encode 
    saveUninitialized:false,
    resave:false,
    cookie:{
        maxAge:(1000 * 60 * 100)
    }

}));

app.use(passport.initialize());
app.use(passport.session());
// to use index routes as base/starting route
app.use('/',require('./routes/index.js'));

app.listen(5000, () => {
    console.log('Server started at http://localhost:5000');
});