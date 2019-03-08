(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("RexReactComponentStarterKit", [], factory);
	else if(typeof exports === 'object')
		exports["RexReactComponentStarterKit"] = factory();
	else
		root["RexReactComponentStarterKit"] = factory();
})(window, function() {
return (window["RexReactComponentStarterKitOnDemand"] = window["RexReactComponentStarterKitOnDemand"] || []).push([[0],{

/***/ 280:
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(281);
__webpack_require__(360);
module.exports = __webpack_require__(361);


/***/ }),

/***/ 361:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {

var _react = __webpack_require__(200);

var _addonOptions = __webpack_require__(459);

var _package = __webpack_require__(466);

var _components = __webpack_require__(467);

var rex = _components.themes.normal;
rex.mainBackground = '#F7F7F7';
rex.mainTextColor = '#333333';
rex.dimmedTextColor = '#4D4D4D';
rex.highlightColor = '#BF0000';

(0, _react.addDecorator)((0, _addonOptions.withOptions)({
  name: _package.name,
  url: _package.repository.url,
  theme: rex
}));

function loadStories() {
  __webpack_require__(577);
}

(0, _react.configure)(loadStories, module);
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(54)(module)))

/***/ }),

/***/ 466:
/***/ (function(module) {

module.exports = {"name":"rex-react-component-starter-kit","version":"1.9.5","description":"ReX React UI Component","main":"src/MyComponent.jsx","scripts":{"test":"jest","test:upgrade":"npm test -- -u","test:coverage":"npm test -- --coverage","init:component":"node init.js && npm i && npm run test:upgrade && npm start","start":"npm run storybook","build":"npm run build:component && npm run build:storybook","build:patch":"npm --no-git-tag-version version patch && npm run build && npm run commit","build:minor":"npm --no-git-tag-version version minor && npm run build && npm run commit","build:major":"npm --no-git-tag-version version major && npm run build && npm run commit","build:component":"NODE_ENV=production ./node_modules/.bin/webpack --mode=production --config webpack.config.js","build:storybook":"NODE_ENV=production ./node_modules/.bin/build-storybook -c .storybook -o docs","commit":"npm run commit:docs && npm run commit:package","commit:docs":"git add docs README.md && git commit -m 'Added - Docs for github pages and README file'","commit:package":"git add package.json package-lock.json && git commit -m 'New version - v'$npm_package_version","storybook":"NODE_ENV=development ./node_modules/.bin/start-storybook -p 8080 --ci","serve":"NODE_ENV=production ./node_modules/.bin/http-server -p 8081 ./docs","eslint":"eslint --fix './src/*.{js,jsx}'","prettier":"prettier --write './src/*.{js,jsx}'"},"repository":{"type":"git","url":"https://github.com/rakuten-frontend/rex-react-component-starter-kit.git"},"author":"ReX React UI Components Library Authors (https://github.com/rakuten-frontend/rex-react-component-starter-kit/graphs/contributors)","license":"MIT","bugs":{"url":"https://github.com/rakuten-frontend/rex-react-component-starter-kit/issues"},"homepage":"https://rakuten-frontend.github.io/rex-react-component-starter-kit/","husky":{"hooks":{"pre-commit":"lint-staged"}},"lint-staged":{"src/*.{js,jsx}":["eslint --fix","git add","jest --bail --findRelatedTests"]},"devDependencies":{"@babel/core":"^7.3.4","@storybook/addon-a11y":"^4.1.13","@storybook/addon-actions":"^4.1.13","@storybook/addon-info":"^4.1.13","@storybook/addon-knobs":"^4.1.13","@storybook/addon-options":"^4.1.13","@storybook/addon-viewport":"^4.1.13","@storybook/addons":"^4.1.13","@storybook/components":"^4.1.13","@storybook/react":"4.1.13","babel-core":"^6.26.3","babel-eslint":"^10.0.1","babel-loader":"^7.1.5","babel-plugin-transform-object-rest-spread":"^6.26.0","babel-plugin-transform-runtime":"^6.23.0","babel-preset-env":"^1.7.0","babel-preset-react":"^6.24.1","clean-webpack-plugin":"^1.0.1","copy-webpack-plugin":"^5.0.0","css-loader":"^2.1.0","enzyme":"^3.9.0","enzyme-adapter-react-16":"^1.10.0","eslint":"^5.13.0","eslint-config-prettier":"^3.6.0","eslint-config-rex-react-component":"^1.2.0","eslint-loader":"^2.1.1","eslint-plugin-prettier":"^3.0.1","google-closure-compiler-js":"20180610.0.0","http-server":"^0.11.1","husky":"^1.3.1","identity-obj-proxy":"^3.0.0","jest":"^23.6.0","lint-staged":"^8.1.3","mini-css-extract-plugin":"^0.5.0","node-sass":"^4.11.0","optimize-css-assets-webpack-plugin":"^5.0.1","prettier":"^1.16.4","sass-loader":"^7.1.0","storybook-inspecthtml":"^0.0.4","style-loader":"^0.23.1","webpack":"^4.29.5","webpack-cli":"^3.2.3","webpack-merge":"^4.2.1"},"dependencies":{"prop-types":"^15.7.2","react":"^16.8.3","react-dom":"^16.8.3","rex-core":"^1.4.0","rex-react-utils":"^1.0.1"}};

/***/ }),

