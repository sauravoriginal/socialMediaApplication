const nodeMailer = require('../config/nodemailer'); 

// forgetPassword
exports.forgetPassword = async (email,content) => { // user,content
    const emailTo = email;
    // let htmlString = nodeMailer.renderTemplate({comment: comment},'/comments/new_comment.ejs');
    console.log('inside new forgetPassword mailer', email);

    try {
        const info = await nodeMailer.transporter.sendMail({
            from: "sauravsinghdummy@gmail.com",
            to: email,  //user.email
            subject: "reset password for socialMediaApp!",
            html: content,
        });

        console.log("message sent", info);
        return info;
    } catch (err) {
        console.log("error in sending mail", err);
        throw err;
    }
};
