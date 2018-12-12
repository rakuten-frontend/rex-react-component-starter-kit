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
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin()
  ]
};