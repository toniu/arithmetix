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
  NODE_ENV: '"development"',
  // For development, typically use localhost
  VUE_APP_API_URL: process.env.VUE_APP_API_URL || undefined,
  VUE_APP_DOMAIN: process.env.DOMAIN,
  VUE_APP_API_PORT: process.env.API_PORT,
});