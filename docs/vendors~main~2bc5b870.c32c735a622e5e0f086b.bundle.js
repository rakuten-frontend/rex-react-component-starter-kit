(window["RexReactComponentStarterKitOnDemand"] = window["RexReactComponentStarterKitOnDemand"] || []).push([[6],{

/***/ 120:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(0);

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CYCLIC_KEY = exports.EVENT_ID = exports.PANEL_ID = exports.ADDON_ID = void 0;
var ADDON_ID = 'storybook/actions';
exports.ADDON_ID = ADDON_ID;
var PANEL_ID = "".concat(ADDON_ID, "/actions-panel");
exports.PANEL_ID = PANEL_ID;
var EVENT_ID = "".concat(ADDON_ID, "/action-event");
exports.EVENT_ID = EVENT_ID;
var CYCLIC_KEY = '$___storybook.isCyclic';
exports.CYCLIC_KEY = CYCLIC_KEY;

/***/ }),

/***/ 171:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var React = __webpack_require__(1);
var createCache = _interopDefault(__webpack_require__(540));
var utils = __webpack_require__(172);
var serialize = __webpack_require__(173);
var sheet = __webpack_require__(254);
var css = _interopDefault(__webpack_require__(544));

function _inheritsLoose(subClass, superClass) {
  subClass.prototype = Object.create(superClass.prototype);
  subClass.prototype.constructor = subClass;
  subClass.__proto__ = superClass;
}

var CSSContext = React.createContext(createCache());
var Provider = CSSContext.Provider;

exports.withCSSContext = function withCSSContext(func) {
  return function (props) {
    return React.createElement(CSSContext.Consumer, null, function ( // $FlowFixMe we know it won't be null
    context) {
      return func(props, context);
    });
  };
};

var consume = function consume(func) {
  return React.createElement(CSSContext.Consumer, null, // $FlowFixMe we know it won't be null
  func);
};

var jsx = function jsx(type, props) {
  var _arguments = arguments;

  if (props == null || props.css == null) {
    // $FlowFixMe
    return React.createElement.apply(undefined, arguments);
  }

  if (typeof props.css === 'string' && "production" !== 'production' && // check if there is a css declaration
  props.css.indexOf(':') !== -1) {
    throw new Error("Strings are not allowed as css prop values, please wrap it in a css template literal from '@emotion/css' like this: css`" + props.css + "`");
  }

  return consume(function (context) {
    var registeredStyles = [];
    var className = '';

    if (props.className !== undefined) {
      className = utils.getRegisteredStyles(context.registered, registeredStyles, props.className);
    }

    registeredStyles.push(typeof props.css === 'function' ? props.css(context.theme) : props.css);
    var serialized = serialize.serializeStyles(context.registered, registeredStyles);
    var rules = utils.insertStyles(context, serialized, typeof type === 'string');
    className += context.key + "-" + serialized.name;
    var newProps = {};

    for (var key in props) {
      if (Object.prototype.hasOwnProperty.call(props, key) && key !== 'css') {
        newProps[key] = props[key];
      }
    }

    newProps.className = className;
    var argsLength = _arguments.length;
    var createElementArgArray = new Array(argsLength);
    createElementArgArray[0] = type;
    createElementArgArray[1] = newProps;

    for (var i = 2; i < argsLength; i++) {
      createElementArgArray[i] = _arguments[i];
    } // $FlowFixMe


    var ele = React.createElement.apply(undefined, createElementArgArray);

    return ele;
  });
};

var Global =
/* #__PURE__ */
exports.withCSSContext(function (props, context) {
  return React.createElement(InnerGlobal, {
    styles: props.styles,
    context: context
  });
});

// maintain place over rerenders.
// initial render from browser, insertBefore context.sheet.tags[0] or if a style hasn't been inserted there yet, appendChild
// initial client-side render from SSR, use place of hydrating tag
var InnerGlobal =
/*#__PURE__*/
function (_React$Component) {
  _inheritsLoose(InnerGlobal, _React$Component);

  function InnerGlobal(props) {
    return _React$Component.call(this, props) || this;
  }

  var _proto = InnerGlobal.prototype;

  _proto.componentDidMount = function componentDidMount() {
    this.updateStyles();
  };

  _proto.componentDidUpdate = function componentDidUpdate() {
    this.updateStyles();
  };

  _proto.updateStyles = function updateStyles() {
    var serialized = serialize.serializeStyles(this.props.context.registered, [this.props.styles]);

    if (serialized.name === this.styleName) {
      return;
    }

    this.styleName = serialized.name;

    if (!this.sheet) {
      this.sheet = new sheet.StyleSheet({
        key: this.props.context.key + "-global",
        nonce: this.props.context.sheet.nonce,
        container: this.props.context.sheet.container
      }); // $FlowFixMe

      var node = document.querySelector("style[data-emotion-" + this.props.context.key + "=\"" + serialized.name + "\"]");

      if (node !== null) {
        this.sheet.tags.push(node);
      } // $FlowFixMe


      if (this.props.context.sheet.tags.length) {
        this.sheet.before = this.props.context.sheet.tags[0];
      }
    }

    var rules = this.props.context.stylis("", serialized.styles);

    if (this.sheet.tags.length) {
      // if this doesn't exist then it will be null so the style element will be appended
      this.sheet.before = this.sheet.tags[0].nextElementSibling;
      this.sheet.flush();
    }

    rules.forEach(this.sheet.insert, this.sheet);
  };

  _proto.componentWillUnmount = function componentWillUnmount() {
    this.sheet.flush();
  };

  _proto.render = function render() {

    return null;
  };

  return InnerGlobal;
}(React.Component);

var keyframes = function keyframes() {
  var insertable = css.apply(void 0, arguments);
  var name = "animation-" + insertable.name; // $FlowFixMe

  return {
    name: name,
    styles: "@keyframes " + name + "{" + insertable.styles + "}",
    anim: 1,
    toString: function toString() {
      return "_EMO_" + this.name + "_" + this.styles + "_EMO_";
    }
  };
};

exports.css = css;
exports.Provider = Provider;
exports.jsx = jsx;
exports.Global = Global;
exports.keyframes = keyframes;


/***/ }),

/***/ 172:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, '__esModule', { value: true });

var isBrowser = true;
function getRegisteredStyles(registered, registeredStyles, classNames) {
  var rawClassName = '';
  classNames.split(' ').forEach(function (className) {
    if (registered[className] !== undefined) {
      registeredStyles.push(registered[className]);
    } else {
      rawClassName += className + " ";
    }
  });
  return rawClassName;
}
var insertStyles = function insertStyles(context, insertable, isStringTag) {
  if ( // we only need to add the styles to the registered cache if the
  // class name could be used further down
  // the tree but if it's a string tag, we know it won't
  // so we don't have to add it to registered cache.
  // this improves memory usage since we can avoid storing the whole style string
  (isStringTag === false || // we need to always store it if we're in compat mode and
  // in node since emotion-server relies on whether a style is in
  // the registered cache to know whether a style is global or not
  // also, note that this check will be dead code eliminated in the browser
   false && false) && context.registered[context.key + "-" + insertable.name] === undefined) {
    context.registered[context.key + "-" + insertable.name] = insertable.styles;
  }

  if (context.inserted[insertable.name] === undefined) {
    var rules = context.stylis("." + context.key + "-" + insertable.name, insertable.styles);
    context.inserted[insertable.name] = true;

    {
      rules.forEach(context.sheet.insert, context.sheet);
    }
  }
};

exports.isBrowser = isBrowser;
exports.getRegisteredStyles = getRegisteredStyles;
exports.insertStyles = insertStyles;


/***/ }),

/***/ 173:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var hashString = _interopDefault(__webpack_require__(542));
var unitless = _interopDefault(__webpack_require__(543));
var memoize = _interopDefault(__webpack_require__(253));

var hyphenateRegex = /[A-Z]|^ms/g;
var animationRegex = /_EMO_([^_]+?)_([^]*?)_EMO_/g;
var processStyleName = memoize(function (styleName) {
  return styleName.replace(hyphenateRegex, '-$&').toLowerCase();
});

var processStyleValue = function processStyleValue(key, value) {
  if (value == null || typeof value === 'boolean') {
    return '';
  }

  switch (key) {
    case 'animation':
    case 'animationName':
      {
        value = value.replace(animationRegex, function (match, p1, p2) {
          styles = p2 + styles;
          return p1;
        });
      }
  }

  if (unitless[key] !== 1 && key.charCodeAt(1) !== 45 && // custom properties
  !isNaN(value) && value !== 0) {
    return value + 'px';
  }

  return value;
};

if (false) { var oldProcessStyleValue, contentValues, contentValuePattern; }

function handleInterpolation(mergedProps, registered, interpolation) {
  if (interpolation == null) {
    return '';
  }

  if (interpolation.__emotion_styles !== undefined) {
    if (false) {}

    return interpolation;
  }

  switch (typeof interpolation) {
    case 'boolean':
      {
        return '';
      }

    case 'object':
      {
        if (interpolation.anim === 1) {
          styles = interpolation.styles + styles;
          return interpolation.name;
        }

        if (interpolation.styles !== undefined) {
          return interpolation.styles;
        }

        return createStringFromObject(mergedProps, registered, interpolation);
      }

    case 'function':
      {
        if (mergedProps !== undefined) {
          return handleInterpolation(mergedProps, registered, // $FlowFixMe
          interpolation(mergedProps));
        }
      }
    // eslint-disable-next-line no-fallthrough

    default:
      {
        var cached = registered[interpolation];
        return cached !== undefined ? cached : interpolation;
      }
  }
}

function createStringFromObject(mergedProps, registered, obj) {
  var string = '';

  if (Array.isArray(obj)) {
    for (var i = 0; i < obj.length; i++) {
      string += handleInterpolation(mergedProps, registered, obj[i]);
    }
  } else {
    var _loop = function _loop(_key) {
      if (typeof obj[_key] !== 'object') {
        string += processStyleName(_key) + ":" + processStyleValue(_key, obj[_key]) + ";";
      } else {
        if (_key === 'NO_COMPONENT_SELECTOR' && "production" !== 'production') {
          throw new Error('Component selectors can only be used in conjunction with @emotion/babel-plugin-core.');
        }

        if (Array.isArray(obj[_key]) && typeof obj[_key][0] === 'string' && registered[obj[_key][0]] === undefined) {
          obj[_key].forEach(function (value) {
            string += processStyleName(_key) + ":" + processStyleValue(_key, value) + ";";
          });
        } else {
          string += _key + "{" + handleInterpolation(mergedProps, registered, obj[_key]) + "}";
        }
      }
    };

    for (var _key in obj) {
      _loop(_key);
    }
  }

  return string;
}

