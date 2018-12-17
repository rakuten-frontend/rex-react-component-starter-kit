const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const devMode = process.env.NODE_ENV !== 'production';

module.exports = {
  module: {
    rules: [
      {
        test: /\.(css|scss)$/,
        loaders: [
          devMode ? 'style-loader' : MiniCssExtractPlugin.loader,
          'css-loader', 
          'sass-loader'
        ],
        include: path.resolve(__dirname, '../')
      },
      {
        enforce: 'pre',
        test: /\.(js|jsx)$/,
        loader: 'eslint-loader',
        include: path.resolve(__dirname, '../src/'),
        options: {
          fix: false,
        },
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin()
  ]
};
