(window["RexReactComponentStarterKitOnDemand"] = window["RexReactComponentStarterKitOnDemand"] || []).push([[2],{

/***/ 176:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = action;

__webpack_require__(4);

__webpack_require__(11);

__webpack_require__(2);

__webpack_require__(3);

__webpack_require__(5);

__webpack_require__(0);

__webpack_require__(18);

var _v = _interopRequireDefault(__webpack_require__(580));

var _addons = _interopRequireDefault(__webpack_require__(256));

var _constants = __webpack_require__(120);

var _util = __webpack_require__(586);

var _configureActions = __webpack_require__(269);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function action(name) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  var actionOptions = _objectSpread({}, _configureActions.config, options); // eslint-disable-next-line no-shadow


  var handler = function action() {
    for (var _len = arguments.length, _args = new Array(_len), _key = 0; _key < _len; _key++) {
      _args[_key] = arguments[_key];
    }

    var args = _args.map(function (arg) {
      return (0, _util.prepareArguments)(arg, actionOptions.depth);
    });

    var channel = _addons.default.getChannel();

    var id = (0, _v.default)();
    channel.emit(_constants.EVENT_ID, {
      id: id,
      data: {
        name: name,
        args: args
      },
      options: actionOptions
    });
  };

  if (_util.canConfigureName && name && typeof name === 'string') {
    Object.defineProperty(handler, 'name', {
      value: name
    });
  }

  return handler;
}

/***/ }),

/***/ 179:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(0);

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = actions;

__webpack_require__(10);

__webpack_require__(3);

__webpack_require__(5);

__webpack_require__(2);

__webpack_require__(4);

var _action = _interopRequireDefault(__webpack_require__(176));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function actions() {
  var options = {};

  for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }

  var names = args; // last argument can be options

  if (names.length !== 1 && typeof args[args.length - 1] !== 'string') {
    options = names.pop();
  }

  var namesObject = names[0];

  if (names.length !== 1 || typeof namesObject === 'string') {
    namesObject = {};
    names.forEach(function (name) {
      namesObject[name] = name;
    });
  }

  var actionsObject = {};
  Object.keys(namesObject).forEach(function (name) {
    actionsObject[name] = (0, _action.default)(namesObject[name], options);
  });
  return actionsObject;
}

/***/ }),

/***/ 256:
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

var _storybookChannelMock = _interopRequireDefault(__webpack_require__(583));

var _makeDecorator = __webpack_require__(585);

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

/***/ 257:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(0);

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

// IE11 may return an undefined descriptor, but it supports Function#name
var func = function unnamed() {};

var nameDescriptor = Object.getOwnPropertyDescriptor(func, 'name'); // This condition is true in modern browsers that implement Function#name properly

var canConfigureName = !nameDescriptor || nameDescriptor.configurable;
var _default = canConfigureName;
exports.default = _default;

/***/ }),

/***/ 258:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(0);

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = getPropertiesList;

__webpack_require__(10);

var hasOwnProperty = Object.prototype.hasOwnProperty;

function getPropertiesList(value) {
  var keys = []; // eslint-disable-next-line no-restricted-syntax, guard-for-in

  for (var name in value) {
    try {
      if (hasOwnProperty.call(value, name) || typeof value[name] !== 'function') {
        keys.push(name);
      }
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error("Error accessing property ".concat(name), error);
    }
  }

  return keys;
}

/***/ }),

/***/ 259:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(0);

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = isObject;

__webpack_require__(27);

__webpack_require__(28);

var toString = Object.prototype.toString;

function isObject(value) {
  return toString.call(value) === '[object Object]';
}

/***/ }),

/***/ 260:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = muteProperty;

__webpack_require__(0);

function muteProperty(key, value) {
  return Object.defineProperty(value, key, {
    enumerable: false
  });
}

/***/ }),

/***/ 261:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(0);

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

__webpack_require__(262);

var _types = __webpack_require__(177);

function typeReplacer(value) {
  var found = _types.types.find(function (type) {
    return type.is(value);
  });

  if (found) {
    return {
      value: found.serialize(value)
    };
  }

  return false;
}