var labelPattern = /label:\s*([^\s;\n{]+)\s*;/g; // this is set to an empty string on each serializeStyles call
// it's declared in the module scope since we need to add to
// it in the middle of serialization to add styles from keyframes

var styles = '';
var serializeStyles = function serializeStyles(registered, args, mergedProps) {
  if (args.length === 1 && typeof args[0] === 'object' && args[0] !== null && args[0].styles !== undefined) {
    return args[0];
  }

  var stringMode = true;
  styles = '';
  var identifierName = '';
  var strings = args[0];

  if (strings == null || strings.raw === undefined) {
    stringMode = false; // we have to store this in a variable and then append it to styles since
    // styles could be modified in handleInterpolation and using += would mean
    // it would append the return value of handleInterpolation to the value before handleInterpolation is called

    var stringifiedInterpolation = handleInterpolation(mergedProps, registered, strings);
    styles += stringifiedInterpolation;
  } else {
    styles += strings[0];
  } // we start at 1 since we've already handled the first arg


  for (var i = 1; i < args.length; i++) {
    // we have to store this in a variable and then append it to styles since
    // styles could be modified in handleInterpolation and using += would mean
    // it would append the return value of handleInterpolation to the value before handleInterpolation is called
    var _stringifiedInterpolation = handleInterpolation(mergedProps, registered, args[i]);

    styles += _stringifiedInterpolation;

    if (stringMode) {
      styles += strings[i];
    }
  }

  styles = styles.replace(labelPattern, function (match, p1) {
    identifierName += "-" + p1;
    return '';
  });
  var name = hashString(styles) + identifierName;
  return {
    name: name,
    styles: styles
  };
};

exports.serializeStyles = serializeStyles;


/***/ }),

/***/ 177:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(0);

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "objectType", {
  enumerable: true,
  get: function get() {
    return _object.default;
  }
});
Object.defineProperty(exports, "dateType", {
  enumerable: true,
  get: function get() {
    return _date.default;
  }
});
Object.defineProperty(exports, "functionType", {
  enumerable: true,
  get: function get() {
    return _function.default;
  }
});
Object.defineProperty(exports, "infinityType", {
  enumerable: true,
  get: function get() {
    return _infinity.default;
  }
});
Object.defineProperty(exports, "nanType", {
  enumerable: true,
  get: function get() {
    return _nan.default;
  }
});
Object.defineProperty(exports, "regexpType", {
  enumerable: true,
  get: function get() {
    return _regexp.default;
  }
});
Object.defineProperty(exports, "symbolType", {
  enumerable: true,
  get: function get() {
    return _symbol.default;
  }
});
Object.defineProperty(exports, "undefinedType", {
  enumerable: true,
  get: function get() {
    return _undefined.default;
  }
});
exports.types = void 0;

var _object = _interopRequireDefault(__webpack_require__(595));

var _date = _interopRequireDefault(__webpack_require__(602));

var _function = _interopRequireDefault(__webpack_require__(605));

var _infinity = _interopRequireDefault(__webpack_require__(607));

var _nan = _interopRequireDefault(__webpack_require__(609));

var _regexp = _interopRequireDefault(__webpack_require__(611));

var _symbol = _interopRequireDefault(__webpack_require__(613));

var _undefined = _interopRequireDefault(__webpack_require__(615));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var types = [_date.default, _function.default, _nan.default, _infinity.default, _regexp.default, _symbol.default, _undefined.default];
exports.types = types;

/***/ }),

/***/ 178:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = createFunction;

__webpack_require__(0);

var _canConfigureName = _interopRequireDefault(__webpack_require__(257));

var _createFunctionEval = _interopRequireDefault(__webpack_require__(597));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function createFunction() {
  var name = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';

  if (_canConfigureName.default) {
    var func = function unnamed() {};

    Object.defineProperty(func, 'name', {
      value: name
    });
    return func;
  }

  return (0, _createFunctionEval.default)(name);
}

/***/ }),

/***/ 25:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var styled = _interopDefault(__webpack_require__(538));

var tags = ['a', 'abbr', 'address', 'area', 'article', 'aside', 'audio', 'b', 'base', 'bdi', 'bdo', 'big', 'blockquote', 'body', 'br', 'button', 'canvas', 'caption', 'cite', 'code', 'col', 'colgroup', 'data', 'datalist', 'dd', 'del', 'details', 'dfn', 'dialog', 'div', 'dl', 'dt', 'em', 'embed', 'fieldset', 'figcaption', 'figure', 'footer', 'form', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'head', 'header', 'hgroup', 'hr', 'html', 'i', 'iframe', 'img', 'input', 'ins', 'kbd', 'keygen', 'label', 'legend', 'li', 'link', 'main', 'map', 'mark', 'marquee', 'menu', 'menuitem', 'meta', 'meter', 'nav', 'noscript', 'object', 'ol', 'optgroup', 'option', 'output', 'p', 'param', 'picture', 'pre', 'progress', 'q', 'rp', 'rt', 'ruby', 's', 'samp', 'script', 'section', 'select', 'small', 'source', 'span', 'strong', 'style', 'sub', 'summary', 'sup', 'table', 'tbody', 'td', 'textarea', 'tfoot', 'th', 'thead', 'time', 'title', 'tr', 'track', 'u', 'ul', 'var', 'video', 'wbr', // SVG
'circle', 'clipPath', 'defs', 'ellipse', 'foreignObject', 'g', 'image', 'line', 'linearGradient', 'mask', 'path', 'pattern', 'polygon', 'polyline', 'radialGradient', 'rect', 'stop', 'svg', 'text', 'tspan'];

var newStyled = styled.bind();
tags.forEach(function (tagName) {
  newStyled[tagName] = newStyled(tagName);
});

module.exports = newStyled;


/***/ }),

/***/ 253:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function memoize(fn) {
  var cache = {};
  return function (arg) {
    if (cache[arg] === undefined) cache[arg] = fn(arg);
    return cache[arg];
  };
}

module.exports = memoize;


/***/ }),

/***/ 254:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, '__esModule', { value: true });

/*

high performance StyleSheet for css-in-js systems

- uses multiple style tags behind the scenes for millions of rules
- uses `insertRule` for appending in production for *much* faster performance
- 'polyfills' on server side

// usage

import StyleSheet from 'glamor/lib/sheet'
let styleSheet = new StyleSheet()

styleSheet.inject()
- 'injects' the stylesheet into the page (or into memory if on server)

styleSheet.insert('#box { border: 1px solid red; }')
- appends a css rule into the stylesheet

styleSheet.flush()
- empties the stylesheet of all its contents

*/
// $FlowFixMe
function sheetForTag(tag) {
  if (tag.sheet) {
    // $FlowFixMe
    return tag.sheet;
  } // this weirdness brought to you by firefox

  /* istanbul ignore next */


  for (var i = 0; i < document.styleSheets.length; i++) {
    if (document.styleSheets[i].ownerNode === tag) {
      // $FlowFixMe
      return document.styleSheets[i];
    }
  }
}

function createStyleElement(options) {
  var tag = document.createElement('style');
  tag.setAttribute('data-emotion', options.key);

  if (options.nonce !== undefined) {
    tag.setAttribute('nonce', options.nonce);
  }

  tag.appendChild(document.createTextNode(''));
  return tag;
}

var StyleSheet =
/*#__PURE__*/
function () {
  function StyleSheet(options) {
    this.isSpeedy = options.speedy === undefined ? "production" === 'production' : options.speedy; // maxLength is how many rules we have per style tag, it's 65000 in speedy mode
    // it's 1 in dev because we insert source maps that map a single rule to a location
    // and you can only have one source map per style tag

    this.maxLength = this.isSpeedy ? 65000 : 1;
    this.tags = [];
    this.ctr = 0;
    this.nonce = options.nonce; // key is the value of the data-emotion attribute, it's used to identify different sheets

    this.key = options.key;
    this.container = options.container;
  }

  var _proto = StyleSheet.prototype;

  _proto.insert = function insert(rule) {
    if (this.ctr % this.maxLength === 0) {
      var _tag = createStyleElement(this);

      var before;

      if (this.tags.length === 0) {
        before = this.before;
      } else {
        before = this.tags[this.tags.length - 1].nextSibling;
      }

      this.container.insertBefore(_tag, before);
      this.tags.push(_tag);
    }

    var tag = this.tags[this.tags.length - 1];

    if (this.isSpeedy) {
      var sheet = sheetForTag(tag);

      try {
        // this is the ultrafast version, works across browsers
        // the big drawback is that the css won't be editable in devtools
        sheet.insertRule(rule, sheet.cssRules.length);
      } catch (e) {
        if (false) {}
      }
    } else {
      tag.appendChild(document.createTextNode(rule));
    }

    this.ctr++;
  };

  _proto.flush = function flush() {
    // $FlowFixMe
    this.tags.forEach(function (tag) {
      return tag.parentNode.removeChild(tag);
    });
    this.tags = [];
    this.ctr = 0;
  };

  return StyleSheet;
}();

exports.StyleSheet = StyleSheet;


/***/ }),

/***/ 264:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(0);

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = configureDepth;
exports.DEPTH_KEY = void 0;
var DEPTH_KEY = '$___storybook.depthKey';
exports.DEPTH_KEY = DEPTH_KEY;

function configureDepth(obj) {
  var depth = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
  obj[DEPTH_KEY] = depth; // eslint-disable-line no-param-reassign

  return obj;
}

/***/ }),

/***/ 267:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(0);

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _isObject = _interopRequireDefault(__webpack_require__(259));

var _typeReviver = _interopRequireDefault(__webpack_require__(268));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function reviver(key, value) {
  if ((0, _isObject.default)(value)) {
    var result = (0, _typeReviver.default)(value);

    if (result) {
      return result.value;
    }
  }

  return value;
}

var _default = reviver;
exports.default = _default;

/***/ }),

/***/ 538:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var React = __webpack_require__(1);
var isPropValid = _interopDefault(__webpack_require__(539));
var core = __webpack_require__(171);
var utils = __webpack_require__(172);
var serialize = __webpack_require__(173);

var testOmitPropsOnStringTag = isPropValid;
var testOmitPropsOnComponent = function testOmitPropsOnComponent(key) {
  return key !== 'theme' && key !== 'innerRef';
};
var testAlwaysTrue = function testAlwaysTrue() {
  return true;
};
var pickAssign = function pickAssign(testFn, target) {
  var i = 2;
  var length = arguments.length;

  for (; i < length; i++) {
    var source = arguments[i];

    var _key = void 0;

    for (_key in source) {
      if (testFn(_key)) {
        target[_key] = source[_key];
      }
    }
  }

  return target;
};

