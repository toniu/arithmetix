const VueLoaderPlugin = require('vue-loader/lib/plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');

module.exports = {
  entry: path.join(__dirname, 'src/main.js'),
  devtool: 'source-map',
  resolve: {
    extensions: ['.ts','.js', '.vue', '.json'],
    alias: {
      '@': path.resolve('src'),
      vue: 'vue/dist/vue.js'
    },
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
      },
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
            },
          },
          'postcss-loader',
        ],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif|pdf)$/i,
        type: 'asset/resource',
        generator: {
          filename: '[name][ext]'
        }
      }
    ],
  },
  
  plugins: [
    new VueLoaderPlugin(),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'public/index.html'),
    }),
    new MiniCssExtractPlugin(),
  ],
  output: {
    publicPath: "/",
  },
  devServer: {
    open: true,
    historyApiFallback: true,
    devMiddleware: {
      writeToDisk: true,
    },
    static: {
      directory: path.resolve(__dirname, 'static'),
      staticOptions: {},
      publicPath: '/static-public-path/',
      serveIndex: true,
      watch: true,
    },
  },
  optimization: {
    minimizer: [
      // For webpack@5 you can use the `...` syntax to extend existing minimizers (i.e. `terser-webpack-plugin`), uncomment the next line
      '...',
      new CssMinimizerPlugin(),
    ],
  },
};