var _default = typeReplacer;
exports.default = _default;

/***/ }),

/***/ 266:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(0);

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = omitProperty;

__webpack_require__(616);

function omitProperty(name) {
  return name.startsWith('__') || name.startsWith('STORYBOOK_');
}

/***/ }),

/***/ 268:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(0);

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

__webpack_require__(262);

var _types = __webpack_require__(177);

var hasOwnProperty = Object.prototype.hasOwnProperty;

var allTypes = _types.types.concat(_types.objectType);

function typeFilter(value) {
  var found = allTypes.find(function (type) {
    return hasOwnProperty.call(value, type.KEY);
  });

  if (found) {
    return {
      value: found.deserialize(value)
    };
  }

  return false;
}

var _default = typeFilter;
exports.default = _default;

/***/ }),

/***/ 269:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(0);

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.configureActions = configureActions;
exports.config = void 0;

__webpack_require__(89);

var config = {
  depth: 10,
  clearOnStoryChange: true,
  limit: 50
};
exports.config = config;

function configureActions() {
  var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  Object.assign(config, options);
}

/***/ }),

/***/ 270:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(0);

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.createDecorator = void 0;

__webpack_require__(9);

__webpack_require__(8);

__webpack_require__(19);

__webpack_require__(4);

__webpack_require__(263);

__webpack_require__(2);

__webpack_require__(3);

__webpack_require__(175);

__webpack_require__(18);

var _global = __webpack_require__(17);

var _isEqual = _interopRequireDefault(__webpack_require__(621));

var _addons = _interopRequireDefault(__webpack_require__(256));

var _coreEvents = _interopRequireDefault(__webpack_require__(684));

var _actions = _interopRequireDefault(__webpack_require__(179));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var lastSubscription;
var lastArgs;
var delegateEventSplitter = /^(\S+)\s*(.*)$/;
var isIE = _global.Element != null && !_global.Element.prototype.matches;
var matchesMethod = isIE ? 'msMatchesSelector' : 'matches';

var root = _global.document && _global.document.getElementById('root');

var hasMatchInAncestry = function hasMatchInAncestry(element, selector) {
  if (element[matchesMethod](selector)) {
    return true;
  }

  var parent = element.parentElement;

  if (!parent) {
    return false;
  }

  return hasMatchInAncestry(parent, selector);
};

var createHandlers = function createHandlers(actionsFn) {
  for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    args[_key - 1] = arguments[_key];
  }

  var actionsObject = actionsFn.apply(void 0, args);
  return Object.entries(actionsObject).map(function (_ref) {
    var _ref2 = _slicedToArray(_ref, 2),
        key = _ref2[0],
        action = _ref2[1];

    // eslint-disable-next-line no-unused-vars
    var _key$match = key.match(delegateEventSplitter),
        _key$match2 = _slicedToArray(_key$match, 3),
        _ = _key$match2[0],
        eventName = _key$match2[1],
        selector = _key$match2[2];

    return {
      eventName: eventName,
      handler: function handler(e) {
        if (!selector || hasMatchInAncestry(e.target, selector)) {
          action(e);
        }
      }
    };
  });
};

var actionsSubscription = function actionsSubscription() {
  for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
    args[_key2] = arguments[_key2];
  }

  if (!(0, _isEqual.default)(args, lastArgs)) {
    lastArgs = args;
    var handlers = createHandlers.apply(void 0, args);

    lastSubscription = function lastSubscription() {
      handlers.forEach(function (_ref3) {
        var eventName = _ref3.eventName,
            handler = _ref3.handler;
        return root.addEventListener(eventName, handler);
      });
      return function () {
        return handlers.forEach(function (_ref4) {
          var eventName = _ref4.eventName,
              handler = _ref4.handler;
          return root.removeEventListener(eventName, handler);
        });
      };
    };
  }

  return lastSubscription;
};

