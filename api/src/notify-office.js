const notify = async () => {
  const fs = require('fs');
  const config = require('./config');
  const DB = require('./db');
  const mail = require('./mail');

  const db = new DB();
  const adminEmails = await db.getAdminOfficeEmails();
  const nonAdminEmails = await db.getNonAdminOfficeEmails();

  let choicesNotApproved = await db.getChoicesNotApproved();
  let choicesNotNotified = await db.getUserModuleChoices();

};
//  Uncomment, then use the command npm run notify-office for testing the emails sent as expected
// notify();

module.exports = notify;
