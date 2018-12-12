'use strict';

if (process.env.NODE_ENV === 'production') {
  require('./__COMPONENT_NAME__.production.min.css');
  module.exports = require('./__COMPONENT_NAME__.production.min.js');
} else {
  require('./__COMPONENT_NAME__.development.css');
  module.exports = require('./__COMPONENT_NAME__.development.js');
}