var createDecorator = function createDecorator(actionsFn) {
  return function () {
    for (var _len3 = arguments.length, args = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
      args[_key3] = arguments[_key3];
    }

    return function (story) {
      if (root != null) {
        _addons.default.getChannel().emit(_coreEvents.default.REGISTER_SUBSCRIPTION, actionsSubscription.apply(void 0, [actionsFn].concat(args)));
      }

      return story();
    };
  };
};

exports.createDecorator = createDecorator;

var _default = createDecorator(_actions.default);

exports.default = _default;

/***/ }),

/***/ 279:
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

var _storybookChannelMock = _interopRequireDefault(__webpack_require__(686));

var _makeDecorator = __webpack_require__(688);

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

/***/ 459:
/***/ (function(module, exports, __webpack_require__) {

const preview = __webpack_require__(460);

exports.setOptions = preview.setOptions;
exports.withOptions = preview.withOptions;
preview.init();


/***/ }),

/***/ 460:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.init = init;
exports.withOptions = exports.setOptions = void 0;

__webpack_require__(4);

__webpack_require__(11);

__webpack_require__(2);

__webpack_require__(3);

__webpack_require__(5);

__webpack_require__(0);

__webpack_require__(27);

__webpack_require__(28);

var _utilDeprecate = _interopRequireDefault(__webpack_require__(45));

var _addons = _interopRequireWildcard(__webpack_require__(461));

var _shared = __webpack_require__(465);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

// init function will be executed once when the storybook loads for the
// first time. This is a good place to add global listeners on channel.
function init() {// NOTE nothing to do here
}

function regExpStringify(exp) {
  if (typeof exp === 'string') return exp;
  if (Object.prototype.toString.call(exp) === '[object RegExp]') return exp.source;
  return null;
}

function hasOwnProp(object, propName) {
  return Object.prototype.hasOwnProperty.call(object, propName);
}

function withRegexProp(object, propName) {
  return hasOwnProp(object, propName) ? _defineProperty({}, propName, regExpStringify(object[propName])) : {};
}

function emitOptions(options) {
  var channel = _addons.default.getChannel();

  if (!channel) {
    throw new Error('Failed to find addon channel. This may be due to https://github.com/storybooks/storybook/issues/1192.');
  } // since 'undefined' and 'null' are the valid values we don't want to
  // override the hierarchySeparator or hierarchyRootSeparator if the prop is missing


  channel.emit(_shared.EVENT_ID, {
    options: _objectSpread({}, options, withRegexProp(options, 'hierarchySeparator'), withRegexProp(options, 'hierarchyRootSeparator'))
  });
} // setOptions function will send Storybook UI options when the channel is
// ready. If called before, options will be cached until it can be sent.


var globalOptions = {};
var setOptions = (0, _utilDeprecate.default)(function (options) {
  globalOptions = options;
  emitOptions(options);
}, '`setOptions(options)` is deprecated. Please use the `withOptions(options)` decorator globally.');
exports.setOptions = setOptions;
var withOptions = (0, _addons.makeDecorator)({
  name: 'withOptions',
  parameterName: 'options',
  skipIfNoParametersOrOptions: false,
  wrapper: function wrapper(getStory, context, _ref2) {
    var inputOptions = _ref2.options,
        parameters = _ref2.parameters;
    emitOptions(_objectSpread({}, globalOptions, inputOptions, parameters));
    return getStory(context);
  }
});
exports.withOptions = withOptions;

/***/ }),

/***/ 461:
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

var _storybookChannelMock = _interopRequireDefault(__webpack_require__(462));

var _makeDecorator = __webpack_require__(464);

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

/***/ 462:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(0);

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = createChannel;

var _channels = _interopRequireDefault(__webpack_require__(463));

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

/***/ 463:
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

/***/ 464:
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

/***/ 465:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(0);

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EVENT_ID = exports.ADDON_ID = void 0;
// addons, panels and events get unique names using a prefix
var ADDON_ID = 'storybooks/storybook-addon-options';
exports.ADDON_ID = ADDON_ID;
var EVENT_ID = "".concat(ADDON_ID, "/options-event");
exports.EVENT_ID = EVENT_ID;

/***/ }),