var createStyled = function createStyled(tag, options) {
  if (false) {}

  var identifierName;
  var shouldForwardProp;
  var targetClassName;

  if (options !== undefined) {
    identifierName = options.label;
    targetClassName = options.target;
    shouldForwardProp = tag.__emotion_forwardProp && options.shouldForwardProp ? function (propName) {
      return tag.__emotion_forwardProp(propName) && // $FlowFixMe
      options.shouldForwardProp(propName);
    } : options.shouldForwardProp;
  }

  var isReal = tag.__emotion_real === tag;
  var baseTag = isReal && tag.__emotion_base || tag;
  var isStringTag = typeof baseTag === 'string';

  if (typeof shouldForwardProp !== 'function') {
    shouldForwardProp = isStringTag && // 96 is one less than the char code
    // for "a" so this is checking that
    // it's a lowercase character
    baseTag.charCodeAt(0) > 96 ? testOmitPropsOnStringTag : testOmitPropsOnComponent;
  }

  return function () {
    var args = arguments;
    var styles = isReal && tag.__emotion_styles !== undefined ? tag.__emotion_styles.slice(0) : [];

    if (identifierName !== undefined) {
      styles.push("label:" + identifierName + ";");
    }

    if (args[0] == null || args[0].raw === undefined) {
      styles.push.apply(styles, args);
    } else {
      styles.push(args[0][0]);
      var len = args.length;
      var i = 1;

      for (; i < len; i++) {
        styles.push(args[i], args[0][i]);
      }
    }

    var Styled = core.withCSSContext(function (props, context) {
      var className = '';
      var classInterpolations = [];
      var mergedProps = pickAssign(testAlwaysTrue, {}, props, {
        theme: props.theme || context.theme
      });

      if (typeof props.className === 'string') {
        className += utils.getRegisteredStyles(context.registered, classInterpolations, props.className);
      }

      var serialized = serialize.serializeStyles(context.registered, styles.concat(classInterpolations), mergedProps);
      var rules = utils.insertStyles(context, serialized, isStringTag);
      className += context.key + "-" + serialized.name;

      if (targetClassName !== undefined) {
        className += " " + targetClassName;
      }

      var ele = React.createElement(baseTag, // $FlowFixMe
      pickAssign(shouldForwardProp, {}, props, {
        className: className,
        ref: props.innerRef
      }));

      return ele;
    });
    Styled.displayName = identifierName !== undefined ? identifierName : "Styled(" + (typeof baseTag === 'string' ? baseTag : baseTag.displayName || baseTag.name || 'Component') + ")";
    var FinalStyled = React.forwardRef(function (props, ref) {
      // this avoids creating a new object if there's no ref
      return React.createElement(Styled, ref === null ? props : pickAssign(testAlwaysTrue, {
        innerRef: ref
      }, props));
    });
    FinalStyled.__emotion_real = FinalStyled;
    FinalStyled.__emotion_base = baseTag;
    FinalStyled.__emotion_styles = styles;
    FinalStyled.__emotion_forwardProp = shouldForwardProp;
    Object.defineProperty(FinalStyled, 'toString', {
      value: function value() {
        if (targetClassName === undefined && "production" !== 'production') {
          return 'NO_COMPONENT_SELECTOR';
        } // $FlowFixMe


        return "." + targetClassName;
      }
    });

    FinalStyled.withComponent = function (nextTag, nextOptions) {
      return createStyled(nextTag, nextOptions !== undefined ? pickAssign(testAlwaysTrue, {}, options || {}, nextOptions) : options).apply(void 0, styles);
    };

    return FinalStyled;
  };
};

module.exports = createStyled;


/***/ }),

/***/ 539:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var memoize = _interopDefault(__webpack_require__(253));

var reactPropsRegex = /^((children|dangerouslySetInnerHTML|key|ref|autoFocus|defaultValue|defaultChecked|innerHTML|suppressContentEditableWarning|valueLink|accept|acceptCharset|accessKey|action|allow|allowFullScreen|allowTransparency|alt|async|autoComplete|autoPlay|capture|cellPadding|cellSpacing|challenge|charSet|checked|cite|classID|className|cols|colSpan|content|contentEditable|contextMenu|controls|controlsList|coords|crossOrigin|data|dateTime|default|defer|dir|disabled|download|draggable|encType|form|formAction|formEncType|formMethod|formNoValidate|formTarget|frameBorder|headers|height|hidden|high|href|hrefLang|htmlFor|httpEquiv|id|inputMode|integrity|is|keyParams|keyType|kind|label|lang|list|loop|low|marginHeight|marginWidth|max|maxLength|media|mediaGroup|method|min|minLength|multiple|muted|name|nonce|noValidate|open|optimum|pattern|placeholder|playsInline|poster|preload|profile|radioGroup|readOnly|referrerPolicy|rel|required|reversed|role|rows|rowSpan|sandbox|scope|scoped|scrolling|seamless|selected|shape|size|sizes|slot|span|spellCheck|src|srcDoc|srcLang|srcSet|start|step|style|summary|tabIndex|target|title|type|useMap|value|width|wmode|wrap|about|datatype|inlist|prefix|property|resource|typeof|vocab|autoCapitalize|autoCorrect|autoSave|color|itemProp|itemScope|itemType|itemID|itemRef|results|security|unselectable|accentHeight|accumulate|additive|alignmentBaseline|allowReorder|alphabetic|amplitude|arabicForm|ascent|attributeName|attributeType|autoReverse|azimuth|baseFrequency|baselineShift|baseProfile|bbox|begin|bias|by|calcMode|capHeight|clip|clipPathUnits|clipPath|clipRule|colorInterpolation|colorInterpolationFilters|colorProfile|colorRendering|contentScriptType|contentStyleType|cursor|cx|cy|d|decelerate|descent|diffuseConstant|direction|display|divisor|dominantBaseline|dur|dx|dy|edgeMode|elevation|enableBackground|end|exponent|externalResourcesRequired|fill|fillOpacity|fillRule|filter|filterRes|filterUnits|floodColor|floodOpacity|focusable|fontFamily|fontSize|fontSizeAdjust|fontStretch|fontStyle|fontVariant|fontWeight|format|from|fr|fx|fy|g1|g2|glyphName|glyphOrientationHorizontal|glyphOrientationVertical|glyphRef|gradientTransform|gradientUnits|hanging|horizAdvX|horizOriginX|ideographic|imageRendering|in|in2|intercept|k|k1|k2|k3|k4|kernelMatrix|kernelUnitLength|kerning|keyPoints|keySplines|keyTimes|lengthAdjust|letterSpacing|lightingColor|limitingConeAngle|local|markerEnd|markerMid|markerStart|markerHeight|markerUnits|markerWidth|mask|maskContentUnits|maskUnits|mathematical|mode|numOctaves|offset|opacity|operator|order|orient|orientation|origin|overflow|overlinePosition|overlineThickness|panose1|paintOrder|pathLength|patternContentUnits|patternTransform|patternUnits|pointerEvents|points|pointsAtX|pointsAtY|pointsAtZ|preserveAlpha|preserveAspectRatio|primitiveUnits|r|radius|refX|refY|renderingIntent|repeatCount|repeatDur|requiredExtensions|requiredFeatures|restart|result|rotate|rx|ry|scale|seed|shapeRendering|slope|spacing|specularConstant|specularExponent|speed|spreadMethod|startOffset|stdDeviation|stemh|stemv|stitchTiles|stopColor|stopOpacity|strikethroughPosition|strikethroughThickness|string|stroke|strokeDasharray|strokeDashoffset|strokeLinecap|strokeLinejoin|strokeMiterlimit|strokeOpacity|strokeWidth|surfaceScale|systemLanguage|tableValues|targetX|targetY|textAnchor|textDecoration|textRendering|textLength|to|transform|u1|u2|underlinePosition|underlineThickness|unicode|unicodeBidi|unicodeRange|unitsPerEm|vAlphabetic|vHanging|vIdeographic|vMathematical|values|vectorEffect|version|vertAdvY|vertOriginX|vertOriginY|viewBox|viewTarget|visibility|widths|wordSpacing|writingMode|x|xHeight|x1|x2|xChannelSelector|xlinkActuate|xlinkArcrole|xlinkHref|xlinkRole|xlinkShow|xlinkTitle|xlinkType|xmlBase|xmlns|xmlnsXlink|xmlLang|xmlSpace|y|y1|y2|yChannelSelector|z|zoomAndPan|for|class)|(on[A-Z].*)|((data|aria|x)-.*))$/i;
var index = memoize(reactPropsRegex.test.bind(reactPropsRegex));

module.exports = index;


/***/ }),

/***/ 540:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var sheet = __webpack_require__(254);
var utils = __webpack_require__(172);
var Stylis = _interopDefault(__webpack_require__(541));

// https://github.com/thysultan/stylis.js/tree/master/plugins/rule-sheet
// inlined to avoid umd wrapper and peerDep warnings/installing stylis
// since we use stylis after closure compiler
var delimiter = '/*|*/';
var needle = delimiter + '}';

function toSheet(block) {
  if (block) {
    current.push(block + '}');
  }
}

var ruleSheet = function ruleSheet(context, content, selectors, parents, line, column, length, at, depth) {
  switch (context) {
    case -1:
      {
        current = [];
        break;
      }

    case 2:
      if (at === 0) return content + delimiter;
      break;
    // at-rule

    case 3:
      switch (at) {
        // @font-face, @page
        case 102:
        case 112:
          {
            current.push(selectors[0] + content);
            return '';
          }

        default:
          {
            return content + delimiter;
          }
      }

    case -2:
      {
        content.split(needle).forEach(toSheet);
        return current;
      }
  }
};

var current;

var createCache = function createCache(options) {
  if (options === undefined) options = {};
  var key = options.key || 'css';
  var stylisOptions;

  if (options.prefix !== undefined) {
    stylisOptions = {
      prefix: options.prefix
    };
  }

  var stylis = new Stylis(stylisOptions);
  stylis.use(options.stylisPlugins)(ruleSheet);

  if (false) { var currentSourceMap, sourceMapRegEx; }

  var inserted = {}; // $FlowFixMe

  var container;

  if (utils.isBrowser) {
    container = options.container || document.head;
    var nodes = document.querySelectorAll("style[data-emotion-" + key + "]");
    Array.prototype.forEach.call(nodes, function (node) {
      var attrib = node.getAttribute("data-emotion-" + key); // $FlowFixMe

      attrib.split(' ').forEach(function (id) {
        inserted[id] = true;
      });

      if (node.parentNode !== container) {
        container.appendChild(node);
      }
    });
  }

  var context = {
    stylis: stylis,
    key: key,
    sheet: new sheet.StyleSheet({
      key: key,
      container: container,
      nonce: options.nonce
    }),
    inserted: inserted,
    registered: {},
    theme: {}
  };
  return context;
};

module.exports = createCache;


/***/ }),

