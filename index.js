const express= require('express') ;
const expressEjsLayouts = require('express-ejs-layouts');
const expressLayouts =require('express-ejs-layouts');
const cookieParser = require('cookie-parser');

const db =require('./config/mongoose.js');
const app = express();
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

// to use index routes as base/starting route
app.use('/',require('./routes/index.js'));
//setting up views using ejs
app.set('view engine','ejs');
app.set('views', './views'); // same as path.join for html page to send



app.listen(5000, () => {
    console.log('Server started');
});