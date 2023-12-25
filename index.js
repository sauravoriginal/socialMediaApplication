import express from 'express';
const app = express();

app.get('/',(req,res)=>{
    res.end("social media app");
})
app.listen(5000, () => {
    console.log('Server started');
});