/***/ 541:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function stylis_min (W) {
  function M(d, c, e, h, a) {
    for (var m = 0, b = 0, v = 0, n = 0, q, g, x = 0, K = 0, k, u = k = q = 0, l = 0, r = 0, I = 0, t = 0, B = e.length, J = B - 1, y, f = '', p = '', F = '', G = '', C; l < B;) {
      g = e.charCodeAt(l);
      l === J && 0 !== b + n + v + m && (0 !== b && (g = 47 === b ? 10 : 47), n = v = m = 0, B++, J++);

      if (0 === b + n + v + m) {
        if (l === J && (0 < r && (f = f.replace(N, '')), 0 < f.trim().length)) {
          switch (g) {
            case 32:
            case 9:
            case 59:
            case 13:
            case 10:
              break;

            default:
              f += e.charAt(l);
          }

          g = 59;
        }

        switch (g) {
          case 123:
            f = f.trim();
            q = f.charCodeAt(0);
            k = 1;

            for (t = ++l; l < B;) {
              switch (g = e.charCodeAt(l)) {
                case 123:
                  k++;
                  break;

                case 125:
                  k--;
                  break;

                case 47:
                  switch (g = e.charCodeAt(l + 1)) {
                    case 42:
                    case 47:
                      a: {
                        for (u = l + 1; u < J; ++u) {
                          switch (e.charCodeAt(u)) {
                            case 47:
                              if (42 === g && 42 === e.charCodeAt(u - 1) && l + 2 !== u) {
                                l = u + 1;
                                break a;
                              }

                              break;

                            case 10:
                              if (47 === g) {
                                l = u + 1;
                                break a;
                              }

                          }
                        }

                        l = u;
                      }

                  }

                  break;

                case 91:
                  g++;

                case 40:
                  g++;

                case 34:
                case 39:
                  for (; l++ < J && e.charCodeAt(l) !== g;) {
                  }

              }

              if (0 === k) break;
              l++;
            }

            k = e.substring(t, l);
            0 === q && (q = (f = f.replace(ca, '').trim()).charCodeAt(0));

            switch (q) {
              case 64:
                0 < r && (f = f.replace(N, ''));
                g = f.charCodeAt(1);

                switch (g) {
                  case 100:
                  case 109:
                  case 115:
                  case 45:
                    r = c;
                    break;

                  default:
                    r = O;
                }

                k = M(c, r, k, g, a + 1);
                t = k.length;
                0 < A && (r = X(O, f, I), C = H(3, k, r, c, D, z, t, g, a, h), f = r.join(''), void 0 !== C && 0 === (t = (k = C.trim()).length) && (g = 0, k = ''));
                if (0 < t) switch (g) {
                  case 115:
                    f = f.replace(da, ea);

                  case 100:
                  case 109:
                  case 45:
                    k = f + '{' + k + '}';
                    break;

                  case 107:
                    f = f.replace(fa, '$1 $2');
                    k = f + '{' + k + '}';
                    k = 1 === w || 2 === w && L('@' + k, 3) ? '@-webkit-' + k + '@' + k : '@' + k;
                    break;

                  default:
                    k = f + k, 112 === h && (k = (p += k, ''));
                } else k = '';
                break;

              default:
                k = M(c, X(c, f, I), k, h, a + 1);
            }

            F += k;
            k = I = r = u = q = 0;
            f = '';
            g = e.charCodeAt(++l);
            break;

          case 125:
          case 59:
            f = (0 < r ? f.replace(N, '') : f).trim();
            if (1 < (t = f.length)) switch (0 === u && (q = f.charCodeAt(0), 45 === q || 96 < q && 123 > q) && (t = (f = f.replace(' ', ':')).length), 0 < A && void 0 !== (C = H(1, f, c, d, D, z, p.length, h, a, h)) && 0 === (t = (f = C.trim()).length) && (f = '\x00\x00'), q = f.charCodeAt(0), g = f.charCodeAt(1), q) {
              case 0:
                break;

              case 64:
                if (105 === g || 99 === g) {
                  G += f + e.charAt(l);
                  break;
                }

              default:
                58 !== f.charCodeAt(t - 1) && (p += P(f, q, g, f.charCodeAt(2)));
            }
            I = r = u = q = 0;
            f = '';
            g = e.charCodeAt(++l);
        }
      }

      switch (g) {
        case 13:
        case 10:
          47 === b ? b = 0 : 0 === 1 + q && 107 !== h && 0 < f.length && (r = 1, f += '\x00');
          0 < A * Y && H(0, f, c, d, D, z, p.length, h, a, h);
          z = 1;
          D++;
          break;

        case 59:
        case 125:
          if (0 === b + n + v + m) {
            z++;
            break;
          }

        default:
          z++;
          y = e.charAt(l);

          switch (g) {
            case 9:
            case 32:
              if (0 === n + m + b) switch (x) {
                case 44:
                case 58:
                case 9:
                case 32:
                  y = '';
                  break;

                default:
                  32 !== g && (y = ' ');
              }
              break;

            case 0:
              y = '\\0';
              break;

            case 12:
              y = '\\f';
              break;

            case 11:
              y = '\\v';
              break;

            case 38:
              0 === n + b + m && (r = I = 1, y = '\f' + y);
              break;

            case 108:
              if (0 === n + b + m + E && 0 < u) switch (l - u) {
                case 2:
                  112 === x && 58 === e.charCodeAt(l - 3) && (E = x);

                case 8:
                  111 === K && (E = K);
              }
              break;

            case 58:
              0 === n + b + m && (u = l);
              break;

            case 44:
              0 === b + v + n + m && (r = 1, y += '\r');
              break;

            case 34:
            case 39:
              0 === b && (n = n === g ? 0 : 0 === n ? g : n);
              break;

            case 91:
              0 === n + b + v && m++;
              break;

            case 93:
              0 === n + b + v && m--;
              break;

            case 41:
              0 === n + b + m && v--;
              break;

            case 40:
              if (0 === n + b + m) {
                if (0 === q) switch (2 * x + 3 * K) {
                  case 533:
                    break;

                  default:
                    q = 1;
                }
                v++;
              }

              break;

            case 64:
              0 === b + v + n + m + u + k && (k = 1);
              break;

            case 42:
            case 47:
              if (!(0 < n + m + v)) switch (b) {
                case 0:
                  switch (2 * g + 3 * e.charCodeAt(l + 1)) {
                    case 235:
                      b = 47;
                      break;

                    case 220:
                      t = l, b = 42;
                  }

                  break;

                case 42:
                  47 === g && 42 === x && t + 2 !== l && (33 === e.charCodeAt(t + 2) && (p += e.substring(t, l + 1)), y = '', b = 0);
              }
          }

          0 === b && (f += y);
      }

      K = x;
      x = g;
      l++;
    }

    t = p.length;

    if (0 < t) {
      r = c;
      if (0 < A && (C = H(2, p, r, d, D, z, t, h, a, h), void 0 !== C && 0 === (p = C).length)) return G + p + F;
      p = r.join(',') + '{' + p + '}';

      if (0 !== w * E) {
        2 !== w || L(p, 2) || (E = 0);

        switch (E) {
          case 111:
            p = p.replace(ha, ':-moz-$1') + p;
            break;

          case 112:
            p = p.replace(Q, '::-webkit-input-$1') + p.replace(Q, '::-moz-$1') + p.replace(Q, ':-ms-input-$1') + p;
        }

        E = 0;
      }
    }

    return G + p + F;
  }

  function X(d, c, e) {
    var h = c.trim().split(ia);
    c = h;
    var a = h.length,
        m = d.length;

    switch (m) {
      case 0:
      case 1:
        var b = 0;

        for (d = 0 === m ? '' : d[0] + ' '; b < a; ++b) {
          c[b] = Z(d, c[b], e, m).trim();
        }

        break;

      default:
        var v = b = 0;

        for (c = []; b < a; ++b) {
          for (var n = 0; n < m; ++n) {
            c[v++] = Z(d[n] + ' ', h[b], e, m).trim();
          }
        }

    }

    return c;
  }

  function Z(d, c, e) {
    var h = c.charCodeAt(0);
    33 > h && (h = (c = c.trim()).charCodeAt(0));

    switch (h) {
      case 38:
        return c.replace(F, '$1' + d.trim());

      case 58:
        return d.trim() + c.replace(F, '$1' + d.trim());

      default:
        if (0 < 1 * e && 0 < c.indexOf('\f')) return c.replace(F, (58 === d.charCodeAt(0) ? '' : '$1') + d.trim());
    }

    return d + c;
  }

  function P(d, c, e, h) {
    var a = d + ';',
        m = 2 * c + 3 * e + 4 * h;

    if (944 === m) {
      d = a.indexOf(':', 9) + 1;
      var b = a.substring(d, a.length - 1).trim();
      b = a.substring(0, d).trim() + b + ';';
      return 1 === w || 2 === w && L(b, 1) ? '-webkit-' + b + b : b;
    }

    if (0 === w || 2 === w && !L(a, 1)) return a;

    switch (m) {
      case 1015:
        return 97 === a.charCodeAt(10) ? '-webkit-' + a + a : a;

      case 951:
        return 116 === a.charCodeAt(3) ? '-webkit-' + a + a : a;

      case 963:
        return 110 === a.charCodeAt(5) ? '-webkit-' + a + a : a;

      case 1009:
        if (100 !== a.charCodeAt(4)) break;

      case 969:
      case 942:
        return '-webkit-' + a + a;

      case 978:
        return '-webkit-' + a + '-moz-' + a + a;

      case 1019:
      case 983:
        return '-webkit-' + a + '-moz-' + a + '-ms-' + a + a;

      case 883:
        if (45 === a.charCodeAt(8)) return '-webkit-' + a + a;
        if (0 < a.indexOf('image-set(', 11)) return a.replace(ja, '$1-webkit-$2') + a;
        break;

      case 932:
        if (45 === a.charCodeAt(4)) switch (a.charCodeAt(5)) {
          case 103:
            return '-webkit-box-' + a.replace('-grow', '') + '-webkit-' + a + '-ms-' + a.replace('grow', 'positive') + a;

          case 115:
            return '-webkit-' + a + '-ms-' + a.replace('shrink', 'negative') + a;

          case 98:
            return '-webkit-' + a + '-ms-' + a.replace('basis', 'preferred-size') + a;
        }
        return '-webkit-' + a + '-ms-' + a + a;

      case 964:
        return '-webkit-' + a + '-ms-flex-' + a + a;

      case 1023:
        if (99 !== a.charCodeAt(8)) break;
        b = a.substring(a.indexOf(':', 15)).replace('flex-', '').replace('space-between', 'justify');
        return '-webkit-box-pack' + b + '-webkit-' + a + '-ms-flex-pack' + b + a;

      case 1005:
        return ka.test(a) ? a.replace(aa, ':-webkit-') + a.replace(aa, ':-moz-') + a : a;

      case 1e3:
        b = a.substring(13).trim();
        c = b.indexOf('-') + 1;

        switch (b.charCodeAt(0) + b.charCodeAt(c)) {
          case 226:
            b = a.replace(G, 'tb');
            break;

          case 232:
            b = a.replace(G, 'tb-rl');
            break;

          case 220:
            b = a.replace(G, 'lr');
            break;

          default:
            return a;
        }

        return '-webkit-' + a + '-ms-' + b + a;

      case 1017:
        if (-1 === a.indexOf('sticky', 9)) break;

      case 975:
        c = (a = d).length - 10;
        b = (33 === a.charCodeAt(c) ? a.substring(0, c) : a).substring(d.indexOf(':', 7) + 1).trim();

        switch (m = b.charCodeAt(0) + (b.charCodeAt(7) | 0)) {
          case 203:
            if (111 > b.charCodeAt(8)) break;

          case 115:
            a = a.replace(b, '-webkit-' + b) + ';' + a;
            break;

          case 207:
          case 102:
            a = a.replace(b, '-webkit-' + (102 < m ? 'inline-' : '') + 'box') + ';' + a.replace(b, '-webkit-' + b) + ';' + a.replace(b, '-ms-' + b + 'box') + ';' + a;
        }

        return a + ';';

      case 938:
        if (45 === a.charCodeAt(5)) switch (a.charCodeAt(6)) {
          case 105:
            return b = a.replace('-items', ''), '-webkit-' + a + '-webkit-box-' + b + '-ms-flex-' + b + a;

          case 115:
            return '-webkit-' + a + '-ms-flex-item-' + a.replace(ba, '') + a;

          default:
            return '-webkit-' + a + '-ms-flex-line-pack' + a.replace('align-content', '').replace(ba, '') + a;
        }
        break;

      case 973:
      case 989:
        if (45 !== a.charCodeAt(3) || 122 === a.charCodeAt(4)) break;

      case 931:
      case 953:
        if (!0 === la.test(d)) return 115 === (b = d.substring(d.indexOf(':') + 1)).charCodeAt(0) ? P(d.replace('stretch', 'fill-available'), c, e, h).replace(':fill-available', ':stretch') : a.replace(b, '-webkit-' + b) + a.replace(b, '-moz-' + b.replace('fill-', '')) + a;
        break;

      case 962:
        if (a = '-webkit-' + a + (102 === a.charCodeAt(5) ? '-ms-' + a : '') + a, 211 === e + h && 105 === a.charCodeAt(13) && 0 < a.indexOf('transform', 10)) return a.substring(0, a.indexOf(';', 27) + 1).replace(ma, '$1-webkit-$2') + a;
    }

    return a;
  }

  function L(d, c) {
    var e = d.indexOf(1 === c ? ':' : '{'),
        h = d.substring(0, 3 !== c ? e : 10);
    e = d.substring(e + 1, d.length - 1);
    return R(2 !== c ? h : h.replace(na, '$1'), e, c);
  }

  function ea(d, c) {
    var e = P(c, c.charCodeAt(0), c.charCodeAt(1), c.charCodeAt(2));
    return e !== c + ';' ? e.replace(oa, ' or ($1)').substring(4) : '(' + c + ')';
  }

  function H(d, c, e, h, a, m, b, v, n, q) {
    for (var g = 0, x = c, w; g < A; ++g) {
      switch (w = S[g].call(B, d, x, e, h, a, m, b, v, n, q)) {
        case void 0:
        case !1:
        case !0:
        case null:
          break;

        default:
          x = w;
      }
    }

    if (x !== c) return x;
  }

  function T(d) {
    switch (d) {
      case void 0:
      case null:
        A = S.length = 0;
        break;

      default:
        switch (d.constructor) {
          case Array:
            for (var c = 0, e = d.length; c < e; ++c) {
              T(d[c]);
            }

            break;

          case Function:
            S[A++] = d;
            break;

          case Boolean:
            Y = !!d | 0;
        }

    }

    return T;
  }

  function U(d) {
    d = d.prefix;
    void 0 !== d && (R = null, d ? 'function' !== typeof d ? w = 1 : (w = 2, R = d) : w = 0);
    return U;
  }

  function B(d, c) {
    var e = d;
    33 > e.charCodeAt(0) && (e = e.trim());
    V = e;
    e = [V];

    if (0 < A) {
      var h = H(-1, c, e, e, D, z, 0, 0, 0, 0);
      void 0 !== h && 'string' === typeof h && (c = h);
    }

    var a = M(O, e, c, 0, 0);
    0 < A && (h = H(-2, a, e, e, D, z, a.length, 0, 0, 0), void 0 !== h && (a = h));
    V = '';
    E = 0;
    z = D = 1;
    return a;
  }

  var ca = /^\0+/g,
      N = /[\0\r\f]/g,
      aa = /: */g,
      ka = /zoo|gra/,
      ma = /([,: ])(transform)/g,
      ia = /,\r+?/g,
      F = /([\t\r\n ])*\f?&/g,
      fa = /@(k\w+)\s*(\S*)\s*/,
      Q = /::(place)/g,
      ha = /:(read-only)/g,
      G = /[svh]\w+-[tblr]{2}/,
      da = /\(\s*(.*)\s*\)/g,
      oa = /([\s\S]*?);/g,
      ba = /-self|flex-/g,
      na = /[^]*?(:[rp][el]a[\w-]+)[^]*/,
      la = /stretch|:\s*\w+\-(?:conte|avail)/,
      ja = /([^-])(image-set\()/,
      z = 1,
      D = 1,
      E = 0,
      w = 1,
      O = [],
      S = [],
      A = 0,
      R = null,
      Y = 0,
      V = '';
  B.use = T;
  B.set = U;
  void 0 !== W && U(W);
  return B;
}

module.exports = stylis_min;


/***/ }),