/***/ 579:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(0);

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "action", {
  enumerable: true,
  get: function get() {
    return _action.default;
  }
});
Object.defineProperty(exports, "actions", {
  enumerable: true,
  get: function get() {
    return _actions.default;
  }
});
Object.defineProperty(exports, "configureActions", {
  enumerable: true,
  get: function get() {
    return _configureActions.configureActions;
  }
});
Object.defineProperty(exports, "decorateAction", {
  enumerable: true,
  get: function get() {
    return _decorateAction.decorateAction;
  }
});
Object.defineProperty(exports, "decorate", {
  enumerable: true,
  get: function get() {
    return _decorateAction.decorate;
  }
});
Object.defineProperty(exports, "withActions", {
  enumerable: true,
  get: function get() {
    return _withActions.default;
  }
});

var _action = _interopRequireDefault(__webpack_require__(176));

var _actions = _interopRequireDefault(__webpack_require__(179));

var _configureActions = __webpack_require__(269);

var _decorateAction = __webpack_require__(620);

var _withActions = _interopRequireDefault(__webpack_require__(270));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ }),

/***/ 583:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(0);

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = createChannel;

var _channels = _interopRequireDefault(__webpack_require__(584));

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

/***/ 584:
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

/***/ 585:
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

/***/ 586:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(0);

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "canConfigureName", {
  enumerable: true,
  get: function get() {
    return _canConfigureName2.default;
  }
});
Object.defineProperty(exports, "getPropertiesList", {
  enumerable: true,
  get: function get() {
    return _getPropertiesList2.default;
  }
});
Object.defineProperty(exports, "isObject", {
  enumerable: true,
  get: function get() {
    return _isObject2.default;
  }
});
Object.defineProperty(exports, "muteProperty", {
  enumerable: true,
  get: function get() {
    return _muteProperty2.default;
  }
});
Object.defineProperty(exports, "prepareArguments", {
  enumerable: true,
  get: function get() {
    return _prepareArguments2.default;
  }
});
Object.defineProperty(exports, "typeReviver", {
  enumerable: true,
  get: function get() {
    return _typeReviver2.default;
  }
});
Object.defineProperty(exports, "typeReplacer", {
  enumerable: true,
  get: function get() {
    return _typeReplacer2.default;
  }
});
Object.defineProperty(exports, "omitProperty", {
  enumerable: true,
  get: function get() {
    return _omitProperty2.default;
  }
});

var _canConfigureName2 = _interopRequireDefault(__webpack_require__(257));

var _getPropertiesList2 = _interopRequireDefault(__webpack_require__(258));

var _isObject2 = _interopRequireDefault(__webpack_require__(259));

var _muteProperty2 = _interopRequireDefault(__webpack_require__(260));

var _prepareArguments2 = _interopRequireDefault(__webpack_require__(587));

var _typeReviver2 = _interopRequireDefault(__webpack_require__(268));

var _typeReplacer2 = _interopRequireDefault(__webpack_require__(261));

var _omitProperty2 = _interopRequireDefault(__webpack_require__(266));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ }),

/***/ 587:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(0);

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = prepareArguments;

__webpack_require__(27);

__webpack_require__(28);

var _index = __webpack_require__(588);

function prepareArguments(arg, depth) {
  try {
    return JSON.stringify((0, _index.decycle)(arg, depth));
  } catch (error) {
    return error.toString(); // IE still cyclic.
  }
}

/***/ }),

/***/ 611:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

__webpack_require__(0);

__webpack_require__(27);

__webpack_require__(28);

__webpack_require__(265);

var _createRegExp = _interopRequireDefault(__webpack_require__(612));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var KEY = '$___storybook.regExpKey';
var regExpType = {
  KEY: KEY,
  is: function is(value) {
    return value instanceof RegExp;
  },
  serialize: function serialize(value) {
    return _defineProperty({}, KEY, value.toString());
  },
  deserialize: function deserialize(value) {
    return (0, _createRegExp.default)(value[KEY]);
  }
};
var _default = regExpType;
exports.default = _default;

