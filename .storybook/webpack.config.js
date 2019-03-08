const webpack = require('webpack');
const merge = require('webpack-merge');
const pathResolve = require('path').resolve;
const CleanWebpackPlugin = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ClosureCompiler = require('google-closure-compiler-js').webpack;
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const packageInfo = require('../package.json');

const libraryName = packageInfo.name
  .toLowerCase()
  .replace(/(\b|-)\w/g, m => m.toUpperCase().replace(/-/, ''));
const pathSrc = pathResolve('./src');
const pathNodeModules = pathResolve('./node_modules');
const pathRoot = pathResolve('./');

// Webpack entry and output settings
const entry = {};
// entry[packageInfo.name] = './src/MyComponent.jsx';

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
};

// Compiles Sass to CSS
const sassLoader = {
  loader: 'sass-loader',
};

// Styles loader for Css and Sass
const stylesLoader = {
  test: /\.(css|scss)$/,
  use: [extracCssLoader, cssLoader, sassLoader],
};

const fileLoader = {
  test: /\.(woff|woff2|eot|ttf|otf|svg)$/,
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
    languageIn: 'ECMASCRIPT6',
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
  optimization: {
    concatenateModules: true,
    minimize: true,
    minimizer: [googleClosureCompiler, optimizeCss],
  },
};

// Webpack production config for NPM
const production = merge(webpackConfig, {
  plugins: [
    // cleanBuildPlugin,
    cssExtractPlugin,
  ],
});


// Webpack export config
const devMode = process.env.NODE_ENV !== 'production';
const path = require('path');

module.exports = ( config, mode ) => {

  console.log('-----------------------');
  console.log(mode);
  console.log('-----------------------');

  config.mode = 'production';
  config.devtool = false;
  config.output.library = libraryName;
  config.output.libraryTarget = 'umd';
  config.output.umdNamedDefine = true;
  config.output.jsonpFunction = `${libraryName}OnDemand`;

  config.module.rules.push({
    test: /\.(css|scss)$/,
    loaders: [
      devMode ? 'style-loader' : MiniCssExtractPlugin.loader,
      'css-loader',
      'sass-loader',
    ],
    include: path.resolve(__dirname, '../')
  });

  config.module.rules.push({
    enforce: 'pre',
    test: /\.(js|jsx)$/,
    loader: 'eslint-loader',
    include: path.resolve(__dirname, '../src/'),
    options: {
      fix: false,
    },
  });

  config.plugins.push(new MiniCssExtractPlugin());

  config.optimization.concatenateModules = true;
  config.optimization.minimize = false;
  config.optimization.minimizer.push(googleClosureCompiler);
  config.optimization.splitChunks.chunks = 'all';
  config.optimization.splitChunks.minChunks = 1;
  config.optimization.splitChunks.minSize = 100000;
  config.optimization.splitChunks.maxSize = 170000;

  return config;
};