/***/ 542:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/* eslint-disable */
// murmurhash2 via https://github.com/garycourt/murmurhash-js/blob/master/murmurhash2_gc.js
function murmurhash2_32_gc(str) {
  var l = str.length,
      h = l ^ l,
      i = 0,
      k;

  while (l >= 4) {
    k = str.charCodeAt(i) & 0xff | (str.charCodeAt(++i) & 0xff) << 8 | (str.charCodeAt(++i) & 0xff) << 16 | (str.charCodeAt(++i) & 0xff) << 24;
    k = (k & 0xffff) * 0x5bd1e995 + (((k >>> 16) * 0x5bd1e995 & 0xffff) << 16);
    k ^= k >>> 24;
    k = (k & 0xffff) * 0x5bd1e995 + (((k >>> 16) * 0x5bd1e995 & 0xffff) << 16);
    h = (h & 0xffff) * 0x5bd1e995 + (((h >>> 16) * 0x5bd1e995 & 0xffff) << 16) ^ k;
    l -= 4;
    ++i;
  }

  switch (l) {
    case 3:
      h ^= (str.charCodeAt(i + 2) & 0xff) << 16;

    case 2:
      h ^= (str.charCodeAt(i + 1) & 0xff) << 8;

    case 1:
      h ^= str.charCodeAt(i) & 0xff;
      h = (h & 0xffff) * 0x5bd1e995 + (((h >>> 16) * 0x5bd1e995 & 0xffff) << 16);
  }

  h ^= h >>> 13;
  h = (h & 0xffff) * 0x5bd1e995 + (((h >>> 16) * 0x5bd1e995 & 0xffff) << 16);
  h ^= h >>> 15;
  return (h >>> 0).toString(36);
}

module.exports = murmurhash2_32_gc;


/***/ }),

/***/ 543:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var unitlessKeys = {
  animationIterationCount: 1,
  borderImageOutset: 1,
  borderImageSlice: 1,
  borderImageWidth: 1,
  boxFlex: 1,
  boxFlexGroup: 1,
  boxOrdinalGroup: 1,
  columnCount: 1,
  columns: 1,
  flex: 1,
  flexGrow: 1,
  flexPositive: 1,
  flexShrink: 1,
  flexNegative: 1,
  flexOrder: 1,
  gridRow: 1,
  gridRowEnd: 1,
  gridRowSpan: 1,
  gridRowStart: 1,
  gridColumn: 1,
  gridColumnEnd: 1,
  gridColumnSpan: 1,
  gridColumnStart: 1,
  fontWeight: 1,
  lineHeight: 1,
  opacity: 1,
  order: 1,
  orphans: 1,
  tabSize: 1,
  widows: 1,
  zIndex: 1,
  zoom: 1,
  WebkitLineClamp: 1,
  // SVG-related properties
  fillOpacity: 1,
  floodOpacity: 1,
  stopOpacity: 1,
  strokeDasharray: 1,
  strokeDashoffset: 1,
  strokeMiterlimit: 1,
  strokeOpacity: 1,
  strokeWidth: 1
};

module.exports = unitlessKeys;


/***/ }),

/***/ 544:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var serialize = __webpack_require__(173);

var fakeRegisteredCache = {};

function css() {
  for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }

  return serialize.serializeStyles(fakeRegisteredCache, args);
}

module.exports = css;


/***/ }),

/***/ 550:
/***/ (function(module, exports) {

function _extends() {
  module.exports = _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  return _extends.apply(this, arguments);
}

module.exports = _extends;

/***/ }),

/***/ 551:
/***/ (function(module, exports) {

function _objectWithoutPropertiesLoose(source, excluded) {
  if (source == null) return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;

  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0) continue;
    target[key] = source[key];
  }

  return target;
}

module.exports = _objectWithoutPropertiesLoose;

/***/ }),

/***/ 552:
/***/ (function(module, exports) {

function _inheritsLoose(subClass, superClass) {
  subClass.prototype = Object.create(superClass.prototype);
  subClass.prototype.constructor = subClass;
  subClass.__proto__ = superClass;
}

module.exports = _inheritsLoose;

/***/ }),

/***/ 553:
/***/ (function(module, exports) {

function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return self;
}

module.exports = _assertThisInitialized;

/***/ }),

/***/ 560:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var React = __webpack_require__(1);
var core = __webpack_require__(171);
var weakMemoize = _interopDefault(__webpack_require__(561));

function _extends() {
  _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  return _extends.apply(this, arguments);
}

var getTheme = function getTheme(outerTheme, theme) {
  if (typeof theme === 'function') {
    var mergedTheme = theme(outerTheme);

    if (false) {}

    return mergedTheme;
  }

  if (false) {}

  return _extends({}, outerTheme, theme);
};

var createCreateCacheWithTheme = weakMemoize(function (cache) {
  return weakMemoize(function (theme) {
    var actualTheme = getTheme(cache.theme, theme);
    return _extends({}, cache, {
      theme: actualTheme
    });
  });
});
var index = core.withCSSContext(function (props, context) {
  if (props.theme !== context.theme) {
    context = createCreateCacheWithTheme(context)(props.theme);
  }

  return React.createElement(core.Provider, {
    value: context
  }, props.children);
});

module.exports = index;


/***/ }),

