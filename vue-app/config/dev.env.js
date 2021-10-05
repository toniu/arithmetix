'use strict';
const merge = require('webpack-merge');
const prodEnv = require('./prod.env');

const dotenv = require('dotenv');
try {
  dotenv.config({path: __dirname+'/./../../.env'});
} catch (e) {
  console.error(e);
}

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  VUE_APP_DOMAIN: process.env.DOMAIN,
  VUE_APP_API_PORT: process.env.API_PORT,
});
