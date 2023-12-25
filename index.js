const express= require('express') ;
const app = express();

// to use index routes as base/starting route
app.use('/',require('./routes/index.js'));


app.listen(5000, () => {
    console.log('Server started');
});