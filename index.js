const express= require('express') ;
const app = express();

// to use routes
app.use('/',require('./routes/index.js'));


app.listen(5000, () => {
    console.log('Server started');
});