'use strict';
const { merge } = require('webpack-merge');
const devEnv = require('./dev.env');
const dotenv = require('dotenv');
try {
  dotenv.config({path: __dirname+'/./../../.env'});
} catch (e) {
  console.error(e);
}
module.exports = merge(devEnv, {
  NODE_ENV: '"testing"',
  VUE_APP_DOMAIN: process.env.DOMAIN,
  VUE_APP_API_PORT: process.env.API_PORT,
});
