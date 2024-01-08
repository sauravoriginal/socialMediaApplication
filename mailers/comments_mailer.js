const nodeMailer = require('../config/nodemailer'); 
//zbyv reel mnfa smlg
//another way of exportin a method
exports.newComment = (comment)=>{
    let htmlString = nodeMailer.renderTemplate({comment: comment},'/comments/new_comment.ejs');
    console.log('inside new comment mailer');
    nodeMailer.transporter.sendMail({
        from:"sauravsinghdummy@gmail.com",
        to:comment.user.email,
        subject: "New Comment published !",
        // html:'<h1>yup your new comment is published</h1>'
        html:htmlString


    },(err,info)=>{
         if(err){console.log("error in sending mail",err); return;}
         console.log("message sent",info);
         return;

    });
}