/***/ }),

/***/ 612:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(0);

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = createRegExp;

__webpack_require__(265);

__webpack_require__(153);

function createRegExp(regExp) {
  var parts = regExp.split('/');
  return new RegExp(parts[1], parts[2]);
}

/***/ }),

/***/ 613:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

__webpack_require__(0);

__webpack_require__(9);

__webpack_require__(8);

var _createSymbol = _interopRequireDefault(__webpack_require__(614));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var KEY = '$___storybook.symbolName';
var symbolType = {
  KEY: KEY,
  is: function is(value) {
    return _typeof(value) === 'symbol';
  },
  serialize: function serialize(value) {
    return _defineProperty({}, KEY, String(value).slice(7, -1) || null);
  },
  deserialize: function deserialize(value) {
    return (0, _createSymbol.default)(value[KEY]);
  }
};
var _default = symbolType;
exports.default = _default;

/***/ }),

/***/ 614:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(0);

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = createSymbol;

__webpack_require__(9);

__webpack_require__(8);

function createSymbol(name) {
  return Symbol(name);
}

/***/ }),

/***/ 615:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

__webpack_require__(0);

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var KEY = '$___storybook.undefined';
var undefinedType = {
  KEY: KEY,
  is: function is(value) {
    return value === undefined;
  },
  serialize: function serialize() {
    return _defineProperty({}, KEY, true);
  },
  deserialize: function deserialize() {
    return undefined;
  }
};
var _default = undefinedType;
exports.default = _default;

/***/ }),

/***/ 620:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(0);

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.decorateAction = decorateAction;
exports.decorate = decorate;

__webpack_require__(34);

__webpack_require__(44);

__webpack_require__(27);

__webpack_require__(28);

__webpack_require__(9);

__webpack_require__(8);

__webpack_require__(19);

__webpack_require__(10);

__webpack_require__(3);

__webpack_require__(5);

__webpack_require__(2);

__webpack_require__(4);

__webpack_require__(145);

var _action = _interopRequireDefault(__webpack_require__(176));

var _actions = _interopRequireDefault(__webpack_require__(179));

var _withActions = __webpack_require__(270);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function applyDecorators(decorators, actionCallback) {
  return function () {
    for (var _len = arguments.length, _args = new Array(_len), _key = 0; _key < _len; _key++) {
      _args[_key] = arguments[_key];
    }

    var decorated = decorators.reduce(function (args, fn) {
      return fn(args);
    }, _args);
    actionCallback.apply(void 0, _toConsumableArray(decorated));
  };
}

function decorateAction(decorators) {
  return function (name, options) {
    var callAction = (0, _action.default)(name, options);
    return applyDecorators(decorators, callAction);
  };
}

function decorate(decorators) {
  var decorated = decorateAction(decorators);

  var decoratedActions = function decoratedActions() {
    var rawActions = _actions.default.apply(void 0, arguments);

    var actionsObject = {};
    Object.keys(rawActions).forEach(function (name) {
      actionsObject[name] = applyDecorators(decorators, rawActions[name]);
    });
    return actionsObject;
  };

  return {
    action: decorated,
    actions: decoratedActions,
    withActions: (0, _withActions.createDecorator)(decoratedActions)
  };
}

/***/ }),

/***/ 684:
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

/***/ 685:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.knob = knob;
exports.text = text;
exports.boolean = boolean;
exports.number = number;
exports.color = color;
exports.object = object;
exports.select = select;
exports.radios = radios;
exports.array = array;
exports.date = date;
exports.button = button;
exports.files = files;
exports.withKnobsOptions = exports.withKnobs = void 0;

__webpack_require__(4);

__webpack_require__(11);

__webpack_require__(2);

__webpack_require__(3);

__webpack_require__(5);

__webpack_require__(0);

var _utilDeprecate = _interopRequireDefault(__webpack_require__(45));

var _addons = _interopRequireWildcard(__webpack_require__(279));

var _registerKnobs = __webpack_require__(689);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function knob(name, options) {
  return _registerKnobs.manager.knob(name, options);
}

