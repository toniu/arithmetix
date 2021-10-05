const nodemailer = require("nodemailer");

const config = require("./config");

/** Class for dealing with email. */
class Mail {
  /**
   * Send an email
   *
   * @param {string} to - Email address to send the email to
   * @param {string} message - Plaintext email message to send
   * @param {string} [subject=Alert] - Subject line of the email
   * @returns {Promise} Promise object representing a successful email send
   */
  send(to, message, subject="Alert") {
    return new Promise((resolve, reject)=>{
      try {
        const transporter = nodemailer.createTransport({
          
          host: config.email.server,
          port: config.email.port,
          auth: {
            user: config.email.name,
            pass: config.email.password,
          }
        });

        const mailOptions = {
          from: config.email.address,
          to: to,
          subject: subject + ` <Do Not Reply>`,
          text: message,
          html: message.replace(/\n/g, "<br />"),
        };

        transporter.sendMail(mailOptions, function(error, info){
          if (error) {
            reject(error);
          } else {
            resolve();
          }
        });
      } catch(e) {
        reject(e);
      }
    });
  }
}

module.exports = new Mail();