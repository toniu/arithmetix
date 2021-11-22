const path = require('path');
const common = require('./webpack.common');
var webpack = require('webpack');
const { merge } = require('webpack-merge');

const env =
  process.env.NODE_ENV === 'testing' ?
    require('./config/test.env') :
    require('./config/prod.env');
    
module.exports = merge(common, {
  mode: 'production',
  output: {
    filename: 'main.[contentHash].js',
    path: path.resolve(__dirname, 'dist'),
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': env,
    }),
  ],
});