function text(name, value, groupId) {
  return _registerKnobs.manager.knob(name, {
    type: 'text',
    value: value,
    groupId: groupId
  });
}

function boolean(name, value, groupId) {
  return _registerKnobs.manager.knob(name, {
    type: 'boolean',
    value: value,
    groupId: groupId
  });
}

function number(name, value) {
  var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  var groupId = arguments.length > 3 ? arguments[3] : undefined;
  var rangeDefaults = {
    min: 0,
    max: 10,
    step: 1
  };
  var mergedOptions = options.range ? _objectSpread({}, rangeDefaults, options) : options;

  var finalOptions = _objectSpread({}, mergedOptions, {
    type: 'number',
    value: value,
    groupId: groupId
  });

  return _registerKnobs.manager.knob(name, finalOptions);
}

function color(name, value, groupId) {
  return _registerKnobs.manager.knob(name, {
    type: 'color',
    value: value,
    groupId: groupId
  });
}

function object(name, value, groupId) {
  return _registerKnobs.manager.knob(name, {
    type: 'object',
    value: value,
    groupId: groupId
  });
}

function select(name, options, value, groupId) {
  return _registerKnobs.manager.knob(name, {
    type: 'select',
    selectV2: true,
    options: options,
    value: value,
    groupId: groupId
  });
}

function radios(name, options, value, groupId) {
  return _registerKnobs.manager.knob(name, {
    type: 'radios',
    options: options,
    value: value,
    groupId: groupId
  });
}

function array(name, value) {
  var separator = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : ',';
  var groupId = arguments.length > 3 ? arguments[3] : undefined;
  return _registerKnobs.manager.knob(name, {
    type: 'array',
    value: value,
    separator: separator,
    groupId: groupId
  });
}

function date(name) {
  var value = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : new Date();
  var groupId = arguments.length > 2 ? arguments[2] : undefined;
  var proxyValue = value ? value.getTime() : null;
  return _registerKnobs.manager.knob(name, {
    type: 'date',
    value: proxyValue,
    groupId: groupId
  });
}

function button(name, callback, groupId) {
  return _registerKnobs.manager.knob(name, {
    type: 'button',
    callback: callback,
    hideLabel: true,
    groupId: groupId
  });
}

function files(name, accept) {
  var value = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];
  return _registerKnobs.manager.knob(name, {
    type: 'files',
    accept: accept,
    value: value
  });
}

var defaultOptions = {
  escapeHTML: true
};
var withKnobs = (0, _addons.makeDecorator)({
  name: 'withKnobs',
  parameterName: 'knobs',
  skipIfNoParametersOrOptions: false,
  allowDeprecatedUsage: true,
  wrapper: function wrapper(getStory, context, _ref) {
    var options = _ref.options,
        parameters = _ref.parameters;
    var storyOptions = parameters || options;

    var allOptions = _objectSpread({}, defaultOptions, storyOptions);

    _registerKnobs.manager.setOptions(allOptions);

    var channel = _addons.default.getChannel();

    _registerKnobs.manager.setChannel(channel);

    channel.emit('addon:knobs:setOptions', allOptions);
    (0, _registerKnobs.registerKnobs)();
    return getStory(context);
  }
});
exports.withKnobs = withKnobs;
var withKnobsOptions = (0, _utilDeprecate.default)(withKnobs, 'withKnobsOptions is deprecated. Instead, you can pass options into withKnobs(options) directly, or use the knobs parameter.');
exports.withKnobsOptions = withKnobsOptions;

/***/ }),

/***/ 686:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(0);

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = createChannel;

var _channels = _interopRequireDefault(__webpack_require__(687));

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

/***/ 687:
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

/***/ 688:
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

/***/ 689:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(0);

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.registerKnobs = registerKnobs;
exports.manager = void 0;

__webpack_require__(10);

var _addons = _interopRequireDefault(__webpack_require__(279));

var _coreEvents = _interopRequireDefault(__webpack_require__(690));

var _KnobManager = _interopRequireDefault(__webpack_require__(691));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var manager = new _KnobManager.default();
exports.manager = manager;
var knobStore = manager.knobStore;

