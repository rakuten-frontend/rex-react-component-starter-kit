const webpack = require('webpack');
const merge = require('webpack-merge');
const pathResolve = require('path').resolve;
const CleanWebpackPlugin = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ClosureCompiler = require('google-closure-compiler-js').webpack;
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const packageInfo = require('./package.json');

const libraryName = packageInfo.name
  .toLowerCase()
  .replace(/(\b|-)\w/g, m => m.toUpperCase().replace(/-/, ''));
const pathSrc = pathResolve('./src');
const pathNodeModules = pathResolve('./node_modules');

// Webpack entry and output settings
const entry = {};
entry[packageInfo.name] = './src/MyComponent.jsx';

// Webpack config
const mode = 'production';
const name = 'production.config';
const filename = `[name].production.min`;
const filenameJS = `${filename}.js`;
const filenameCSS = `${filename}.css`;

const output = {
  path: pathResolve(__dirname, `build/node_modules/${packageInfo.name}`),
  publicPath: '/',
  filename: filenameJS,
  chunkFilename: filenameJS,
  library: libraryName,
  libraryTarget: 'umd',
  umdNamedDefine: true,
  jsonpFunction: `${libraryName}OnDemand`
};

// Eslint
const eslintLoader = {
  enforce: 'pre',
  test: /\.(js|jsx)$/,
  exclude: /node_modules/,
  loader: 'eslint-loader',
  options: {
    fix: true,
  },
};

// Babel support for ES6+
const babelLoader = {
  test: /\.(js|jsx)$/,
  exclude: /node_modules/,
  use: {
    loader: 'babel-loader',
  },
};

// Creates style nodes from JS strings
const extracCssLoader = {
  loader: MiniCssExtractPlugin.loader,
};

// Translates CSS into CommonJS
const cssLoader = {
  loader: 'css-loader',
  options: {
    includePaths: [pathSrc, pathNodeModules],
  },
};

// Compiles Sass to CSS
const sassLoader = {
  loader: 'sass-loader',
  options: {
    includePaths: [pathSrc],
  },
};

// Styles loader for Css and Sass
const stylesLoader = {
  test: /\.(css|scss)$/,
  use: [extracCssLoader, cssLoader, sassLoader],
};

const fileLoader = {
  test: /\.(woff|woff2|eot|ttf|otf)$/,
  use: ['file-loader'],
};

// Resolve extenstions for JS and JSX
const resolve = {
  extensions: ['*', '.js', '.jsx'],
  modules: [pathSrc, pathNodeModules],
};

// Use React as external library from CDN
const externals = {
  react: {
    root: 'React',
    commonjs2: 'react',
    commonjs: 'react',
    amd: 'react',
    umd: 'react',
  },
  'react-dom': {
    root: 'ReactDOM',
    commonjs2: 'react-dom',
    commonjs: 'react-dom',
    amd: 'react-dom',
    umd: 'react-dom',
  },
};

// Webpack Plugins:
// Clean build folder
const cleanBuildPlugin = new CleanWebpackPlugin(['build']);

// Extract CSS from javascript bundle
const cssExtractPlugin = new MiniCssExtractPlugin({
  filename: filenameCSS,
  chunkFilename: filenameCSS,
});

// Google Closure compiler instead of uglify
const googleClosureCompiler = new ClosureCompiler({
  options: {
    compilationLevel: 'SIMPLE',
    languageIn: 'ECMASCRIPT5_STRICT',
    languageOut: 'ECMASCRIPT5_STRICT',
    warningLevel: 'QUIET',
    applyInputSourceMaps: false,
    useTypesForOptimization: false,
    processCommonJsModules: false,
    rewritePolyfills: false,
  },
});

// Optimize css output
const optimizeCss = new OptimizeCSSAssetsPlugin({
  cssProcessorOptions: {
    discardComments: {
      removeAll: false,
    },
  },
});

// NPM settings
const npmIndexJSPlugin = new CopyWebpackPlugin([
  {
    from: './npm/index.tpl',
    to: `index.js`,
    transform(content) {
      return content
        .toString()
        .replace(/__COMPONENT_NAME__/g, packageInfo.name);
    },
  },
]);

const npmReadmePlugin = new CopyWebpackPlugin([
  {
    from: './npm/README.tpl',
    to: `README.md`,
    transform(content) {
      return content
        .toString()
        .replace(/__COMPONENT_NAME__/g, packageInfo.name);
    },
  },
]);

const npmPackagePlugin = new CopyWebpackPlugin([
  {
    from: './npm/package.tpl',
    to: `package.json`,
    transform(content) {
      return content
        .toString()
        .replace(/__COMPONENT_NAME__/g, packageInfo.name)
        .replace(/__VERSION__/g, packageInfo.version)
        .replace(/__DESCRIPTION__/g, packageInfo.description)
        .replace(/__REACT_VERSION__/g, packageInfo.dependencies.react)
        .replace(
          /__REACT_DOM_VERSION__/g,
          packageInfo.dependencies['react-dom']
        );
    },
  },
]);

// License
const npmLicencePlugin = new CopyWebpackPlugin([
  {
    from: './LICENSE',
  },
]);

// Copyright
const copyrightDate = new Date().toISOString().split('T')[0];
const copyright = `
@license ${packageInfo.name} v${packageInfo.version} ${copyrightDate}
[file]

Copyright (c) 2018-present, Rakuten, Inc.

This source code is licensed under the MIT license found in the LICENSE file in the root directory of this source tree.`;

const bannerPlugin = new webpack.BannerPlugin({
  banner: copyright,
});

// Webpack common config
const webpackConfig = {
  mode,
  name,
  entry,
  output,
  module: {
    rules: [babelLoader, eslintLoader, stylesLoader, fileLoader],
  },
  resolve,
  externals,
  plugins: [bannerPlugin],
  optimization: {
    concatenateModules: true,
    minimize: true,
    minimizer: [googleClosureCompiler, optimizeCss],
  },
};

// Webpack production config for NPM
const production = merge(webpackConfig, {
  plugins: [
    cleanBuildPlugin,
    cssExtractPlugin,
    npmIndexJSPlugin,
    npmReadmePlugin,
    npmPackagePlugin,
    npmLicencePlugin,
  ],
});

// Webpack development config for NPM
const modeDev = 'development';
const nameDev = 'development.config';
const filenameDev = `[name].development`;
const filenameJSDev = `${filenameDev}.js`;
const filenameCSSDev = `${filenameDev}.css`;
const outputDev = {
  filename: filenameJSDev,
  chunkFilename: filenameJSDev,
};

const cssExtractPluginDev = new MiniCssExtractPlugin({
  filename: filenameCSSDev,
  chunkFilename: filenameCSSDev,
});

const development = merge(webpackConfig, {
  mode: modeDev,
  name: nameDev,
  output: outputDev,
  externals,
  plugins: [cssExtractPluginDev],
  optimization: {
    minimize: false,
  },
});

// Webpack export config
module.exports = [production, development];