/***/ 561:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var weakMemoize = function weakMemoize(func) {
  var cache = new WeakMap();
  return function (arg) {
    if (cache.has(arg)) {
      // $FlowFixMe
      return cache.get(arg);
    }

    var ret = func(arg);
    cache.set(arg, ret);
    return ret;
  };
};

module.exports = weakMemoize;


/***/ }),

/***/ 578:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(0);

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "action", {
  enumerable: true,
  get: function get() {
    return _preview.action;
  }
});
Object.defineProperty(exports, "actions", {
  enumerable: true,
  get: function get() {
    return _preview.actions;
  }
});
Object.defineProperty(exports, "decorate", {
  enumerable: true,
  get: function get() {
    return _preview.decorate;
  }
});
Object.defineProperty(exports, "configureActions", {
  enumerable: true,
  get: function get() {
    return _preview.configureActions;
  }
});
Object.defineProperty(exports, "decorateAction", {
  enumerable: true,
  get: function get() {
    return _preview.decorateAction;
  }
});
Object.defineProperty(exports, "withActions", {
  enumerable: true,
  get: function get() {
    return _preview.withActions;
  }
});
Object.defineProperty(exports, "ADDON_ID", {
  enumerable: true,
  get: function get() {
    return _constants.ADDON_ID;
  }
});
Object.defineProperty(exports, "PANEL_ID", {
  enumerable: true,
  get: function get() {
    return _constants.PANEL_ID;
  }
});
Object.defineProperty(exports, "EVENT_ID", {
  enumerable: true,
  get: function get() {
    return _constants.EVENT_ID;
  }
});

var _preview = __webpack_require__(579);

var _constants = __webpack_require__(120);

/***/ }),

/***/ 588:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(0);

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "decycle", {
  enumerable: true,
  get: function get() {
    return _decycle2.default;
  }
});
Object.defineProperty(exports, "retrocycle", {
  enumerable: true,
  get: function get() {
    return _retrocycle2.default;
  }
});
Object.defineProperty(exports, "reviver", {
  enumerable: true,
  get: function get() {
    return _reviver2.default;
  }
});
exports.CYCLIC_KEY = void 0;

var _decycle2 = _interopRequireDefault(__webpack_require__(589));

var _retrocycle2 = _interopRequireDefault(__webpack_require__(619));

var _reviver2 = _interopRequireDefault(__webpack_require__(267));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var CYCLIC_KEY = '$___storybook.isCyclic';
exports.CYCLIC_KEY = CYCLIC_KEY;

/***/ }),

/***/ 589:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(0);

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = decycle;

__webpack_require__(9);

__webpack_require__(8);

__webpack_require__(10);

__webpack_require__(4);

__webpack_require__(19);

__webpack_require__(108);

__webpack_require__(2);

__webpack_require__(3);

__webpack_require__(34);

__webpack_require__(590);

var _errors = __webpack_require__(592);

var _getPropertiesList = _interopRequireDefault(__webpack_require__(258));

var _typeReplacer = _interopRequireDefault(__webpack_require__(261));

var _omitProperty = _interopRequireDefault(__webpack_require__(266));

var _constants = __webpack_require__(120);

var _types = __webpack_require__(177);

var _configureDepth = __webpack_require__(264);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var hasOwnProperty = Object.prototype.hasOwnProperty;

function decycle(object) {
  var depth = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 10;
  var objects = new WeakMap();
  var isCyclic = false;

  var res = function derez(value, path, _depth, _branchDepthMax) {
    var oldPath;
    var obj;
    var maxDepth = _branchDepthMax;
    var result = (0, _typeReplacer.default)(value);

    if (result) {
      return result.value;
    }

    var type = _typeof(value);

    if (value instanceof Boolean || value instanceof Number || value instanceof String) {
      return value;
    }

    if (type === 'object' && value !== null) {
      oldPath = objects.get(value);

      if (oldPath !== undefined) {
        isCyclic = true;
        return {
          $ref: oldPath
        };
      }

      try {
        objects.set(value, path);
      } catch (error) {
        console.error(error); // eslint-disable-line no-console

        return new _errors.DecycleError(error.message);
      }

      if (Array.isArray(value)) {
        obj = [];

        for (var i = 0; i < value.length; i += 1) {
          obj[i] = derez(value[i], "".concat(path, "[").concat(i, "]"), _depth + 1, maxDepth);
        }
      } else {
        obj = _types.objectType.serialize(value);
        var newDepth;

        if (hasOwnProperty.call(obj, _configureDepth.DEPTH_KEY)) {
          if (_depth + 1 < maxDepth) {
            var depthKey = obj[_configureDepth.DEPTH_KEY];
            newDepth = depthKey === 0 ? 0 : _depth + depthKey;
            maxDepth = newDepth >= depth ? depth : newDepth;
          }

          delete obj[_configureDepth.DEPTH_KEY];
        }

        if (_depth <= maxDepth) {
          (0, _getPropertiesList.default)(value).forEach(function (name) {
            if (!(0, _omitProperty.default)(name)) {
              try {
                obj[name] = derez(value[name], "".concat(path, "[").concat(JSON.stringify(name), "]"), _depth + 1, maxDepth);
              } catch (error) {
                console.error(error); // eslint-disable-line no-console

                obj[name] = new _errors.DecycleError(error.message);
              }
            }
          });
        }
      }

      if (_depth === 0 && value instanceof Object && isCyclic) {
        obj[_constants.CYCLIC_KEY] = true;
      }

      return obj;
    }

    return value;
  }(object, '$', 0, depth);

  return res;
}

/***/ }),

/***/ 592:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(0);

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "DecycleError", {
  enumerable: true,
  get: function get() {
    return _DecycleError2.default;
  }
});

var _DecycleError2 = _interopRequireDefault(__webpack_require__(593));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ }),

/***/ 593:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(0);

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

__webpack_require__(9);

__webpack_require__(8);

__webpack_require__(58);

__webpack_require__(59);

var _makeError = __webpack_require__(594);

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var DecycleError =
/*#__PURE__*/
function (_BaseError) {
  _inherits(DecycleError, _BaseError);

  function DecycleError() {
    _classCallCheck(this, DecycleError);

    return _possibleConstructorReturn(this, _getPrototypeOf(DecycleError).apply(this, arguments));
  }

  return DecycleError;
}(_makeError.BaseError);

exports.default = DecycleError;

/***/ }),

/***/ 595:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

__webpack_require__(0);

var _createNamedObject = _interopRequireDefault(__webpack_require__(596));

var _getObjectName = _interopRequireDefault(__webpack_require__(600));

var _configureDepth2 = _interopRequireDefault(__webpack_require__(264));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var maxDepth = 2;
var KEY = '$___storybook.objectName';
var objectType = {
  KEY: KEY,
  // is: (value) => , // not used
  serialize: function serialize(value) {
    var objectName = (0, _getObjectName.default)(value);

    if (objectName === 'Object') {
      return _defineProperty({}, KEY, objectName);
    }

    return (0, _configureDepth2.default)(_defineProperty({}, KEY, objectName), maxDepth);
  },
  deserialize: function deserialize(value) {
    return (0, _createNamedObject.default)(value, KEY);
  }
};
var _default = objectType;
exports.default = _default;

/***/ }),

/***/ 596:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(0);

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = createNamedObject;

__webpack_require__(89);

var _createFunction = _interopRequireDefault(__webpack_require__(178));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function createNamedObject(obj, key) {
  var Func = (0, _createFunction.default)(obj[key]);
  var namedObj = new Func();
  delete obj[key]; // eslint-disable-line no-param-reassign

  Object.assign(namedObj, obj);
  return namedObj;
}

/***/ }),

/***/ 597:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(0);

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = createFunctionEval;

var _isReserved = _interopRequireDefault(__webpack_require__(598));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function createFunctionEval(name) {
  var fnName = (0, _isReserved.default)(name) ? "".concat(name, "$") : name; // eslint-disable-next-line no-new-func

  return new Function("return function ".concat(fnName, "() {}"))();
}

/***/ }),

/***/ 598:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(0);

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = isReserved;

__webpack_require__(102);

var _reservedKeywords = _interopRequireDefault(__webpack_require__(599));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function isReserved(name) {
  return _reservedKeywords.default.indexOf(name) >= 0;
}

/***/ }),

/***/ 599:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(0);

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var reservedWords = ['break', 'case', 'catch', 'class', 'continue', 'debugger', 'default', 'delete', 'do', 'else', 'export', 'extends', 'finally', 'for', 'function', 'if', 'import', 'in', 'instanceof', 'new', 'return', 'super', 'switch', 'this', 'throw', 'try', 'typeof', 'var', 'void', 'while', 'with', 'yield'];
var _default = reservedWords;
exports.default = _default;

/***/ }),

/***/ 600:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(0);

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = getObjectName;

__webpack_require__(10);

__webpack_require__(263);

__webpack_require__(27);

__webpack_require__(28);

var _canAccessProperty = _interopRequireDefault(__webpack_require__(601));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getObjectName(value) {
  if ((0, _canAccessProperty.default)('toString', value)) {
    var stringValue = value.toString();

    if (stringValue.slice(0, 5) === 'class') {
      return stringValue.slice(6, -3);
    }

    var type = stringValue.slice(8, -1);

    if (stringValue.slice(1, 7) === 'object' && type !== 'Object') {
      return type;
    }

    var parts = stringValue.match(/function (\w+).*/);

    if (parts && parts.length === 2) {
      return parts[1];
    }
  }

  return value.constructor ? value.constructor.name : 'Object';
}

/***/ }),

/***/ 601:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(0);

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = canAccessProperty;

function canAccessProperty(key, value) {
  var prop;

  try {
    prop = value[key];
  } catch (error) {
    console.error(error); // eslint-disable-line no-console
  }

  return !!prop;
}

/***/ }),

/***/ 602:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

__webpack_require__(0);

__webpack_require__(603);

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var KEY = '$___storybook.Date';
var dateType = {
  KEY: KEY,
  is: function is(value) {
    return value instanceof Date;
  },
  serialize: function serialize(value) {
    return _defineProperty({}, KEY, value.toISOString());
  },
  deserialize: function deserialize(value) {
    return new Date(value[KEY]);
  }
};
var _default = dateType;
exports.default = _default;

/***/ }),

/***/ 605:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

__webpack_require__(0);

__webpack_require__(153);

__webpack_require__(10);

var _createBoundFunction = _interopRequireDefault(__webpack_require__(606));

var _createFunction = _interopRequireDefault(__webpack_require__(178));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var KEY = '$___storybook.functionName';
var functionType = {
  KEY: KEY,
  is: function is(value) {
    return typeof value === 'function';
  },
  serialize: function serialize(value) {
    return _defineProperty({}, KEY, value.name || '');
  },
  deserialize: function deserialize(value) {
    var parts = value[KEY].split(' ');
    return parts.length === 2 && parts[0] === 'bound' ? (0, _createBoundFunction.default)(parts[1]) : (0, _createFunction.default)(parts[0]);
  }
};
var _default = functionType;
exports.default = _default;

