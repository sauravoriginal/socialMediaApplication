const nodemailer = require('node-mailer');
const ejs = require('ejs');
const path = require('path');

let transporter = nodemailer.createTranport({
    service:'gmail',
    host:'smtp.gmail.com',
    port:587,
    secure:false,
    auth: {
        user: 'sauravsinghdummy2110@gmail.com',//from which we are going to send mail
        pass: 'zbyv reel mnfa smlg' // generted by third part acees token in gmail setting

    }
});


let renderTemplate = (data, relativePath) => {
    let mailHTML;
    ejs.renderFile(
        path.join(__dirname, '../views/mailers', relativePath),
        data,
        function(err, template){
         if (err){console.log('error in rendering template',err); return}
         
         mailHTML = template;
        }
    )

    return mailHTML;
}

module.exports = {
    transporter: transporter,
    renderTemplate:renderTemplate
}