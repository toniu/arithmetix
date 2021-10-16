const dotenv = require("dotenv");

try {
    dotenv.config({path:__dirname+'/./../../../.env'});
} catch(e) {
    console.error(e);
}

module.exports = {
    secret: process.env.SECRET || 'supersecret',
    port: process.env.API_PORT || 3000,
    email: {
        server: process.env.EMAIL_SERVER,
        port: process.env.EMAIL_PORT || 587,
        address: process.env.EMAIL_ADDRESS,
        name: process.env.EMAIL_USERNAME,
        password: process.env.EMAIL_PASSWORD,
        officeRecipients: process.env.EMAIL_OFFICE_RECIPIENTS,
    }
};