/***/ 577:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {

var _react = __webpack_require__(1);

var _react2 = _interopRequireDefault(_react);

var _react3 = __webpack_require__(200);

var _addonActions = __webpack_require__(578);

var _addonKnobs = __webpack_require__(685);

var _addonA11y = __webpack_require__(696);

var _storybookInspecthtml = __webpack_require__(705);

var _centerDecorator = __webpack_require__(713);

var _centerDecorator2 = _interopRequireDefault(_centerDecorator);

__webpack_require__(714);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable import/no-extraneous-dependencies */
var MyComponent =  true ? __webpack_require__(717).default : undefined;

var stories = (0, _react3.storiesOf)('MyComponent', module);
stories.addDecorator(_storybookInspecthtml.withInspectHtml);
stories.addDecorator(_centerDecorator2.default);
stories.addDecorator(_addonA11y.checkA11y);
stories.addDecorator(_addonKnobs.withKnobs);

// Stories
stories.add('default', function () {
  return _react2.default.createElement(MyComponent, null);
});
stories.add('with text', function () {
  return _react2.default.createElement(MyComponent, { text: 'Welcome to React example' });
});
stories.add('with className', function () {
  return _react2.default.createElement(MyComponent, { className: 'color-black active' });
});

stories.add('with onClick', function () {
  var onClickSample = (0, _addonActions.action)('clicked');

  return _react2.default.createElement(MyComponent, { onClick: onClickSample });
});

stories.add('with children', function () {
  return _react2.default.createElement(
    MyComponent,
    null,
    _react2.default.createElement(
      'p',
      null,
      'Hello World'
    )
  );
});

stories.add('with dynamic props', function () {
  var textWelcome = (0, _addonKnobs.text)('text', 'Welcome to Dynamic React');

  return _react2.default.createElement(MyComponent, { text: textWelcome });
});
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(54)(module)))

/***/ }),

/***/ 713:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _assign = __webpack_require__(231);

var _assign2 = _interopRequireDefault(_assign);

exports.default = CenterDecorator;

var _react = __webpack_require__(1);

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function CenterDecorator(storyFn) {
  var container = {
    padding: '10px 10px 10px 10px'
  };

  var contentContainer = {
    display: 'flex',
    justifyContent: 'center',
    alignContent: 'center'
  };
  var leftSide = { flexGrow: 0 };
  var centerContent = { flexGrow: 2 };
  var rightSide = { flexGrow: 0 };
  var guideBox = {
    width: '20px',
    height: '20px'
  };
  var guide = (0, _assign2.default)({
    borderStyle: 'solid',
    borderColor: '#EBEBEB'
  }, guideBox);
  var guideTopLeft = (0, _assign2.default)({
    borderWidth: '0px 1px 1px 0px'
  }, guide);
  var guideTopRight = (0, _assign2.default)({
    borderWidth: '0px 0px 1px 1px'
  }, guide);
  var guideCenterLeft = (0, _assign2.default)(guideBox);
  var guideCenterRight = (0, _assign2.default)(guideBox);
  var guideBottomLeft = (0, _assign2.default)({
    borderWidth: '1px 1px 0px 0px'
  }, guide);
  var guideBottomRight = (0, _assign2.default)({
    borderWidth: '1px 0px 0px 1px'
  }, guide);

  return _react2.default.createElement(
    'div',
    { style: container },
    _react2.default.createElement(
      'div',
      { style: contentContainer },
      _react2.default.createElement(
        'div',
        { style: leftSide },
        _react2.default.createElement('div', { style: guideTopLeft })
      ),
      _react2.default.createElement('div', { style: centerContent }),
      _react2.default.createElement(
        'div',
        { style: rightSide },
        _react2.default.createElement('div', { style: guideTopRight })
      )
    ),
    _react2.default.createElement(
      'div',
      { style: contentContainer },
      _react2.default.createElement(
        'div',
        { style: leftSide },
        _react2.default.createElement('div', { style: guideCenterLeft })
      ),
      _react2.default.createElement(
        'div',
        { style: centerContent },
        storyFn()
      ),
      _react2.default.createElement(
        'div',
        { style: rightSide },
        _react2.default.createElement('div', { style: guideCenterRight })
      )
    ),
    _react2.default.createElement(
      'div',
      { style: contentContainer },
      _react2.default.createElement(
        'div',
        { style: leftSide },
        _react2.default.createElement('div', { style: guideBottomLeft })
      ),
      _react2.default.createElement('div', { style: centerContent }),
      _react2.default.createElement(
        'div',
        { style: rightSide },
        _react2.default.createElement('div', { style: guideBottomRight })
      )
    )
  );
}
CenterDecorator.__docgenInfo = {
  'description': '',
  'methods': [],
  'displayName': 'CenterDecorator'
};

if (typeof STORYBOOK_REACT_CLASSES !== 'undefined') {
  STORYBOOK_REACT_CLASSES['.storybook/centerDecorator.jsx'] = {
    name: 'CenterDecorator',
    docgenInfo: CenterDecorator.__docgenInfo,
    path: '.storybook/centerDecorator.jsx'
  };
}

/***/ })

},[[280,1,6,2,9,4,5,11,12,7,3,10,8,13]]]);
});