'use strict';
const { merge } = require('webpack-merge');
const prodEnv = require('./prod.env');

const dotenv = require('dotenv');
try {
  dotenv.config({path: __dirname+'/./../../.env'});
} catch (e) {
  console.error(e);
}

module.exports = merge(prodEnv, {
  NODE_ENV: JSON.stringify('development'),
  // For development, typically use localhost
  VUE_APP_API_URL: JSON.stringify(process.env.VUE_APP_API_URL || ''),
  VUE_APP_DOMAIN: JSON.stringify(process.env.DOMAIN || ''),
  VUE_APP_API_PORT: JSON.stringify(process.env.API_PORT || ''),
});