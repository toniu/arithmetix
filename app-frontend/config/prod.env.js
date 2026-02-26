'use strict';

const dotenv = require('dotenv');
try {
  dotenv.config({path: __dirname+'/./../../.env'});
} catch (e) {
  console.error(e);
}

module.exports = {
  NODE_ENV: '"production"',
  // For production, use VUE_APP_API_URL if set, otherwise construct from DOMAIN and PORT
  VUE_APP_API_URL: process.env.VUE_APP_API_URL || undefined,
  VUE_APP_DOMAIN: process.env.DOMAIN,
  VUE_APP_API_PORT: process.env.API_PORT,
};