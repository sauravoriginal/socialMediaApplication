const express= require('express') ;
const expressEjsLayouts = require('express-ejs-layouts');
const app = express();
const expressLayouts =require('express-ejs-layouts');
// before routes i.e before views we need layouts
app.use(expressEjsLayouts);
// to use index routes as base/starting route
app.use('/',require('./routes/index.js'));
//setting up views using ejs
app.set('view engine','ejs');
app.set('views', './views'); // same as path.join for html page to send



app.listen(5000, () => {
    console.log('Server started');
});