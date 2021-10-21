'use strict';
/* Required modules */
const express = require('express');
const config = require('./config');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');

const DB = require('./db');
const mail = require('./mail');
const {body, evResult} = require('express-validator');

/* Tables of the arithmetix database,
order based on populate.sql to avoid errors,
related to primary/foriegn keys */

const tables = [
    'users',
];

const db = new DB();
const app = express();
const router = express.Router();

router.use(bodyParser.urlencoded({extended: false}));
router.use(bodyParser.json());

/* Middle-ware for CORS - allow cross domain */
const allowCD = function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', '*');
    res.header('Access-Control-Allow-Headers', '*');
    next();
  };
app.use(allowCD);

/* Router requests */

/**
 * User authentication
 * Returns informations based on the user's role (student, teacher or admin)
 */
router.post(
  '/login',
  /* Check if the email is actually an email */
  body('email').isEmail(),
  /* Password must be minimum 6 characters long */
  body('password').isLength({min: 6}),
  async (req, res) => {
    /* Call function to find any validation errors using Express validator */
    const errorsFound = evResult(req);
    if (!errorsFound.isEmpty()) {
      console.log({errorsFound: errorsFound.array()});
      return res.status(400).json({errorsFound: errorsFound.array()});
    }

    const email = req.body.email;
    const password = req.body.password;

    /* Create new JSON web token */
    const token = jwt.sign({id: email},
       config.secret,
       {expiresIn: 86400}
    );

    /* Values for client's local storage */
    res.status(200).send({
      auth: true,
      token: token,
      user: email,
    });
  }
)

/* ---- */

app.use(router);

let port = config.port;

let server = app.listen(port, function () {
  console.log('Express server listening on port ' + port);
});

module.exports = {server};