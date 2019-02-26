'use strict';

if (process.env.NODE_ENV === 'production') {
  module.exports = require('../__COMPONENT_NAME__.production.min.css');
} else {
  module.exports = require('../__COMPONENT_NAME__.development.css');
}