/***/ }),

/***/ 606:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(0);

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = createBoundFunction;

__webpack_require__(143);

var _createFunction = _interopRequireDefault(__webpack_require__(178));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function createBoundFunction(name) {
  return (0, _createFunction.default)(name).bind({});
}

/***/ }),

/***/ 607:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

__webpack_require__(0);

__webpack_require__(108);

__webpack_require__(608);

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var KEY = '$___storybook.Infinity';
var InfinityType = {
  KEY: KEY,
  is: function is(value) {
    return typeof value === 'number' && !Number.isFinite(value);
  },
  serialize: function serialize(value) {
    return _defineProperty({}, KEY, value === Infinity);
  },
  deserialize: function deserialize(value) {
    return value[KEY] ? Infinity : -Infinity;
  }
};
var _default = InfinityType;
exports.default = _default;

/***/ }),

/***/ 609:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

__webpack_require__(0);

__webpack_require__(108);

__webpack_require__(610);

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var KEY = '$___storybook.NaN';
var NaNType = {
  KEY: KEY,
  is: function is(value) {
    return typeof value === 'number' && Number.isNaN(value);
  },
  serialize: function serialize() {
    return _defineProperty({}, KEY, true);
  },
  deserialize: function deserialize() {
    return NaN;
  }
};
var _default = NaNType;
exports.default = _default;

/***/ }),

/***/ 619:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(0);

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = retrocycle;

__webpack_require__(9);

__webpack_require__(8);

__webpack_require__(10);

__webpack_require__(19);

var _reviver = _interopRequireDefault(__webpack_require__(267));

var _muteProperty = _interopRequireDefault(__webpack_require__(260));

var _constants = __webpack_require__(120);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

// eslint-disable-next-line no-control-regex
var pathReg = /^\$(?:\[(?:\d+|"(?:[^\\"\u0000-\u001f]|\\([\\"/bfnrt]|u[0-9a-zA-Z]{4}))*")])*$/;

function retrocycle(json) {
  var $ = JSON.parse(json, _reviver.default);

  if (_typeof($) !== 'object' || $ === null) {
    return $;
  }

  (function rez(value) {
    if (value && _typeof(value) === 'object') {
      if (Array.isArray(value)) {
        for (var i = 0; i < value.length; i += 1) {
          var item = value[i];

          if (item && _typeof(item) === 'object') {
            var path = item.$ref;

            if (typeof path === 'string' && pathReg.test(path)) {
              value[i] = eval(path); // eslint-disable-line no-eval, no-param-reassign
            } else {
              rez(item);
            }
          }
        }
      } else {
        // eslint-disable-next-line no-restricted-syntax, guard-for-in
        for (var name in value) {
          var _item = value[name];

          if (_typeof(_item) === 'object' && _item !== null) {
            var _path = _item.$ref;

            if (typeof _path === 'string' && pathReg.test(_path)) {
              value[name] = eval(_path); // eslint-disable-line no-eval, no-param-reassign
            } else {
              rez(_item);
            }
          }
        }
      }
    }
  })($);

  (0, _muteProperty.default)(_constants.CYCLIC_KEY, $);
  return $;
}

/***/ }),

/***/ 696:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(0);

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.checkA11y = exports.configureA11y = void 0;

var _global = __webpack_require__(17);

var _axeCore = _interopRequireDefault(__webpack_require__(697));

var _addons = _interopRequireDefault(__webpack_require__(698));

var _coreEvents = _interopRequireDefault(__webpack_require__(702));

var _clientLogger = __webpack_require__(703);

var _shared = __webpack_require__(704);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var axeOptions = {};

var configureA11y = function configureA11y() {
  var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  axeOptions = options;
};

exports.configureA11y = configureA11y;

var runA11yCheck = function runA11yCheck() {
  var channel = _addons.default.getChannel();

  var infoWrapper = _global.document.getElementById('story-root').children;

  var wrapper = _global.document.getElementById('root');

  _axeCore.default.reset();

  _axeCore.default.configure(axeOptions);

  _axeCore.default.run(infoWrapper || wrapper).then(function (results) {
    return channel.emit(_shared.CHECK_EVENT_ID, results);
  }, _clientLogger.logger.error);
};

var a11ySubscription = function a11ySubscription() {
  var channel = _addons.default.getChannel();

  channel.on(_shared.REQUEST_CHECK_EVENT_ID, runA11yCheck);
  return function () {
    channel.removeListener(_shared.REQUEST_CHECK_EVENT_ID, runA11yCheck);
  };
};

var checkA11y = function checkA11y(story) {
  _addons.default.getChannel().emit(_coreEvents.default.REGISTER_SUBSCRIPTION, a11ySubscription);

  return story();
};

exports.checkA11y = checkA11y;

/***/ }),

/***/ 698:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "mockChannel", {
  enumerable: true,
  get: function get() {
    return _storybookChannelMock.default;
  }
});
Object.defineProperty(exports, "makeDecorator", {
  enumerable: true,
  get: function get() {
    return _makeDecorator.makeDecorator;
  }
});
exports.default = exports.AddonStore = void 0;

__webpack_require__(0);

__webpack_require__(10);

__webpack_require__(3);

__webpack_require__(5);

__webpack_require__(18);

__webpack_require__(2);

__webpack_require__(4);

var _global = _interopRequireDefault(__webpack_require__(17));

var _storybookChannelMock = _interopRequireDefault(__webpack_require__(699));

var _makeDecorator = __webpack_require__(701);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var AddonStore =
/*#__PURE__*/
function () {
  function AddonStore() {
    _classCallCheck(this, AddonStore);

    this.loaders = {};
    this.panels = {};
    this.channel = null;
    this.preview = null;
    this.database = null;
  }

  _createClass(AddonStore, [{
    key: "getChannel",
    value: function getChannel() {
      // this.channel should get overwritten by setChannel. If it wasn't called (e.g. in non-browser environment), throw.
      if (!this.channel) {
        throw new Error('Accessing nonexistent addons channel, see https://storybook.js.org/basics/faq/#why-is-there-no-addons-channel');
      }

      return this.channel;
    }
  }, {
    key: "hasChannel",
    value: function hasChannel() {
      return Boolean(this.channel);
    }
  }, {
    key: "setChannel",
    value: function setChannel(channel) {
      this.channel = channel;
    }
  }, {
    key: "getPreview",
    value: function getPreview() {
      return this.preview;
    }
  }, {
    key: "setPreview",
    value: function setPreview(preview) {
      this.preview = preview;
    }
  }, {
    key: "getDatabase",
    value: function getDatabase() {
      return this.database;
    }
  }, {
    key: "setDatabase",
    value: function setDatabase(database) {
      this.database = database;
    }
  }, {
    key: "getPanels",
    value: function getPanels() {
      return this.panels;
    }
  }, {
    key: "addPanel",
    value: function addPanel(name, panel) {
      // supporting legacy addons, which have not migrated to the active-prop
      // const original = panel.render;
      // if (original && original.toString() && !original.toString().match(/active/)) {
      //  this.panels[name] = {
      //    ...panel,
      //    render: ({ active }) => TabWrapper({ active, render: original }),
      //  };
      // } else {
      this.panels[name] = panel; // }
    }
  }, {
    key: "register",
    value: function register(name, loader) {
      this.loaders[name] = loader;
    }
  }, {
    key: "loadAddons",
    value: function loadAddons(api) {
      var _this = this;

      Object.keys(this.loaders).map(function (name) {
        return _this.loaders[name];
      }).forEach(function (loader) {
        return loader(api);
      });
    }
  }]);

  return AddonStore;
}(); // Enforce addons store to be a singleton


exports.AddonStore = AddonStore;
var KEY = '__STORYBOOK_ADDONS';

function getAddonsStore() {
  if (!_global.default[KEY]) {
    _global.default[KEY] = new AddonStore();
  }

  return _global.default[KEY];
}

var _default = getAddonsStore();

exports.default = _default;

/***/ }),

/***/ 699:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(0);

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = createChannel;

var _channels = _interopRequireDefault(__webpack_require__(700));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function createChannel() {
  var transport = {
    setHandler: function setHandler() {},
    send: function send() {}
  };
  return new _channels.default({
    transport: transport
  });
}

/***/ }),

/***/ 700:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(setImmediate) {

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

__webpack_require__(34);

__webpack_require__(44);

__webpack_require__(9);

__webpack_require__(8);

__webpack_require__(19);

__webpack_require__(0);

__webpack_require__(4);

__webpack_require__(27);

__webpack_require__(28);

__webpack_require__(11);

__webpack_require__(2);

__webpack_require__(3);

__webpack_require__(5);

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/* eslint no-underscore-dangle: 0 */
var Channel =
/*#__PURE__*/
function () {
  function Channel() {
    var _this = this;

    var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        transport = _ref.transport,
        async = _ref.async;

    _classCallCheck(this, Channel);

    this._sender = this._randomId();
    this._async = async;

    if (transport) {
      this._transport = transport;

      this._transport.setHandler(function (event) {
        return _this._handleEvent(event);
      });
    }

    this._listeners = {};
  }

  _createClass(Channel, [{
    key: "addListener",
    value: function addListener(type, listener) {
      this.on(type, listener);
    }
  }, {
    key: "addPeerListener",
    value: function addPeerListener(type, listener) {
      var peerListener = listener;
      peerListener.ignorePeer = true;
      this.on(type, peerListener);
    }
  }, {
    key: "emit",
    value: function emit(type) {
      var _this2 = this;

      for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        args[_key - 1] = arguments[_key];
      }

      var event = {
        type: type,
        args: args,
        from: this._sender
      };

      var handler = function handler() {
        if (_this2._transport) {
          _this2._transport.send(event);
        }

        _this2._handleEvent(event, true);
      };

      if (this._async) {
        setImmediate(handler);
      } else {
        handler();
      }
    }
  }, {
    key: "eventNames",
    value: function eventNames() {
      return Object.keys(this._listeners);
    }
  }, {
    key: "listenerCount",
    value: function listenerCount(type) {
      var listeners = this._listeners[type];
      return listeners ? listeners.length : 0;
    }
  }, {
    key: "listeners",
    value: function listeners(type) {
      return this._listeners[type];
    }
  }, {
    key: "on",
    value: function on(type, listener) {
      this._listeners[type] = this._listeners[type] || [];

      this._listeners[type].push(listener);
    }
  }, {
    key: "once",
    value: function once(type, listener) {
      var onceListener = this._onceListener(type, listener);

      this.on(type, onceListener);
    }
  }, {
    key: "prependListener",
    value: function prependListener(type, listener) {
      this._listeners[type] = this._listeners[type] || [];

      this._listeners[type].unshift(listener);
    }
  }, {
    key: "prependOnceListener",
    value: function prependOnceListener(type, listener) {
      var onceListener = this._onceListener(type, listener);

      this.prependListener(type, onceListener);
    }
  }, {
    key: "removeAllListeners",
    value: function removeAllListeners(type) {
      if (!type) {
        this._listeners = {};
      } else if (this._listeners[type]) {
        delete this._listeners[type];
      }
    }
  }, {
    key: "removeListener",
    value: function removeListener(type, listener) {
      var listeners = this._listeners[type];

      if (listeners) {
        this._listeners[type] = listeners.filter(function (l) {
          return l !== listener;
        });
      }
    }
  }, {
    key: "_randomId",
    value: function _randomId() {
      // generates a random 13 character string
      return Math.random().toString(16).slice(2);
    }
  }, {
    key: "_handleEvent",
    value: function _handleEvent(event, isPeer) {
      var listeners = this._listeners[event.type];

      if (listeners && (isPeer || event.from !== this._sender)) {
        listeners.forEach(function (fn) {
          return !(isPeer && fn.ignorePeer) && fn.apply(void 0, _toConsumableArray(event.args));
        });
      }
    }
  }, {
    key: "_onceListener",
    value: function _onceListener(type, listener) {
      var _this3 = this;

      var onceListener = function onceListener() {
        _this3.removeListener(type, onceListener);

        return listener.apply(void 0, arguments);
      };

      return onceListener;
    }
  }]);

  return Channel;
}();