function forceReRender() {
  _addons.default.getChannel().emit(_coreEvents.default.FORCE_RE_RENDER);
}

function setPaneKnobs() {
  var timestamp = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : +new Date();

  var channel = _addons.default.getChannel();

  channel.emit('addon:knobs:setKnobs', {
    knobs: knobStore.getAll(),
    timestamp: timestamp
  });
}

function knobChanged(change) {
  var name = change.name,
      value = change.value; // Update the related knob and it's value.

  var knobOptions = knobStore.get(name);
  knobOptions.value = value;
  knobStore.markAllUnused();
  forceReRender();
}

function knobClicked(clicked) {
  var knobOptions = knobStore.get(clicked.name);
  knobOptions.callback();
  forceReRender();
}

function resetKnobs() {
  knobStore.reset();
  forceReRender();
  setPaneKnobs(false);
}

function disconnectCallbacks() {
  var channel = _addons.default.getChannel();

  channel.removeListener('addon:knobs:knobChange', knobChanged);
  channel.removeListener('addon:knobs:knobClick', knobClicked);
  channel.removeListener('addon:knobs:reset', resetKnobs);
  knobStore.unsubscribe(setPaneKnobs);
}

function connectCallbacks() {
  var channel = _addons.default.getChannel();

  channel.on('addon:knobs:knobChange', knobChanged);
  channel.on('addon:knobs:knobClick', knobClicked);
  channel.on('addon:knobs:reset', resetKnobs);
  knobStore.subscribe(setPaneKnobs);
  return disconnectCallbacks;
}

function registerKnobs() {
  _addons.default.getChannel().emit(_coreEvents.default.REGISTER_SUBSCRIPTION, connectCallbacks);
}

/***/ }),

/***/ 690:
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

/***/ 691:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

__webpack_require__(4);

__webpack_require__(11);

__webpack_require__(5);

__webpack_require__(9);

__webpack_require__(8);

__webpack_require__(0);

__webpack_require__(2);

__webpack_require__(3);

__webpack_require__(175);

__webpack_require__(145);

__webpack_require__(692);

__webpack_require__(18);

__webpack_require__(19);

var _fastDeepEqual = _interopRequireDefault(__webpack_require__(693));

var _escapeHtml = _interopRequireDefault(__webpack_require__(694));

var _KnobStore = _interopRequireDefault(__webpack_require__(695));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

// This is used by _mayCallChannel to determine how long to wait to before triggering a panel update
var PANEL_UPDATE_INTERVAL = 400;

var escapeStrings = function escapeStrings(obj) {
  if (typeof obj === 'string') {
    return (0, _escapeHtml.default)(obj);
  }

  if (obj == null || _typeof(obj) !== 'object') {
    return obj;
  }

  if (Array.isArray(obj)) {
    var newArray = obj.map(escapeStrings);
    var didChange = newArray.some(function (newValue, key) {
      return newValue !== obj[key];
    });
    return didChange ? newArray : obj;
  }

  return Object.entries(obj).reduce(function (acc, _ref) {
    var _ref2 = _slicedToArray(_ref, 2),
        key = _ref2[0],
        oldValue = _ref2[1];

    var newValue = escapeStrings(oldValue);
    return newValue === oldValue ? acc : _objectSpread({}, acc, _defineProperty({}, key, newValue));
  }, obj);
};

