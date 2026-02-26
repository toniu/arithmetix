'use strict';

const dotenv = require('dotenv');
try {
  dotenv.config({path: __dirname+'/./../../.env'});
} catch (e) {
  console.error(e);
}

module.exports = {
  NODE_ENV: JSON.stringify('production'),
  // For production, use VUE_APP_API_URL if set, otherwise construct from DOMAIN and PORT
  VUE_APP_API_URL: JSON.stringify(process.env.VUE_APP_API_URL || ''),
  VUE_APP_DOMAIN: JSON.stringify(process.env.DOMAIN || ''),
  VUE_APP_API_PORT: JSON.stringify(process.env.API_PORT || ''),
};