exports.default = Channel;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(74).setImmediate))

/***/ }),

/***/ 701:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(0);

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.makeDecorator = void 0;

__webpack_require__(10);

var _utilDeprecate = _interopRequireDefault(__webpack_require__(45));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Create a decorator that can be used both in the (deprecated) old "hoc" style:
//   .add('story', decorator(options)(() => <Story />));
//
// And in the new, "parameterized" style:
//   .addDecorator(decorator)
//   .add('story', () => <Story />, { name: { parameters } });
//
// *And* in the older, but not deprecated, "pass options to decorator" style:
//  .addDecorator(decorator(options))
var makeDecorator = function makeDecorator(_ref) {
  var name = _ref.name,
      parameterName = _ref.parameterName,
      wrapper = _ref.wrapper,
      _ref$skipIfNoParamete = _ref.skipIfNoParametersOrOptions,
      skipIfNoParametersOrOptions = _ref$skipIfNoParamete === void 0 ? false : _ref$skipIfNoParamete,
      _ref$allowDeprecatedU = _ref.allowDeprecatedUsage,
      allowDeprecatedUsage = _ref$allowDeprecatedU === void 0 ? false : _ref$allowDeprecatedU;

  var decorator = function decorator(options) {
    return function (getStory, context) {
      var parameters = context.parameters && context.parameters[parameterName];

      if (parameters && parameters.disable) {
        return getStory(context);
      }

      if (skipIfNoParametersOrOptions && !options && !parameters) {
        return getStory(context);
      }

      return wrapper(getStory, context, {
        options: options,
        parameters: parameters
      });
    };
  };

  return function () {
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    // Used without options as .addDecorator(decorator)
    if (typeof args[0] === 'function') {
      return decorator().apply(void 0, args);
    }

    return function () {
      for (var _len2 = arguments.length, innerArgs = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        innerArgs[_key2] = arguments[_key2];
      }

      // Used as [.]addDecorator(decorator(options))
      if (innerArgs.length > 1) {
        return decorator.apply(void 0, args).apply(void 0, innerArgs);
      }

      if (allowDeprecatedUsage) {
        // Used to wrap a story directly .add('story', decorator(options)(() => <Story />))
        //   This is now deprecated:
        return (0, _utilDeprecate.default)(function (context) {
          return decorator.apply(void 0, args)(innerArgs[0], context);
        }, "Passing stories directly into ".concat(name, "() is deprecated, instead use addDecorator(").concat(name, ") and pass options with the '").concat(parameterName, "' parameter"));
      }

      throw new Error("Passing stories directly into ".concat(name, "() is not allowed, instead use addDecorator(").concat(name, ") and pass options with the '").concat(parameterName, "' parameter"));
    };
  };
};

exports.makeDecorator = makeDecorator;

/***/ }),

/***/ 702:
/***/ (function(module, exports) {

module.exports = {
  CHANNEL_CREATED: 'channelCreated',
  GET_CURRENT_STORY: 'getCurrentStory',
  SET_CURRENT_STORY: 'setCurrentStory',
  GET_STORIES: 'getStories',
  SET_STORIES: 'setStories',
  SELECT_STORY: 'selectStory',
  APPLY_SHORTCUT: 'applyShortcut',
  STORY_ADDED: 'storyAdded',
  FORCE_RE_RENDER: 'forceReRender',
  REGISTER_SUBSCRIPTION: 'registerSubscription',
  STORY_RENDERED: 'storyRendered',
  STORY_ERRORED: 'storyErrored',
  STORY_THREW_EXCEPTION: 'storyThrewException',
};


/***/ }),

/***/ 703:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {

__webpack_require__(0);

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.logger = void 0;
var _global = global,
    console = _global.console;
var logger = {
  info: function info(message) {
    return console.log(message);
  },
  warn: function warn(message) {
    return console.warn(message);
  },
  error: function error(message) {
    return console.error(message);
  }
};
exports.logger = logger;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(29)))

/***/ }),

/***/ 704:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(0);

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.REQUEST_CHECK_EVENT_ID = exports.RERUN_EVENT_ID = exports.CHECK_EVENT_ID = exports.PANEL_ID = exports.ADDON_ID = void 0;
// addons, panels and events get unique names using a prefix
var ADDON_ID = '@storybook/addon-a11y';
exports.ADDON_ID = ADDON_ID;
var PANEL_ID = "".concat(ADDON_ID, "/panel");
exports.PANEL_ID = PANEL_ID;
var CHECK_EVENT_ID = "".concat(ADDON_ID, "/check");
exports.CHECK_EVENT_ID = CHECK_EVENT_ID;
var RERUN_EVENT_ID = "".concat(ADDON_ID, "/rerun");
exports.RERUN_EVENT_ID = RERUN_EVENT_ID;
var REQUEST_CHECK_EVENT_ID = "".concat(ADDON_ID, "/request-check");
exports.REQUEST_CHECK_EVENT_ID = REQUEST_CHECK_EVENT_ID;

/***/ }),

/***/ 717:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


if (true) {
  __webpack_require__(718);
  module.exports = __webpack_require__(719);
} else {}

/***/ }),

/***/ 718:
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ 719:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*
 @license rex-react-component-starter-kit v1.9.4 2019-03-08
 rex-react-component-starter-kit.production.min.js

 Copyright (c) 2018-present, Rakuten, Inc.

 This source code is licensed under the MIT license found in the LICENSE file in the root directory of this source tree.
*/


var _create = __webpack_require__(244);

var _create2 = _interopRequireDefault(_create);

var _toStringTag = __webpack_require__(720);

var _toStringTag2 = _interopRequireDefault(_toStringTag);

var _symbol = __webpack_require__(240);

var _symbol2 = _interopRequireDefault(_symbol);

var _defineProperty = __webpack_require__(165);

var _defineProperty2 = _interopRequireDefault(_defineProperty);

var _typeof2 = __webpack_require__(37);

var _typeof3 = _interopRequireDefault(_typeof2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(function (f, a) {
  "object" === ( false ? undefined : (0, _typeof3.default)(exports)) && "object" === ( false ? undefined : (0, _typeof3.default)(module)) ? module.exports = a(__webpack_require__(1)) :  true ? !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(1)], __WEBPACK_AMD_DEFINE_FACTORY__ = (a),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)) : undefined;
})(window, function (f) {
  return function (a) {
    function c(b) {
      if (d[b]) return d[b].exports;var e = d[b] = { i: b, l: !1, exports: {} };a[b].call(e.exports, e, e.exports, c);e.l = !0;return e.exports;
    }
    var d = {};c.m = a;c.c = d;c.d = function (b, a, d) {
      c.o(b, a) || (0, _defineProperty2.default)(b, a, { enumerable: !0, get: d });
    };c.r = function (b) {
      "undefined" !== typeof _symbol2.default && _toStringTag2.default && (0, _defineProperty2.default)(b, _toStringTag2.default, { value: "Module" });Object.defineProperty(b, "__esModule", { value: !0 });
    };c.t = function (b, a) {
      a & 1 && (b = c(b));if (a & 8 || a & 4 && "object" === (typeof b === "undefined" ? "undefined" : (0, _typeof3.default)(b)) && b && b.__esModule) return b;var e = (0, _create2.default)(null);c.r(e);Object.defineProperty(e, "default", { enumerable: !0, value: b });if (a & 2 && "string" != typeof b) for (var g in b) {
        c.d(e, g, function (a) {
          return b[a];
        }.bind(null, g));
      }return e;
    };c.n = function (a) {
      var b = a && a.__esModule ? function () {
        return a["default"];
      } : function () {
        return a;
      };c.d(b, "a", b);return b;
    };c.o = function (a, c) {
      return Object.prototype.hasOwnProperty.call(a, c);
    };c.p = "/";return c(c.s = 0);
  }([function (a, c, d) {
    function b(a) {
      var b = a.children;return e.default.createElement("div", { className: a.className, onClick: a.onClick, role: "presentation" }, e.default.createElement("h1", null, a.text), b);
    }Object.defineProperty(c, "__esModule", { value: !0 });c.default = b;var e = (a = d(1)) && a.__esModule ? a : { default: a };a = d(2);d(5);b.defaultProps = { children: null, text: "Welcome to React", className: "my-component", onClick: function onClick() {
        return null;
      } };b.propTypes = { children: (0, a.oneOfType)([a.string, a.element, (0, a.arrayOf)(a.element)]), text: a.string, className: a.string, onClick: a.func };
  }, function (a, c) {
    a.exports = f;
  }, function (a, c, d) {
    a.exports = d(3)();
  }, function (a, c, d) {
    function b() {}function e() {}var f = d(4);e.resetWarningCache = b;a.exports = function () {
      function a(a, b, c, d, e, g) {
        if (g !== f) throw a = Error("Calling PropTypes validators directly is not supported by the `prop-types` package. Use PropTypes.checkPropTypes() to call them. Read more at http://fb.me/use-check-prop-types"), a.name = "Invariant Violation", a;
      }function c() {
        return a;
      }a.isRequired = a;var d = { array: a, bool: a, func: a, number: a, object: a, string: a, symbol: a, any: a, arrayOf: c, element: a, elementType: a, instanceOf: c, node: a, objectOf: c, oneOf: c, oneOfType: c, shape: c, exact: c, checkPropTypes: e, resetWarningCache: b };return d.PropTypes = d;
    };
  }, function (a, c, d) {
    a.exports = "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED";
  }, function (a, c, d) {}]);
});
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(54)(module)))

/***/ })

}]);