var KnobManager =
/*#__PURE__*/
function () {
  function KnobManager() {
    _classCallCheck(this, KnobManager);

    this.knobStore = new _KnobStore.default();
    this.options = {};
  }

  _createClass(KnobManager, [{
    key: "setChannel",
    value: function setChannel(channel) {
      this.channel = channel;
    }
  }, {
    key: "setOptions",
    value: function setOptions(options) {
      this.options = options;
    }
  }, {
    key: "getKnobValue",
    value: function getKnobValue(_ref3) {
      var value = _ref3.value;
      return this.options.escapeHTML ? escapeStrings(value) : value;
    }
  }, {
    key: "knob",
    value: function knob(name, options) {
      this._mayCallChannel();

      var knobStore = this.knobStore;
      var existingKnob = knobStore.get(name); // We need to return the value set by the knob editor via this.
      // But, if the user changes the code for the defaultValue we should set
      // that value instead.

      if (existingKnob && (0, _fastDeepEqual.default)(options.value, existingKnob.defaultValue)) {
        return this.getKnobValue(existingKnob);
      }

      var defaultValue = options.value;

      var knobInfo = _objectSpread({}, options, {
        name: name,
        defaultValue: defaultValue
      });

      knobStore.set(name, knobInfo);
      return this.getKnobValue(knobStore.get(name));
    }
  }, {
    key: "_mayCallChannel",
    value: function _mayCallChannel() {
      var _this = this;

      // Re rendering of the story may cause changes to the knobStore. Some new knobs maybe added and
      // Some knobs may go unused. So we need to update the panel accordingly. For example remove the
      // unused knobs from the panel. This function sends the `setKnobs` message to the channel
      // triggering a panel re-render.
      if (this.calling) {
        // If a call to channel has already registered ignore this call.
        // Once the previous call is completed all the changes to knobStore including the one that
        // triggered this, will be added to the panel.
        // This avoids emitting to the channel within very short periods of time.
        return;
      }

      this.calling = true;
      var timestamp = +new Date();
      setTimeout(function () {
        _this.calling = false; // emit to the channel and trigger a panel re-render

        _this.channel.emit('addon:knobs:setKnobs', {
          knobs: _this.knobStore.getAll(),
          timestamp: timestamp
        });
      }, PANEL_UPDATE_INTERVAL);
    }
  }]);

  return KnobManager;
}();

exports.default = KnobManager;

/***/ }),

/***/ 695:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

__webpack_require__(0);

__webpack_require__(102);

__webpack_require__(3);

__webpack_require__(5);

__webpack_require__(2);

__webpack_require__(4);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var callArg = function callArg(fn) {
  return fn();
};

var callAll = function callAll(fns) {
  return fns.forEach(callArg);
};

var KnobStore =
/*#__PURE__*/
function () {
  function KnobStore() {
    _classCallCheck(this, KnobStore);

    this.store = {};
    this.callbacks = [];
  }

  _createClass(KnobStore, [{
    key: "has",
    value: function has(key) {
      return this.store[key] !== undefined;
    }
  }, {
    key: "set",
    value: function set(key, value) {
      this.store[key] = value;
      this.store[key].used = true;
      this.store[key].groupId = value.groupId; // debounce the execution of the callbacks for 50 milliseconds

      if (this.timer) {
        clearTimeout(this.timer);
      }

      this.timer = setTimeout(callAll, 50, this.callbacks);
    }
  }, {
    key: "get",
    value: function get(key) {
      var knob = this.store[key];

      if (knob) {
        knob.used = true;
      }

      return knob;
    }
  }, {
    key: "getAll",
    value: function getAll() {
      return this.store;
    }
  }, {
    key: "reset",
    value: function reset() {
      this.store = {};
    }
  }, {
    key: "markAllUnused",
    value: function markAllUnused() {
      var _this = this;

      Object.keys(this.store).forEach(function (knobName) {
        _this.store[knobName].used = false;
      });
    }
  }, {
    key: "subscribe",
    value: function subscribe(cb) {
      this.callbacks.push(cb);
    }
  }, {
    key: "unsubscribe",
    value: function unsubscribe(cb) {
      var index = this.callbacks.indexOf(cb);
      this.callbacks.splice(index, 1);
    }
  }]);

  return KnobStore;
}();

exports.default = KnobStore;

/***/ }),

/***/ 707:
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

var _storybookChannelMock = _interopRequireDefault(__webpack_require__(708));

var _makeDecorator = __webpack_require__(710);

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

/***/ 708:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(0);

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = createChannel;

var _channels = _interopRequireDefault(__webpack_require__(709));

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

/***/ 709:
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

/***/ 710:
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

/***/ })

}]);