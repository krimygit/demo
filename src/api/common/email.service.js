const handlebars = require("handlebars");
const { google } = require("googleapis");
const nodemailer = require("nodemailer");
const OAuth2 = google.auth.OAuth2;

let BASE_PATH;
BASE_PATH = __dirname.split("\\");
BASE_PATH.splice(-1, 1);
BASE_PATH = BASE_PATH.join("/");

const sendMail = async (mail) => {
    try {
        const oauth2Client = new OAuth2(
            process.env.CLEINT_ID, // ClientID
            process.env.CLIENT_SECRET, // Client Secret
            process.env.GOOGLE_REDIRECT_URI // Redirect URL
        );
        oauth2Client.setCredentials({
            refresh_token: process.env.REFRESHTOKEN,
        });
        const accessToken = await oauth2Client.getAccessToken();
        const smtpTransport = nodemailer.createTransport({
            service: "gmail",
            auth: {
                type: "OAuth2",
                user: "joseph.meza112@gmail.com",
                clientId: process.env.CLEINT_ID,
                clientSecret: process.env.CLIENT_SECRET,
                refreshToken: process.env.REFRESHTOKEN,
                accessToken: accessToken,
            },
            tls: {
                rejectUnauthorized: false,
            },
        });
        // const template = handlebars.compile(mail.html)({
        //     url: mail.url,
        // });
        const mailOptions = {
            from: '"joseph.meza112@gmail.com" "<joseph.meza112@gmail.com">',
            to: mail.to,
            cc: [],
            subject: mail.subject,
            generateTextFromHTML: true,
            html: mail.html,
        };

        smtpTransport.sendMail(mailOptions, (error, response) => {
            error ? console.error("error", error) : console.info(response);
            smtpTransport.close();
        });
        return true;
    } catch (error) {
        console.error(error);
    }
};

module.exports = { sendMail };
