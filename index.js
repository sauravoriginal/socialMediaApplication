const express= require('express') ;
const app = express();

// to use index routes as base/starting route
app.use('/',require('./routes/index.js'));
//setting up views using ejs
app.set('view engine','ejs');
app.set('views', './views'); // same as path.join for html page to send



app.listen(5000, () => {
    console.log('Server started');
});