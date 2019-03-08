(window["RexReactComponentStarterKitOnDemand"] = window["RexReactComponentStarterKitOnDemand"] || []).push([[9],{

/***/ 144:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

__webpack_require__(9);

__webpack_require__(8);

__webpack_require__(0);

__webpack_require__(58);

__webpack_require__(59);

__webpack_require__(4);

__webpack_require__(10);

__webpack_require__(2);

__webpack_require__(3);

__webpack_require__(5);

__webpack_require__(11);

__webpack_require__(389);

__webpack_require__(18);

var _eventemitter = _interopRequireDefault(__webpack_require__(390));

var _coreEvents = _interopRequireDefault(__webpack_require__(90));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var count = 0;

function getId() {
  count += 1;
  return count;
}

var StoryStore =
/*#__PURE__*/
function (_EventEmitter) {
  _inherits(StoryStore, _EventEmitter);

  function StoryStore() {
    var _this;

    _classCallCheck(this, StoryStore);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(StoryStore).call(this));
    _this._data = {};
    _this._revision = 0;
    return _this;
  }

  _createClass(StoryStore, [{
    key: "getRevision",
    value: function getRevision() {
      return this._revision;
    }
  }, {
    key: "incrementRevision",
    value: function incrementRevision() {
      this._revision += 1;
    }
  }, {
    key: "addStory",
    value: function addStory(kind, name, fn) {
      var parameters = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};

      if (!this._data[kind]) {
        this._data[kind] = {
          kind: kind,
          fileName: parameters.fileName,
          index: getId(),
          stories: {}
        };
      }

      this._data[kind].stories[name] = {
        name: name,
        index: getId(),
        fn: fn,
        parameters: parameters
      };
      this.emit(_coreEvents.default.STORY_ADDED, kind, name, fn, parameters);
    }
  }, {
    key: "getStoryKinds",
    value: function getStoryKinds() {
      var _this2 = this;

      return Object.keys(this._data).map(function (key) {
        return _this2._data[key];
      }).filter(function (kind) {
        return Object.keys(kind.stories).length > 0;
      }).sort(function (info1, info2) {
        return info1.index - info2.index;
      }).map(function (info) {
        return info.kind;
      });
    }
  }, {
    key: "getStories",
    value: function getStories(kind) {
      var _this3 = this;

      if (!this._data[kind]) {
        return [];
      }

      return Object.keys(this._data[kind].stories).map(function (name) {
        return _this3._data[kind].stories[name];
      }).sort(function (info1, info2) {
        return info1.index - info2.index;
      }).map(function (info) {
        return info.name;
      });
    }
  }, {
    key: "getStoryFileName",
    value: function getStoryFileName(kind) {
      var storiesKind = this._data[kind];

      if (!storiesKind) {
        return null;
      }

      return storiesKind.fileName;
    }
  }, {
    key: "getStoryAndParameters",
    value: function getStoryAndParameters(kind, name) {
      var storiesKind = this._data[kind];

      if (!storiesKind) {
        return null;
      }

      var storyInfo = storiesKind.stories[name];

      if (!storyInfo) {
        return null;
      }

      var fn = storyInfo.fn,
          parameters = storyInfo.parameters;
      return {
        story: fn,
        parameters: parameters
      };
    }
  }, {
    key: "getStory",
    value: function getStory(kind, name) {
      var data = this.getStoryAndParameters(kind, name);
      return data && data.story;
    }
  }, {
    key: "getStoryWithContext",
    value: function getStoryWithContext(kind, name) {
      var data = this.getStoryAndParameters(kind, name);

      if (!data) {
        return null;
      }

      var story = data.story,
          parameters = data.parameters;
      return function () {
        return story({
          kind: kind,
          story: name,
          parameters: parameters
        });
      };
    }
  }, {
    key: "removeStoryKind",
    value: function removeStoryKind(kind) {
      if (this.hasStoryKind(kind)) {
        this._data[kind].stories = {};
      }
    }
  }, {
    key: "hasStoryKind",
    value: function hasStoryKind(kind) {
      return Boolean(this._data[kind]);
    }
  }, {
    key: "hasStory",
    value: function hasStory(kind, name) {
      return Boolean(this.getStory(kind, name));
    }
  }, {
    key: "dumpStoryBook",
    value: function dumpStoryBook() {
      var _this4 = this;

      var data = this.getStoryKinds().map(function (kind) {
        return {
          kind: kind,
          stories: _this4.getStories(kind)
        };
      });
      return data;
    }
  }, {
    key: "size",
    value: function size() {
      return Object.keys(this._data).length;
    }
  }, {
    key: "clean",
    value: function clean() {
      var _this5 = this;

      this.getStoryKinds().forEach(function (kind) {
        return delete _this5._data[kind];
      });
    }
  }]);

  return StoryStore;
}(_eventemitter.default);

exports.default = StoryStore;

/***/ }),

/***/ 174:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TabsState = exports.Tabs = exports.panelProps = exports.TabWrapper = exports.Tab = exports.TabBar = void 0;

__webpack_require__(9);

__webpack_require__(8);

__webpack_require__(58);

__webpack_require__(59);

__webpack_require__(0);

__webpack_require__(19);

__webpack_require__(18);

__webpack_require__(10);

var _react = _interopRequireWildcard(__webpack_require__(1));

var _renderFragment = _interopRequireDefault(__webpack_require__(555));

var _propTypes = _interopRequireDefault(__webpack_require__(6));

var _styled = _interopRequireDefault(__webpack_require__(25));

var _placeholder = _interopRequireDefault(__webpack_require__(255));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Wrapper =
/*#__PURE__*/
(0, _styled.default)("div", {
  target: "e1lzzkxx0"
})(function (_ref) {
  var theme = _ref.theme,
      bordered = _ref.bordered;
  return bordered ? {
    background: theme.mainFill,
    borderRadius: theme.mainBorderRadius,
    border: theme.mainBorder
  } : {};
}, function (_ref2) {
  var absolute = _ref2.absolute;
  return absolute ? {
    width: '100%',
    height: '100%',
    boxSizing: 'border-box',
    display: 'flex',
    flexDirection: 'column'
  } : {
    display: 'block'
  };
});
var TabBar =
/*#__PURE__*/
(0, _styled.default)("div", {
  target: "e1lzzkxx1"
})(function (_ref3) {
  var theme = _ref3.theme;
  return {
    background: theme.barFill,
    borderBottom: theme.mainBorder,
    overflow: 'auto',
    padding: '0 8px',
    whiteSpace: 'nowrap',
    height: 40
  };
});
exports.TabBar = TabBar;
var TabButton =
/*#__PURE__*/
(0, _styled.default)("button", {
  target: "e1lzzkxx2"
})({
  whiteSpace: 'normal',
  display: 'inline-flex',
  overflow: 'hidden',
  verticalAlign: 'top',
  justifyContent: 'center',
  alignItems: 'center',
  textAlign: 'center',
  '&:empty': {
    display: 'none'
  }
}, function (_ref4) {
  var theme = _ref4.theme;
  return {
    fontSize: 11,
    letterSpacing: '1px',
    padding: '0 8px',
    textTransform: 'uppercase',
    transition: 'color 0.2s linear, border-bottom-color 0.2s linear',
    height: 40,
    lineHeight: '12px',
    boxSizing: 'border-box',
    cursor: 'pointer',
    background: 'transparent',
    border: '0 solid transparent',
    borderTop: '3px solid transparent',
    borderBottom: '3px solid transparent',
    '&:focus': {
      outline: '0 none',
      borderBottomColor: theme.highlightColor
    }
  };
}, function (_ref5) {
  var active = _ref5.active,
      theme = _ref5.theme;
  return active ? {
    color: theme.mainTextColor,
    borderBottomColor: theme.barSelectedColor
  } : {
    color: theme.dimmedTextColor,
    borderBottomColor: 'transparent'
  };
});
var Content =
/*#__PURE__*/
(0, _styled.default)("div", {
  target: "e1lzzkxx3"
})({
  display: 'block',
  position: 'relative'
}, function (_ref6) {
  var absolute = _ref6.absolute;
  return absolute ? {
    position: 'relative',
    overflow: 'auto',
    flex: 1,
    width: '100%'
  } : {};
});

var Tab = function Tab(_ref7) {
  var active = _ref7.active,
      name = _ref7.name,
      title = _ref7.title,
      onSelect = _ref7.onSelect;

  var onClick = function onClick(e) {
    e.preventDefault();
    onSelect(name);
  };

  return _react.default.createElement(TabButton, {
    type: "button",
    key: name,
    active: active,
    onClick: onClick,
    role: "tab"
  }, typeof title === 'function' ? title() : title);
};

exports.Tab = Tab;
Tab.propTypes = {
  active: _propTypes.default.bool.isRequired,
  name: _propTypes.default.string.isRequired,
  title: _propTypes.default.oneOfType([_propTypes.default.func, _propTypes.default.node]).isRequired,
  onSelect: _propTypes.default.func.isRequired
};
var VisuallyHidden =
/*#__PURE__*/
(0, _styled.default)("div", {
  target: "e1lzzkxx4"
})(function (_ref8) {
  var active = _ref8.active;
  return active ? {
    display: 'block'
  } : {
    display: 'none'
  };
});

var TabWrapper = function TabWrapper(_ref9) {
  var active = _ref9.active,
      render = _ref9.render,
      children = _ref9.children;
  return _react.default.createElement(VisuallyHidden, {
    active: active
  }, render ? render() : children);
};

exports.TabWrapper = TabWrapper;
TabWrapper.propTypes = {
  active: _propTypes.default.bool.isRequired,
  render: _propTypes.default.func,
  children: _propTypes.default.node
};
TabWrapper.defaultProps = {
  render: undefined,
  children: undefined
};
var panelProps = {
  active: _propTypes.default.bool
};
exports.panelProps = panelProps;

var Tabs = function Tabs(_ref10) {
  var children = _ref10.children,
      selected = _ref10.selected,
      onSelect = _ref10.onSelect,
      absolute = _ref10.absolute,
      bordered = _ref10.bordered;

  var list = _react.default.Children.toArray(children).map(function (_ref11, index) {
    var _ref11$props = _ref11.props,
        title = _ref11$props.title,
        id = _ref11$props.id,
        childrenOfChild = _ref11$props.children;
    var content = Array.isArray(childrenOfChild) ? childrenOfChild[0] : childrenOfChild;
    return {
      active: selected ? id === selected : index === 0,
      title: title,
      id: id,
      render: typeof content === 'function' ? content : // eslint-disable-next-line react/prop-types
      function (_ref12) {
        var active = _ref12.active;
        return _react.default.createElement(VisuallyHidden, {
          active: active,
          role: "tabpanel"
        }, content);
      }
    };
  });

  return list.length ? _react.default.createElement(Wrapper, {
    absolute: absolute,
    bordered: bordered
  }, _react.default.createElement(TabBar, {
    role: "tablist"
  }, list.map(function (_ref13) {
    var title = _ref13.title,
        id = _ref13.id,
        active = _ref13.active;
    return _react.default.createElement(Tab, {
      key: "".concat(id, "-bar"),
      active: active,
      name: id,
      title: title,
      onSelect: onSelect
    });
  })), _react.default.createElement(Content, {
    absolute: absolute
  }, list.map(function (_ref14) {
    var id = _ref14.id,
        active = _ref14.active,
        render = _ref14.render;
    return _react.default.createElement(_renderFragment.default, {
      key: "".concat(id, "-panel")
    }, render({
      active: active,
      selected: selected
    }));
  }))) : _react.default.createElement(_placeholder.default, null, "no panels available");
};

exports.Tabs = Tabs;
Tabs.propTypes = {
  children: _propTypes.default.arrayOf(_propTypes.default.node),
  selected: _propTypes.default.string,
  onSelect: _propTypes.default.func.isRequired,
  absolute: _propTypes.default.bool.isRequired,
  bordered: _propTypes.default.bool.isRequired
};
Tabs.defaultProps = {
  children: [],
  selected: null
};

var TabsState =
/*#__PURE__*/
function (_Component) {
  _inherits(TabsState, _Component);

  function TabsState(props) {
    var _this;

    _classCallCheck(this, TabsState);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(TabsState).call(this, props));
    _this.state = {
      selected: props.initial
    };
    return _this;
  }

  _createClass(TabsState, [{
    key: "render",
    value: function render() {
      var _this2 = this;

      var _this$props = this.props,
          bordered = _this$props.bordered,
          absolute = _this$props.absolute,
          children = _this$props.children;
      var selected = this.state.selected;
      return _react.default.createElement(Tabs, {
        bordered: bordered || true,
        absolute: absolute || false,
        selected: selected,
        onSelect: function onSelect(id) {
          return _this2.setState({
            selected: id
          });
        }
      }, children);
    }
  }]);

  return TabsState;
}(_react.Component);

exports.TabsState = TabsState;

_defineProperty(TabsState, "propTypes", {
  children: _propTypes.default.arrayOf(_propTypes.default.node),
  initial: _propTypes.default.string,
  absolute: _propTypes.default.bool,
  bordered: _propTypes.default.bool
});

_defineProperty(TabsState, "defaultProps", {
  children: [],
  initial: null,
  absolute: false,
  bordered: false
});

/***/ }),

/***/ 200:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(0);

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "storiesOf", {
  enumerable: true,
  get: function get() {
    return _preview.storiesOf;
  }
});
Object.defineProperty(exports, "setAddon", {
  enumerable: true,
  get: function get() {
    return _preview.setAddon;
  }
});
Object.defineProperty(exports, "addDecorator", {
  enumerable: true,
  get: function get() {
    return _preview.addDecorator;
  }
});
Object.defineProperty(exports, "addParameters", {
  enumerable: true,
  get: function get() {
    return _preview.addParameters;
  }
});
Object.defineProperty(exports, "configure", {
  enumerable: true,
  get: function get() {
    return _preview.configure;
  }
});
Object.defineProperty(exports, "getStorybook", {
  enumerable: true,
  get: function get() {
    return _preview.getStorybook;
  }
});
Object.defineProperty(exports, "forceReRender", {
  enumerable: true,
  get: function get() {
    return _preview.forceReRender;
  }
});

var _preview = __webpack_require__(362);

/***/ }),

/***/ 205:
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

var _storybookChannelMock = _interopRequireDefault(__webpack_require__(374));

var _makeDecorator = __webpack_require__(378);

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

/***/ 206:
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

/***/ 215:
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

/***/ 217:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.defaultDecorateStory = void 0;

__webpack_require__(0);

__webpack_require__(34);

__webpack_require__(44);

__webpack_require__(27);

__webpack_require__(28);

__webpack_require__(9);

__webpack_require__(8);

__webpack_require__(11);

__webpack_require__(18);

__webpack_require__(19);

__webpack_require__(10);

__webpack_require__(3);

__webpack_require__(5);

__webpack_require__(2);

__webpack_require__(4);

__webpack_require__(145);

var _clientLogger = __webpack_require__(215);

var _addons = _interopRequireDefault(__webpack_require__(205));

var _coreEvents = _interopRequireDefault(__webpack_require__(90));

var _story_store = _interopRequireDefault(__webpack_require__(144));

var _subscriptions_store = _interopRequireDefault(__webpack_require__(392));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var defaultDecorateStory = function defaultDecorateStory(getStory, decorators) {
  return decorators.reduce(function (decorated, decorator) {
    return function (context) {
      return decorator(function () {
        return decorated(context);
      }, context);
    };
  }, getStory);
};

exports.defaultDecorateStory = defaultDecorateStory;

var metaSubscription = function metaSubscription() {
  _addons.default.getChannel().on(_coreEvents.default.REGISTER_SUBSCRIPTION, _subscriptions_store.default.register);

  return function () {
    return _addons.default.getChannel().removeListener(_coreEvents.default.REGISTER_SUBSCRIPTION, _subscriptions_store.default.register);
  };
};

var withSubscriptionTracking = function withSubscriptionTracking(storyFn) {
  if (!_addons.default.hasChannel()) return storyFn();

  _subscriptions_store.default.markAllAsUnused();

  _subscriptions_store.default.register(metaSubscription);

  var result = storyFn();

  _subscriptions_store.default.clearUnused();

  return result;
};

var ClientApi = function ClientApi() {
  var _this = this;

  var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      _ref$storyStore = _ref.storyStore,
      storyStore = _ref$storyStore === void 0 ? new _story_store.default() : _ref$storyStore,
      _ref$decorateStory = _ref.decorateStory,
      decorateStory = _ref$decorateStory === void 0 ? defaultDecorateStory : _ref$decorateStory;

  _classCallCheck(this, ClientApi);

  _defineProperty(this, "setAddon", function (addon) {
    _this._addons = _objectSpread({}, _this._addons, addon);
  });

  _defineProperty(this, "addDecorator", function (decorator) {
    _this._globalDecorators.push(decorator);
  });

  _defineProperty(this, "addParameters", function (parameters) {
    _this._globalParameters = parameters;
  });

  _defineProperty(this, "clearDecorators", function () {
    _this._globalDecorators = [];
  });

  _defineProperty(this, "storiesOf", function (kind, m) {
    if (!kind && typeof kind !== 'string') {
      throw new Error('Invalid or missing kind provided for stories, should be a string');
    }

    if (!m) {
      _clientLogger.logger.warn("Missing 'module' parameter for story with a kind of '".concat(kind, "'. It will break your HMR"));
    }

    if (m && m.hot && m.hot.dispose) {
      m.hot.dispose(function () {
        _this._storyStore.removeStoryKind(kind);

        _this._storyStore.incrementRevision();
      });
    }

    var localDecorators = [];
    var localParameters = {};
    var api = {
      kind: kind
    }; // apply addons

    Object.keys(_this._addons).forEach(function (name) {
      var addon = _this._addons[name];

      api[name] = function () {
        for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
          args[_key] = arguments[_key];
        }

        addon.apply(api, args);
        return api;
      };
    });

    api.add = function (storyName, getStory, parameters) {
      if (typeof storyName !== 'string') {
        throw new Error("Invalid or missing storyName provided for a \"".concat(kind, "\" story."));
      }

      if (_this._storyStore.hasStory(kind, storyName)) {
        _clientLogger.logger.warn("Story of \"".concat(kind, "\" named \"").concat(storyName, "\" already exists"));
      } // Wrap the getStory function with each decorator. The first
      // decorator will wrap the story function. The second will
      // wrap the first decorator and so on.


      var decorators = localDecorators.concat(_toConsumableArray(_this._globalDecorators), [withSubscriptionTracking]);
      var fileName = m ? m.id : null;
      var allParam = {
        fileName: fileName
      };
      [_this._globalParameters, localParameters, parameters].forEach(function (params) {
        if (params) {
          Object.keys(params).forEach(function (key) {
            if (Array.isArray(params[key])) {
              allParam[key] = params[key];
            } else if (_typeof(params[key]) === 'object') {
              allParam[key] = _objectSpread({}, allParam[key], params[key]);
            } else {
              allParam[key] = params[key];
            }
          });
        }
      }); // Add the fully decorated getStory function.

      _this._storyStore.addStory(kind, storyName, _this._decorateStory(getStory, decorators), allParam);

      return api;
    };

    api.addDecorator = function (decorator) {
      localDecorators.push(decorator);
      return api;
    };

    api.addParameters = function (parameters) {
      localParameters = _objectSpread({}, localParameters, parameters);
      return api;
    };

    return api;
  });

  _defineProperty(this, "getStorybook", function () {
    return _this._storyStore.getStoryKinds().map(function (kind) {
      var fileName = _this._storyStore.getStoryFileName(kind);

      var stories = _this._storyStore.getStories(kind).map(function (name) {
        var render = _this._storyStore.getStoryWithContext(kind, name);

        return {
          name: name,
          render: render
        };
      });

      return {
        kind: kind,
        fileName: fileName,
        stories: stories
      };
    });
  });

  this._storyStore = storyStore;
  this._addons = {};
  this._globalDecorators = [];
  this._globalParameters = {};
  this._decorateStory = decorateStory;
};

exports.default = ClientApi;

/***/ }),

/***/ 219:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

__webpack_require__(0);

var _global = __webpack_require__(17);

var _coreEvents = _interopRequireDefault(__webpack_require__(90));

var _actions = __webpack_require__(91);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var ConfigApi =
/*#__PURE__*/
function () {
  function ConfigApi(_ref) {
    var _this = this;

    var channel = _ref.channel,
        storyStore = _ref.storyStore,
        reduxStore = _ref.reduxStore,
        clearDecorators = _ref.clearDecorators;

    _classCallCheck(this, ConfigApi);

    _defineProperty(this, "configure", function (loaders, module) {
      var render = function render() {
        try {
          _this._renderMain(loaders);
        } catch (error) {
          if (module.hot && module.hot.status() === 'apply') {
            // We got this issue, after webpack fixed it and applying it.
            // Therefore error message is displayed forever even it's being fixed.
            // So, we'll detect it reload the page.
            _global.location.reload();
          } else {
            // If we are accessing the site, but the error is not fixed yet.
            // There we can render the error.
            _this._renderError(error); // Clear out the store as chances as only some of the stories will have
            // made it in before the error was thrown


            _this._storyStore.clean();
          }
        }
      };

      if (module.hot) {
        module.hot.accept(function () {
          setTimeout(render);
        });
        module.hot.dispose(function () {
          _this._clearDecorators();
        });
      }

      if (_this._channel) {
        render();
      } else {
        loaders();
      }
    });

    // channel can be null when running in node
    // always check whether channel is available
    this._channel = channel;
    this._storyStore = storyStore;
    this._reduxStore = reduxStore;
    this._clearDecorators = clearDecorators;
  }

  _createClass(ConfigApi, [{
    key: "_renderMain",
    value: function _renderMain(loaders) {
      if (loaders) loaders();

      var stories = this._storyStore.dumpStoryBook(); // send to the parent frame.


      this._channel.emit(_coreEvents.default.SET_STORIES, {
        stories: stories
      }); // clear the error if exists.


      this._reduxStore.dispatch((0, _actions.clearError)());

      this._reduxStore.dispatch((0, _actions.setInitialStory)(stories));
    }
  }, {
    key: "_renderError",
    value: function _renderError(e) {
      var stack = e.stack,
          message = e.message;
      var error = {
        stack: stack,
        message: message
      };

      this._reduxStore.dispatch((0, _actions.setError)(error));
    }
  }]);

  return ConfigApi;
}();

exports.default = ConfigApi;

/***/ }),

/***/ 220:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = reducer;

__webpack_require__(9);

__webpack_require__(8);

__webpack_require__(19);

__webpack_require__(4);

__webpack_require__(11);

__webpack_require__(2);

__webpack_require__(3);

__webpack_require__(5);

__webpack_require__(0);

var _actions = __webpack_require__(91);

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function reducer() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var action = arguments.length > 1 ? arguments[1] : undefined;

  switch (action.type) {
    case _actions.types.CLEAR_ERROR:
      {
        return _objectSpread({}, state, {
          error: null
        });
      }

    case _actions.types.SET_ERROR:
      {
        return _objectSpread({}, state, {
          error: action.error
        });
      }

    case _actions.types.SELECT_STORY:
      {
        return _objectSpread({}, state, {
          selectedKind: action.kind,
          selectedStory: action.story
        });
      }

    case _actions.types.SET_INITIAL_STORY:
      {
        var newState = _objectSpread({}, state);

        var storyKindList = action.storyKindList;

        if (!newState.selectedKind && storyKindList.length > 0) {
          newState.selectedKind = storyKindList[0].kind;

          var _storyKindList$0$stor = _slicedToArray(storyKindList[0].stories, 1);

          newState.selectedStory = _storyKindList$0$stor[0];
        }

        return newState;
      }

    default:
      return state;
  }
}

/***/ }),

/***/ 221:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = syncUrlToStore;

__webpack_require__(4);

__webpack_require__(11);

__webpack_require__(2);

__webpack_require__(3);

__webpack_require__(5);

__webpack_require__(0);

__webpack_require__(395);

var _qs = _interopRequireDefault(__webpack_require__(398));

var _global = __webpack_require__(17);

var _actions = __webpack_require__(91);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

// Ensure the story in the redux store and on the preview URL are in sync.
// In theory we should listen to pushState events but given it's an iframe
// the user can't actually change the URL.
// We should change this if we support a "preview only" mode in the future.
function syncUrlToStore(reduxStore) {
  // handle query params
  var queryParams = _qs.default.parse(_global.window.location.search.substring(1));

  if (queryParams.selectedKind) {
    reduxStore.dispatch((0, _actions.selectStory)(queryParams.selectedKind, queryParams.selectedStory));
  }

  reduxStore.subscribe(function () {
    var _reduxStore$getState = reduxStore.getState(),
        selectedKind = _reduxStore$getState.selectedKind,
        selectedStory = _reduxStore$getState.selectedStory;

    var queryString = _qs.default.stringify(_objectSpread({}, queryParams, {
      selectedKind: selectedKind,
      selectedStory: selectedStory
    }));

    _global.window.history.replaceState({}, '', "?".concat(queryString));
  });
}

/***/ }),

/***/ 230:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.dark = exports.normal = exports.monoFonts = exports.baseFonts = void 0;

__webpack_require__(4);

__webpack_require__(11);

__webpack_require__(2);

__webpack_require__(3);

__webpack_require__(5);

__webpack_require__(0);

var _reactInspector = __webpack_require__(468);

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var baseFonts = {
  fontFamily: '-apple-system, ".SFNSText-Regular", "San Francisco", BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", "Lucida Grande", "Arial", sans-serif',
  color: '#444',
  WebkitFontSmoothing: 'antialiased'
};
exports.baseFonts = baseFonts;
var monoFonts = {
  fontFamily: '"Operator Mono", "Fira Code Retina", "Fira Code", "FiraCode-Retina", "Andale Mono", "Lucida Console", Consolas, Monaco, monospace',
  color: '#444',
  WebkitFontSmoothing: 'antialiased'
};
exports.monoFonts = monoFonts;
var normal = {
  mainBackground: '#F7F7F7 linear-gradient(to bottom right, #EEEEEE, #FFFFFF)',
  mainBorder: '1px solid rgba(0,0,0,0.1)',
  mainBorderColor: 'rgba(0,0,0,0.1)',
  mainBorderRadius: 4,
  mainFill: 'rgba(255,255,255,0.89)',
  barFill: 'rgba(255,255,255,1)',
  barSelectedColor: 'rgba(0,0,0,0.1)',
  inputFill: 'rgba(0,0,0,0.05)',
  mainTextFace: baseFonts.fontFamily,
  mainTextColor: baseFonts.color,
  dimmedTextColor: 'rgba(0,0,0,0.4)',
  highlightColor: '#9fdaff',
  successColor: '#09833a',
  failColor: '#d53535',
  warnColor: 'orange',
  mainTextSize: 13,
  monoTextFace: monoFonts.fontFamily,
  layoutMargin: 10,
  overlayBackground: 'linear-gradient(to bottom right, rgba(233, 233, 233, 0.6), rgba(255, 255, 255, 0.8))',
  storiesNav: {},
  brand: {},
  brandLink: {},
  filter: {},
  treeHeader: {},
  treeMenuHeader: {},
  menuLink: {},
  activeMenuLink: {},
  treeArrow: {},
  addonActionsTheme: _objectSpread({}, _reactInspector.chromeLight, {
    BASE_FONT_FAMILY: monoFonts.fontFamily,
    BASE_BACKGROUND_COLOR: 'transparent'
  })
};
exports.normal = normal;
var dark = {
  mainBackground: '#112 linear-gradient(to right, #112, #333)',
  mainBorder: '1px solid rgba(255,255,255,0.1)',
  mainBorderColor: 'rgba(255,255,255,0.1)',
  mainBorderRadius: 4,
  mainFill: 'rgba(255,255,255,0.1)',
  barFill: 'rgba(0,0,0,1)',
  barSelectedColor: 'rgba(255,255,255,0.4)',
  inputFill: 'rgba(0,0,0,1)',
  mainTextFace: baseFonts.fontFamily,
  mainTextColor: '#efefef',
  dimmedTextColor: 'rgba(255,255,255,0.4)',
  highlightColor: '#9fdaff',
  successColor: '#0edf62',
  failColor: '#ff3f3f',
  warnColor: 'orange',
  mainTextSize: 13,
  monoTextFace: monoFonts.fontFamily,
  layoutMargin: 10,
  overlayBackground: 'linear-gradient(to bottom right, rgba(17, 17, 34, 0.6), rgba(51, 51, 51, 0.8))',
  storiesNav: {},
  brand: {
    background: 'rgba(0,0,0,1)'
  },
  brandLink: {},
  filter: {},
  treeHeader: {},
  treeMenuHeader: {},
  menuLink: {},
  activeMenuLink: {},
  treeArrow: {},
  addonActionsTheme: _objectSpread({}, _reactInspector.chromeDark, {
    BASE_FONT_FAMILY: monoFonts.fontFamily,
    BASE_BACKGROUND_COLOR: 'transparent'
  })
};
exports.dark = dark;

/***/ }),

/***/ 252:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

__webpack_require__(9);

__webpack_require__(8);

__webpack_require__(0);

__webpack_require__(58);

__webpack_require__(59);

var _propTypes = _interopRequireDefault(__webpack_require__(6));

var _react = _interopRequireDefault(__webpack_require__(1));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var LEFT_BUTTON = 0; // Cmd/Ctrl/Shift/Alt + Click should trigger default browser behaviour. Same applies to non-left clicks

var isPlainLeftClick = function isPlainLeftClick(e) {
  return e.button === LEFT_BUTTON && !e.altKey && !e.ctrlKey && !e.metaKey && !e.shiftKey;
};

var RoutedLink =
/*#__PURE__*/
function (_React$Component) {
  _inherits(RoutedLink, _React$Component);

  function RoutedLink() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, RoutedLink);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(RoutedLink)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "onClick", function (e) {
      var onClick = _this.props.onClick;

      if (isPlainLeftClick(e)) {
        e.preventDefault();
        onClick(e);
      }
    });

    return _this;
  }

  _createClass(RoutedLink, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          href = _this$props.href,
          children = _this$props.children,
          onClick = _this$props.onClick,
          className = _this$props.className,
          style = _this$props.style;
      var props = onClick ? {
        href: href,
        className: className,
        style: style,
        onClick: this.onClick
      } : {
        href: href,
        className: className,
        style: style
      };
      return _react.default.createElement("a", props, children);
    }
  }]);

  return RoutedLink;
}(_react.default.Component);

exports.default = RoutedLink;
RoutedLink.defaultProps = {
  onClick: null,
  href: '#',
  children: null,
  className: undefined,
  style: undefined
};
RoutedLink.propTypes = {
  onClick: _propTypes.default.func,
  href: _propTypes.default.string,
  children: _propTypes.default.node,
  className: _propTypes.default.string,
  // eslint-disable-next-line react/forbid-prop-types
  style: _propTypes.default.object
};

/***/ }),

/***/ 255:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(0);

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _styled = _interopRequireDefault(__webpack_require__(25));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default =
/*#__PURE__*/
(0, _styled.default)("p", {
  target: "ejh6i270"
})({
  fontSize: '11px',
  display: 'block',
  textAlign: 'center',
  textTransform: 'uppercase',
  margin: 0,
  padding: 20
});

exports.default = _default;

/***/ }),

/***/ 281:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(282);

__webpack_require__(283);

__webpack_require__(354);

/***/ }),

/***/ 282:
/***/ (function(module, exports) {

/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

!(function(global) {
  "use strict";

  var Op = Object.prototype;
  var hasOwn = Op.hasOwnProperty;
  var undefined; // More compressible than void 0.
  var $Symbol = typeof Symbol === "function" ? Symbol : {};
  var iteratorSymbol = $Symbol.iterator || "@@iterator";
  var asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator";
  var toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";

  var inModule = typeof module === "object";
  var runtime = global.regeneratorRuntime;
  if (runtime) {
    if (inModule) {
      // If regeneratorRuntime is defined globally and we're in a module,
      // make the exports object identical to regeneratorRuntime.
      module.exports = runtime;
    }
    // Don't bother evaluating the rest of this file if the runtime was
    // already defined globally.
    return;
  }

  // Define the runtime globally (as expected by generated code) as either
  // module.exports (if we're in a module) or a new, empty object.
  runtime = global.regeneratorRuntime = inModule ? module.exports : {};

  function wrap(innerFn, outerFn, self, tryLocsList) {
    // If outerFn provided and outerFn.prototype is a Generator, then outerFn.prototype instanceof Generator.
    var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator;
    var generator = Object.create(protoGenerator.prototype);
    var context = new Context(tryLocsList || []);

    // The ._invoke method unifies the implementations of the .next,
    // .throw, and .return methods.
    generator._invoke = makeInvokeMethod(innerFn, self, context);

    return generator;
  }
  runtime.wrap = wrap;

  // Try/catch helper to minimize deoptimizations. Returns a completion
  // record like context.tryEntries[i].completion. This interface could
  // have been (and was previously) designed to take a closure to be
  // invoked without arguments, but in all the cases we care about we
  // already have an existing method we want to call, so there's no need
  // to create a new function object. We can even get away with assuming
  // the method takes exactly one argument, since that happens to be true
  // in every case, so we don't have to touch the arguments object. The
  // only additional allocation required is the completion record, which
  // has a stable shape and so hopefully should be cheap to allocate.
  function tryCatch(fn, obj, arg) {
    try {
      return { type: "normal", arg: fn.call(obj, arg) };
    } catch (err) {
      return { type: "throw", arg: err };
    }
  }

  var GenStateSuspendedStart = "suspendedStart";
  var GenStateSuspendedYield = "suspendedYield";
  var GenStateExecuting = "executing";
  var GenStateCompleted = "completed";

  // Returning this object from the innerFn has the same effect as
  // breaking out of the dispatch switch statement.
  var ContinueSentinel = {};

  // Dummy constructor functions that we use as the .constructor and
  // .constructor.prototype properties for functions that return Generator
  // objects. For full spec compliance, you may wish to configure your
  // minifier not to mangle the names of these two functions.
  function Generator() {}
  function GeneratorFunction() {}
  function GeneratorFunctionPrototype() {}

  // This is a polyfill for %IteratorPrototype% for environments that
  // don't natively support it.
  var IteratorPrototype = {};
  IteratorPrototype[iteratorSymbol] = function () {
    return this;
  };

  var getProto = Object.getPrototypeOf;
  var NativeIteratorPrototype = getProto && getProto(getProto(values([])));
  if (NativeIteratorPrototype &&
      NativeIteratorPrototype !== Op &&
      hasOwn.call(NativeIteratorPrototype, iteratorSymbol)) {
    // This environment has a native %IteratorPrototype%; use it instead
    // of the polyfill.
    IteratorPrototype = NativeIteratorPrototype;
  }

  var Gp = GeneratorFunctionPrototype.prototype =
    Generator.prototype = Object.create(IteratorPrototype);
  GeneratorFunction.prototype = Gp.constructor = GeneratorFunctionPrototype;
  GeneratorFunctionPrototype.constructor = GeneratorFunction;
  GeneratorFunctionPrototype[toStringTagSymbol] =
    GeneratorFunction.displayName = "GeneratorFunction";

  // Helper for defining the .next, .throw, and .return methods of the
  // Iterator interface in terms of a single ._invoke method.
  function defineIteratorMethods(prototype) {
    ["next", "throw", "return"].forEach(function(method) {
      prototype[method] = function(arg) {
        return this._invoke(method, arg);
      };
    });
  }

  runtime.isGeneratorFunction = function(genFun) {
    var ctor = typeof genFun === "function" && genFun.constructor;
    return ctor
      ? ctor === GeneratorFunction ||
        // For the native GeneratorFunction constructor, the best we can
        // do is to check its .name property.
        (ctor.displayName || ctor.name) === "GeneratorFunction"
      : false;
  };

  runtime.mark = function(genFun) {
    if (Object.setPrototypeOf) {
      Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
    } else {
      genFun.__proto__ = GeneratorFunctionPrototype;
      if (!(toStringTagSymbol in genFun)) {
        genFun[toStringTagSymbol] = "GeneratorFunction";
      }
    }
    genFun.prototype = Object.create(Gp);
    return genFun;
  };

  // Within the body of any async function, `await x` is transformed to
  // `yield regeneratorRuntime.awrap(x)`, so that the runtime can test
  // `hasOwn.call(value, "__await")` to determine if the yielded value is
  // meant to be awaited.
  runtime.awrap = function(arg) {
    return { __await: arg };
  };

  function AsyncIterator(generator) {
    function invoke(method, arg, resolve, reject) {
      var record = tryCatch(generator[method], generator, arg);
      if (record.type === "throw") {
        reject(record.arg);
      } else {
        var result = record.arg;
        var value = result.value;
        if (value &&
            typeof value === "object" &&
            hasOwn.call(value, "__await")) {
          return Promise.resolve(value.__await).then(function(value) {
            invoke("next", value, resolve, reject);
          }, function(err) {
            invoke("throw", err, resolve, reject);
          });
        }

        return Promise.resolve(value).then(function(unwrapped) {
          // When a yielded Promise is resolved, its final value becomes
          // the .value of the Promise<{value,done}> result for the
          // current iteration.
          result.value = unwrapped;
          resolve(result);
        }, function(error) {
          // If a rejected Promise was yielded, throw the rejection back
          // into the async generator function so it can be handled there.
          return invoke("throw", error, resolve, reject);
        });
      }
    }

    var previousPromise;

    function enqueue(method, arg) {
      function callInvokeWithMethodAndArg() {
        return new Promise(function(resolve, reject) {
          invoke(method, arg, resolve, reject);
        });
      }

      return previousPromise =
        // If enqueue has been called before, then we want to wait until
        // all previous Promises have been resolved before calling invoke,
        // so that results are always delivered in the correct order. If
        // enqueue has not been called before, then it is important to
        // call invoke immediately, without waiting on a callback to fire,
        // so that the async generator function has the opportunity to do
        // any necessary setup in a predictable way. This predictability
        // is why the Promise constructor synchronously invokes its
        // executor callback, and why async functions synchronously
        // execute code before the first await. Since we implement simple
        // async functions in terms of async generators, it is especially
        // important to get this right, even though it requires care.
        previousPromise ? previousPromise.then(
          callInvokeWithMethodAndArg,
          // Avoid propagating failures to Promises returned by later
          // invocations of the iterator.
          callInvokeWithMethodAndArg
        ) : callInvokeWithMethodAndArg();
    }

    // Define the unified helper method that is used to implement .next,
    // .throw, and .return (see defineIteratorMethods).
    this._invoke = enqueue;
  }

  defineIteratorMethods(AsyncIterator.prototype);
  AsyncIterator.prototype[asyncIteratorSymbol] = function () {
    return this;
  };
  runtime.AsyncIterator = AsyncIterator;

  // Note that simple async functions are implemented on top of
  // AsyncIterator objects; they just return a Promise for the value of
  // the final result produced by the iterator.
  runtime.async = function(innerFn, outerFn, self, tryLocsList) {
    var iter = new AsyncIterator(
      wrap(innerFn, outerFn, self, tryLocsList)
    );

    return runtime.isGeneratorFunction(outerFn)
      ? iter // If outerFn is a generator, return the full iterator.
      : iter.next().then(function(result) {
          return result.done ? result.value : iter.next();
        });
  };

  function makeInvokeMethod(innerFn, self, context) {
    var state = GenStateSuspendedStart;

    return function invoke(method, arg) {
      if (state === GenStateExecuting) {
        throw new Error("Generator is already running");
      }

      if (state === GenStateCompleted) {
        if (method === "throw") {
          throw arg;
        }

        // Be forgiving, per 25.3.3.3.3 of the spec:
        // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-generatorresume
        return doneResult();
      }

      context.method = method;
      context.arg = arg;

      while (true) {
        var delegate = context.delegate;
        if (delegate) {
          var delegateResult = maybeInvokeDelegate(delegate, context);
          if (delegateResult) {
            if (delegateResult === ContinueSentinel) continue;
            return delegateResult;
          }
        }

        if (context.method === "next") {
          // Setting context._sent for legacy support of Babel's
          // function.sent implementation.
          context.sent = context._sent = context.arg;

        } else if (context.method === "throw") {
          if (state === GenStateSuspendedStart) {
            state = GenStateCompleted;
            throw context.arg;
          }

          context.dispatchException(context.arg);

        } else if (context.method === "return") {
          context.abrupt("return", context.arg);
        }

        state = GenStateExecuting;

        var record = tryCatch(innerFn, self, context);
        if (record.type === "normal") {
          // If an exception is thrown from innerFn, we leave state ===
          // GenStateExecuting and loop back for another invocation.
          state = context.done
            ? GenStateCompleted
            : GenStateSuspendedYield;

          if (record.arg === ContinueSentinel) {
            continue;
          }

          return {
            value: record.arg,
            done: context.done
          };

        } else if (record.type === "throw") {
          state = GenStateCompleted;
          // Dispatch the exception by looping back around to the
          // context.dispatchException(context.arg) call above.
          context.method = "throw";
          context.arg = record.arg;
        }
      }
    };
  }

  // Call delegate.iterator[context.method](context.arg) and handle the
  // result, either by returning a { value, done } result from the
  // delegate iterator, or by modifying context.method and context.arg,
  // setting context.delegate to null, and returning the ContinueSentinel.
  function maybeInvokeDelegate(delegate, context) {
    var method = delegate.iterator[context.method];
    if (method === undefined) {
      // A .throw or .return when the delegate iterator has no .throw
      // method always terminates the yield* loop.
      context.delegate = null;

      if (context.method === "throw") {
        if (delegate.iterator.return) {
          // If the delegate iterator has a return method, give it a
          // chance to clean up.
          context.method = "return";
          context.arg = undefined;
          maybeInvokeDelegate(delegate, context);

          if (context.method === "throw") {
            // If maybeInvokeDelegate(context) changed context.method from
            // "return" to "throw", let that override the TypeError below.
            return ContinueSentinel;
          }
        }

        context.method = "throw";
        context.arg = new TypeError(
          "The iterator does not provide a 'throw' method");
      }

      return ContinueSentinel;
    }

    var record = tryCatch(method, delegate.iterator, context.arg);

    if (record.type === "throw") {
      context.method = "throw";
      context.arg = record.arg;
      context.delegate = null;
      return ContinueSentinel;
    }

    var info = record.arg;

    if (! info) {
      context.method = "throw";
      context.arg = new TypeError("iterator result is not an object");
      context.delegate = null;
      return ContinueSentinel;
    }

    if (info.done) {
      // Assign the result of the finished delegate to the temporary
      // variable specified by delegate.resultName (see delegateYield).
      context[delegate.resultName] = info.value;

      // Resume execution at the desired location (see delegateYield).
      context.next = delegate.nextLoc;

      // If context.method was "throw" but the delegate handled the
      // exception, let the outer generator proceed normally. If
      // context.method was "next", forget context.arg since it has been
      // "consumed" by the delegate iterator. If context.method was
      // "return", allow the original .return call to continue in the
      // outer generator.
      if (context.method !== "return") {
        context.method = "next";
        context.arg = undefined;
      }

    } else {
      // Re-yield the result returned by the delegate method.
      return info;
    }

    // The delegate iterator is finished, so forget it and continue with
    // the outer generator.
    context.delegate = null;
    return ContinueSentinel;
  }

  // Define Generator.prototype.{next,throw,return} in terms of the
  // unified ._invoke helper method.
  defineIteratorMethods(Gp);

  Gp[toStringTagSymbol] = "Generator";

  // A Generator should always return itself as the iterator object when the
  // @@iterator function is called on it. Some browsers' implementations of the
  // iterator prototype chain incorrectly implement this, causing the Generator
  // object to not be returned from this call. This ensures that doesn't happen.
  // See https://github.com/facebook/regenerator/issues/274 for more details.
  Gp[iteratorSymbol] = function() {
    return this;
  };

  Gp.toString = function() {
    return "[object Generator]";
  };

  function pushTryEntry(locs) {
    var entry = { tryLoc: locs[0] };

    if (1 in locs) {
      entry.catchLoc = locs[1];
    }

    if (2 in locs) {
      entry.finallyLoc = locs[2];
      entry.afterLoc = locs[3];
    }

    this.tryEntries.push(entry);
  }

  function resetTryEntry(entry) {
    var record = entry.completion || {};
    record.type = "normal";
    delete record.arg;
    entry.completion = record;
  }

  function Context(tryLocsList) {
    // The root entry object (effectively a try statement without a catch
    // or a finally block) gives us a place to store values thrown from
    // locations where there is no enclosing try statement.
    this.tryEntries = [{ tryLoc: "root" }];
    tryLocsList.forEach(pushTryEntry, this);
    this.reset(true);
  }

  runtime.keys = function(object) {
    var keys = [];
    for (var key in object) {
      keys.push(key);
    }
    keys.reverse();

    // Rather than returning an object with a next method, we keep
    // things simple and return the next function itself.
    return function next() {
      while (keys.length) {
        var key = keys.pop();
        if (key in object) {
          next.value = key;
          next.done = false;
          return next;
        }
      }

      // To avoid creating an additional object, we just hang the .value
      // and .done properties off the next function object itself. This
      // also ensures that the minifier will not anonymize the function.
      next.done = true;
      return next;
    };
  };

  function values(iterable) {
    if (iterable) {
      var iteratorMethod = iterable[iteratorSymbol];
      if (iteratorMethod) {
        return iteratorMethod.call(iterable);
      }

      if (typeof iterable.next === "function") {
        return iterable;
      }

      if (!isNaN(iterable.length)) {
        var i = -1, next = function next() {
          while (++i < iterable.length) {
            if (hasOwn.call(iterable, i)) {
              next.value = iterable[i];
              next.done = false;
              return next;
            }
          }

          next.value = undefined;
          next.done = true;

          return next;
        };

        return next.next = next;
      }
    }

    // Return an iterator with no values.
    return { next: doneResult };
  }
  runtime.values = values;

  function doneResult() {
    return { value: undefined, done: true };
  }

  Context.prototype = {
    constructor: Context,

    reset: function(skipTempReset) {
      this.prev = 0;
      this.next = 0;
      // Resetting context._sent for legacy support of Babel's
      // function.sent implementation.
      this.sent = this._sent = undefined;
      this.done = false;
      this.delegate = null;

      this.method = "next";
      this.arg = undefined;

      this.tryEntries.forEach(resetTryEntry);

      if (!skipTempReset) {
        for (var name in this) {
          // Not sure about the optimal order of these conditions:
          if (name.charAt(0) === "t" &&
              hasOwn.call(this, name) &&
              !isNaN(+name.slice(1))) {
            this[name] = undefined;
          }
        }
      }
    },

    stop: function() {
      this.done = true;

      var rootEntry = this.tryEntries[0];
      var rootRecord = rootEntry.completion;
      if (rootRecord.type === "throw") {
        throw rootRecord.arg;
      }

      return this.rval;
    },

    dispatchException: function(exception) {
      if (this.done) {
        throw exception;
      }

      var context = this;
      function handle(loc, caught) {
        record.type = "throw";
        record.arg = exception;
        context.next = loc;

        if (caught) {
          // If the dispatched exception was caught by a catch block,
          // then let that catch block handle the exception normally.
          context.method = "next";
          context.arg = undefined;
        }

        return !! caught;
      }

      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        var record = entry.completion;

        if (entry.tryLoc === "root") {
          // Exception thrown outside of any try block that could handle
          // it, so set the completion value of the entire function to
          // throw the exception.
          return handle("end");
        }

        if (entry.tryLoc <= this.prev) {
          var hasCatch = hasOwn.call(entry, "catchLoc");
          var hasFinally = hasOwn.call(entry, "finallyLoc");

          if (hasCatch && hasFinally) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            } else if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else if (hasCatch) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            }

          } else if (hasFinally) {
            if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else {
            throw new Error("try statement without catch or finally");
          }
        }
      }
    },

    abrupt: function(type, arg) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc <= this.prev &&
            hasOwn.call(entry, "finallyLoc") &&
            this.prev < entry.finallyLoc) {
          var finallyEntry = entry;
          break;
        }
      }

      if (finallyEntry &&
          (type === "break" ||
           type === "continue") &&
          finallyEntry.tryLoc <= arg &&
          arg <= finallyEntry.finallyLoc) {
        // Ignore the finally entry if control is not jumping to a
        // location outside the try/catch block.
        finallyEntry = null;
      }

      var record = finallyEntry ? finallyEntry.completion : {};
      record.type = type;
      record.arg = arg;

      if (finallyEntry) {
        this.method = "next";
        this.next = finallyEntry.finallyLoc;
        return ContinueSentinel;
      }

      return this.complete(record);
    },

    complete: function(record, afterLoc) {
      if (record.type === "throw") {
        throw record.arg;
      }

      if (record.type === "break" ||
          record.type === "continue") {
        this.next = record.arg;
      } else if (record.type === "return") {
        this.rval = this.arg = record.arg;
        this.method = "return";
        this.next = "end";
      } else if (record.type === "normal" && afterLoc) {
        this.next = afterLoc;
      }

      return ContinueSentinel;
    },

    finish: function(finallyLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.finallyLoc === finallyLoc) {
          this.complete(entry.completion, entry.afterLoc);
          resetTryEntry(entry);
          return ContinueSentinel;
        }
      }
    },

    "catch": function(tryLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc === tryLoc) {
          var record = entry.completion;
          if (record.type === "throw") {
            var thrown = record.arg;
            resetTryEntry(entry);
          }
          return thrown;
        }
      }

      // The context.catch method must only be called with a location
      // argument that corresponds to a known catch block.
      throw new Error("illegal catch attempt");
    },

    delegateYield: function(iterable, resultName, nextLoc) {
      this.delegate = {
        iterator: values(iterable),
        resultName: resultName,
        nextLoc: nextLoc
      };

      if (this.method === "next") {
        // Deliberately forget the last sent value so that we don't
        // accidentally pass it on to the delegate.
        this.arg = undefined;
      }

      return ContinueSentinel;
    }
  };
})(
  // In sloppy mode, unbound `this` refers to the global object, fallback to
  // Function constructor if we're in global strict mode. That is sadly a form
  // of indirect eval which violates Content Security Policy.
  (function() {
    return this || (typeof self === "object" && self);
  })() || Function("return this")()
);


/***/ }),

/***/ 360:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _global = __webpack_require__(17);

_global.window.STORYBOOK_REACT_CLASSES = {};

/***/ }),

/***/ 362:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(0);

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.forceReRender = exports.configure = exports.getStorybook = exports.clearDecorators = exports.addParameters = exports.addDecorator = exports.setAddon = exports.storiesOf = void 0;

var _client = __webpack_require__(363);

__webpack_require__(401);

var _render = _interopRequireDefault(__webpack_require__(402));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _start = (0, _client.start)(_render.default),
    clientApi = _start.clientApi,
    configApi = _start.configApi,
    forceReRender = _start.forceReRender;

exports.forceReRender = forceReRender;
var storiesOf = clientApi.storiesOf,
    setAddon = clientApi.setAddon,
    addDecorator = clientApi.addDecorator,
    addParameters = clientApi.addParameters,
    clearDecorators = clientApi.clearDecorators,
    getStorybook = clientApi.getStorybook;
exports.getStorybook = getStorybook;
exports.clearDecorators = clearDecorators;
exports.addParameters = addParameters;
exports.addDecorator = addDecorator;
exports.setAddon = setAddon;
exports.storiesOf = storiesOf;
var configure = configApi.configure;
exports.configure = configure;

/***/ }),

/***/ 363:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(364).default;


/***/ }),

/***/ 364:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(0);

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _preview = _interopRequireDefault(__webpack_require__(365));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = _preview.default;
exports.default = _default;

/***/ }),

/***/ 365:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(0);

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _start = _interopRequireDefault(__webpack_require__(366));

var Actions = _interopRequireWildcard(__webpack_require__(91));

var _client_api = _interopRequireDefault(__webpack_require__(217));

var _config_api = _interopRequireDefault(__webpack_require__(219));

var _story_store = _interopRequireDefault(__webpack_require__(144));

var _reducer = _interopRequireDefault(__webpack_require__(220));

var _syncUrlWithStore = _interopRequireDefault(__webpack_require__(221));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = {
  start: _start.default,
  Actions: Actions,
  ClientApi: _client_api.default,
  ConfigApi: _config_api.default,
  StoryStore: _story_store.default,
  reducer: _reducer.default,
  syncUrlWithStore: _syncUrlWithStore.default
};
exports.default = _default;

/***/ }),

/***/ 366:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = start;

__webpack_require__(4);

__webpack_require__(11);

__webpack_require__(2);

__webpack_require__(3);

__webpack_require__(5);

__webpack_require__(0);

__webpack_require__(89);

__webpack_require__(102);

var _redux = __webpack_require__(371);

var _addons = _interopRequireDefault(__webpack_require__(205));

var _global = __webpack_require__(17);

var _channelPostmessage = _interopRequireDefault(__webpack_require__(379));

var _key_events = __webpack_require__(387);

var _clientLogger = __webpack_require__(215);

var _coreEvents = _interopRequireDefault(__webpack_require__(90));

var _story_store = _interopRequireDefault(__webpack_require__(144));

var _client_api = _interopRequireDefault(__webpack_require__(217));

var _config_api = _interopRequireDefault(__webpack_require__(219));

var _reducer = _interopRequireDefault(__webpack_require__(220));

var Actions = _interopRequireWildcard(__webpack_require__(91));

var _syncUrlWithStore = _interopRequireDefault(__webpack_require__(221));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var classes = {
  MAIN: 'sb-show-main',
  NOPREVIEW: 'sb-show-nopreview',
  ERROR: 'sb-show-errordisplay'
};

function showMain() {
  _global.document.body.classList.remove(classes.NOPREVIEW);

  _global.document.body.classList.remove(classes.ERROR);

  _global.document.body.classList.add(classes.MAIN);
}

function showNopreview() {
  _global.document.body.classList.remove(classes.MAIN);

  _global.document.body.classList.remove(classes.ERROR);

  _global.document.body.classList.add(classes.NOPREVIEW);
}

function showErrorDisplay(_ref) {
  var message = _ref.message,
      stack = _ref.stack;
  _global.document.getElementById('error-message').textContent = message;
  _global.document.getElementById('error-stack').textContent = stack;

  _global.document.body.classList.remove(classes.MAIN);

  _global.document.body.classList.remove(classes.NOPREVIEW);

  _global.document.body.classList.add(classes.ERROR);
} // showError is used by the various app layers to inform the user they have done something
// wrong -- for instance returned the wrong thing from a story


function showError(_ref2) {
  var title = _ref2.title,
      description = _ref2.description;

  _addons.default.getChannel().emit(_coreEvents.default.STORY_ERRORED, {
    title: title,
    description: description
  });

  showErrorDisplay({
    message: title,
    stack: description
  });
} // showException is used if we fail to render the story and it is uncaught by the app layer


function showException(exception) {
  _addons.default.getChannel().emit(_coreEvents.default.STORY_THREW_EXCEPTION, exception);

  showErrorDisplay(exception); // Log the stack to the console. So, user could check the source code.

  _clientLogger.logger.error(exception.stack);
}

function start(render) {
  var _ref3 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
      decorateStory = _ref3.decorateStory;

  // check whether we're running on node/browser
  var isBrowser = _global.navigator && _global.navigator.userAgent && _global.navigator.userAgent !== 'storyshots' && !(_global.navigator.userAgent.indexOf('Node.js') > -1) && !(_global.navigator.userAgent.indexOf('jsdom') > -1);
  var storyStore = new _story_store.default();
  var reduxStore = (0, _redux.createStore)(_reducer.default);
  var context = {
    storyStore: storyStore,
    reduxStore: reduxStore,
    decorateStory: decorateStory,
    showMain: showMain,
    showError: showError,
    showException: showException
  };
  var clientApi = new _client_api.default(context);
  var channel;

  if (isBrowser) {
    // setup preview channel
    channel = (0, _channelPostmessage.default)({
      page: 'preview'
    });
    channel.on(_coreEvents.default.SET_CURRENT_STORY, function (data) {
      reduxStore.dispatch(Actions.selectStory(data.kind, data.story));
    });

    _addons.default.setChannel(channel);

    Object.assign(context, {
      channel: channel
    });
    (0, _syncUrlWithStore.default)(reduxStore); // Handle keyboard shortcuts

    _global.window.onkeydown = (0, _key_events.handleKeyboardShortcuts)(channel);
  } // Provide access to external scripts if `window` is defined.
  // NOTE this is different to isBrowser, primarily for the JSDOM use case


  if (typeof _global.window !== 'undefined') {
    _global.window.__STORYBOOK_CLIENT_API__ = clientApi;
    _global.window.__STORYBOOK_ADDONS_CHANNEL__ = channel; // may not be defined
  }

  var clearDecorators = clientApi.clearDecorators;
  var configApi = new _config_api.default(_objectSpread({
    clearDecorators: clearDecorators
  }, context));
  var previousKind = '';
  var previousStory = '';
  var previousRevision = -1;

  var renderMain = function renderMain(forceRender) {
    if (storyStore.size() === 0) {
      showNopreview();
      return;
    }

    var _reduxStore$getState = reduxStore.getState(),
        selectedKind = _reduxStore$getState.selectedKind,
        selectedStory = _reduxStore$getState.selectedStory;

    var revision = storyStore.getRevision();
    var story = storyStore.getStoryWithContext(selectedKind, selectedStory);

    if (!story) {
      showNopreview();
      return;
    } // Render story only if selectedKind or selectedStory has changed.
    // renderMain() gets executed after each action. Actions will cause the whole
    // story to re-render without this check.
    //    https://github.com/storybooks/react-storybook/issues/116
    // However, we do want the story to re-render if the store itself has changed
    // (which happens at the moment when HMR occurs)


    if (!forceRender && revision === previousRevision && selectedKind === previousKind && previousStory === selectedStory) {
      return;
    }

    if (!forceRender) {
      // Scroll to top of the page when changing story
      _global.document.documentElement.scrollTop = 0;
    }

    previousRevision = revision;
    previousKind = selectedKind;
    previousStory = selectedStory;
    render(_objectSpread({}, context, {
      story: story,
      selectedKind: selectedKind,
      selectedStory: selectedStory,
      forceRender: forceRender
    }));
  }; // initialize the UI


  var renderUI = function renderUI(forceRender) {
    if (isBrowser) {
      var _reduxStore$getState2 = reduxStore.getState(),
          error = _reduxStore$getState2.error;

      if (error) {
        showException(error);
        return;
      }

      try {
        renderMain(forceRender);

        _addons.default.getChannel().emit(_coreEvents.default.STORY_RENDERED);
      } catch (ex) {
        showException(ex);
      }
    }
  };

  var forceReRender = function forceReRender() {
    return renderUI(true);
  };

  if (isBrowser) {
    channel.on(_coreEvents.default.FORCE_RE_RENDER, forceReRender);
  }

  renderUI();
  reduxStore.subscribe(renderUI);
  return {
    context: context,
    clientApi: clientApi,
    configApi: configApi,
    forceReRender: forceReRender
  };
}

/***/ }),

/***/ 374:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(0);

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = createChannel;

var _channels = _interopRequireDefault(__webpack_require__(206));

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

/***/ 378:
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

/***/ 379:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = createChannel;
exports.PostmsgTransport = exports.KEY = void 0;

__webpack_require__(0);

__webpack_require__(2);

__webpack_require__(4);

__webpack_require__(380);

__webpack_require__(143);

var _global = __webpack_require__(17);

var _channels = _interopRequireDefault(__webpack_require__(206));

var _jsonStringifySafe = _interopRequireDefault(__webpack_require__(386));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var KEY = 'storybook-channel';
exports.KEY = KEY;

var PostmsgTransport =
/*#__PURE__*/
function () {
  function PostmsgTransport(config) {
    var _this = this;

    _classCallCheck(this, PostmsgTransport);

    this._config = config;
    this._buffer = [];
    this._handler = null;

    _global.window.addEventListener('message', this._handleEvent.bind(this), false);

    _global.document.addEventListener('DOMContentLoaded', function () {
      return _this._flush();
    }); // Check whether the config.page parameter has a valid value


    if (config.page !== 'manager' && config.page !== 'preview') {
      throw new Error("postmsg-channel: \"config.page\" cannot be \"".concat(config.page, "\""));
    }
  }

  _createClass(PostmsgTransport, [{
    key: "setHandler",
    value: function setHandler(handler) {
      this._handler = handler;
    }
  }, {
    key: "send",
    value: function send(event) {
      var _this2 = this;

      var iframeWindow = this._getWindow();

      if (!iframeWindow) {
        return new Promise(function (resolve, reject) {
          _this2._buffer.push({
            event: event,
            resolve: resolve,
            reject: reject
          });
        });
      }

      var data = (0, _jsonStringifySafe.default)({
        key: KEY,
        event: event
      });
      iframeWindow.postMessage(data, '*');
      return Promise.resolve(null);
    }
  }, {
    key: "_flush",
    value: function _flush() {
      var _this3 = this;

      var buffer = this._buffer;
      this._buffer = [];
      buffer.forEach(function (item) {
        _this3.send(item.event).then(item.resolve).catch(item.reject);
      });
    }
  }, {
    key: "_getWindow",
    value: function _getWindow() {
      if (this._config.page === 'manager') {
        // FIXME this is a really bad idea! use a better way to do this.
        // This finds the storybook preview iframe to send messages to.
        var iframe = _global.document.getElementById('storybook-preview-iframe');

        if (!iframe) {
          return null;
        }

        return iframe.contentWindow;
      }

      return _global.window.parent;
    }
  }, {
    key: "_handleEvent",
    value: function _handleEvent(rawEvent) {
      try {
        var data = rawEvent.data;

        var _JSON$parse = JSON.parse(data),
            key = _JSON$parse.key,
            event = _JSON$parse.event;

        if (key === KEY) {
          this._handler(event);
        }
      } catch (error) {} // eslint-disable-line

    }
  }]);

  return PostmsgTransport;
}();

exports.PostmsgTransport = PostmsgTransport;

function createChannel(_ref) {
  var page = _ref.page;
  var transport = new PostmsgTransport({
    page: page
  });
  return new _channels.default({
    transport: transport
  });
}

/***/ }),

/***/ 387:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(0);

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isModifierPressed = isModifierPressed;
exports.default = handle;
exports.handleKeyboardShortcuts = handleKeyboardShortcuts;
exports.features = void 0;

var _keycode = _interopRequireDefault(__webpack_require__(388));

var _coreEvents = _interopRequireDefault(__webpack_require__(90));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var features = {
  FULLSCREEN: 'FULLSCREEN',
  ADDON_PANEL: 'ADDON_PANEL',
  STORIES_PANEL: 'STORIES_PANEL',
  SHORTCUTS_HELP: 'SHORTCUTS_HELP',
  ESCAPE: 'ESCAPE',
  NEXT_STORY: 'NEXT_STORY',
  PREV_STORY: 'PREV_STORY',
  SHOW_SEARCH: 'SHOW_SEARCH',
  ADDON_PANEL_IN_RIGHT: 'ADDON_PANEL_IN_RIGHT'
};
exports.features = features;

function isModifierPressed(e) {
  return (e.ctrlKey || e.keyCode === 91 || e.metaKey) && e.shiftKey;
}

function focusInInput(e) {
  return /input|textarea/i.test(e.target.tagName) || e.target.getAttribute('contenteditable') !== null;
}

function handle(e) {
  if (e.keyCode === (0, _keycode.default)('escape')) {
    // We don't need to preventDefault escape.
    // Just getting the event is enough for us.
    return features.ESCAPE;
  }

  if (focusInInput(e)) {
    // if we're focused in an element that accepts input,
    // then we shouldn't perform a shortcut action
    return false;
  }

  if (!isModifierPressed(e)) return false;

  switch (e.keyCode) {
    case (0, _keycode.default)('F'):
      e.preventDefault();
      return features.FULLSCREEN;

    case (0, _keycode.default)('Z'):
      e.preventDefault();
      return features.ADDON_PANEL;

    case (0, _keycode.default)('X'):
      e.preventDefault();
      return features.STORIES_PANEL;

    case (0, _keycode.default)('right'):
      e.preventDefault();
      return features.NEXT_STORY;

    case (0, _keycode.default)('left'):
      e.preventDefault();
      return features.PREV_STORY;

    case (0, _keycode.default)('O'):
      e.preventDefault();
      return features.SHOW_SEARCH;

    case (0, _keycode.default)('G'):
      e.preventDefault();
      return features.ADDON_PANEL_IN_RIGHT;

    default:
      return false;
  }
} // window.keydown handler to dispatch a key event to the preview channel


function handleKeyboardShortcuts(channel) {
  return function (event) {
    var parsedEvent = handle(event);

    if (parsedEvent) {
      channel.emit(_coreEvents.default.APPLY_SHORTCUT, {
        event: parsedEvent
      });
    }
  };
}

/***/ }),

/***/ 392:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(0);

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.createSubscriptionsStore = void 0;

__webpack_require__(4);

__webpack_require__(2);

__webpack_require__(3);

__webpack_require__(34);

__webpack_require__(393);

var createSubscriptionsStore = function createSubscriptionsStore() {
  var subscripions = new Map();
  return {
    register: function register(subscribe) {
      var subscription = subscripions.get(subscribe);

      if (!subscription) {
        subscription = {
          unsubscribe: subscribe()
        };
        subscripions.set(subscribe, subscription);
      }

      subscription.used = true;
    },
    markAllAsUnused: function markAllAsUnused() {
      subscripions.forEach(function (subscription) {
        // eslint-disable-next-line no-param-reassign
        subscription.used = false;
      });
    },
    clearUnused: function clearUnused() {
      subscripions.forEach(function (subscripion, key) {
        if (subscripion.used) return;
        subscripion.unsubscribe();
        subscripions.delete(key);
      });
    }
  };
};

exports.createSubscriptionsStore = createSubscriptionsStore;

var _default = createSubscriptionsStore();

exports.default = _default;

/***/ }),

/***/ 401:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _global = __webpack_require__(17);

if (_global.window && _global.window.parent !== _global.window) {
  try {
    // eslint-disable-next-line no-underscore-dangle
    _global.window.__REACT_DEVTOOLS_GLOBAL_HOOK__ = _global.window.parent.__REACT_DEVTOOLS_GLOBAL_HOOK__;
  } catch (error) {// The above line can throw if we do not have access to the parent frame -- i.e. cross origin
  }
}

if (_global.window) {
  _global.window.STORYBOOK_ENV = 'react';
}

/***/ }),

/***/ 402:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(0);

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = renderMain;

__webpack_require__(403);

__webpack_require__(404);

var _global = __webpack_require__(17);

var _react = _interopRequireDefault(__webpack_require__(1));

var _reactDom = _interopRequireDefault(__webpack_require__(406));

var _commonTags = __webpack_require__(410);

var _element_check = _interopRequireDefault(__webpack_require__(450));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _templateObject2() {
  var data = _taggedTemplateLiteral(["\n         Seems like you are not returning a correct React element from the story.\n         Could you double check that?\n       "]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n        Did you forget to return the React element from the story?\n        Use \"() => (<MyComp/>)\" or \"() => { return <MyComp/>; }\" when defining the story.\n      "]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var rootEl = _global.document ? _global.document.getElementById('root') : null;

function render(node, el) {
  _reactDom.default.render(Object({"NODE_ENV":"production","NODE_PATH":"","PUBLIC_URL":"."}).STORYBOOK_EXAMPLE_APP ? _react.default.createElement(_react.default.StrictMode, null, node) : node, el);
}

function renderMain(_ref) {
  var story = _ref.story,
      selectedKind = _ref.selectedKind,
      selectedStory = _ref.selectedStory,
      showMain = _ref.showMain,
      showError = _ref.showError,
      forceRender = _ref.forceRender;
  var element = story();

  if (!element) {
    showError({
      title: "Expecting a React element from the story: \"".concat(selectedStory, "\" of \"").concat(selectedKind, "\"."),
      description: (0, _commonTags.stripIndents)(_templateObject())
    });
    return;
  }

  if (!(0, _element_check.default)(element)) {
    showError({
      title: "Expecting a valid React element from the story: \"".concat(selectedStory, "\" of \"").concat(selectedKind, "\"."),
      description: (0, _commonTags.stripIndents)(_templateObject2())
    });
    return;
  } // We need to unmount the existing set of components in the DOM node.
  // Otherwise, React may not recreate instances for every story run.
  // This could leads to issues like below:
  //    https://github.com/storybooks/react-storybook/issues/81
  // But forceRender means that it's the same story, so we want too keep the state in that case.


  if (!forceRender) {
    _reactDom.default.unmountComponentAtNode(rootEl);
  }

  showMain();
  render(element, rootEl);
}

/***/ }),

/***/ 450:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(0);

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.isPriorToFiber = exports.isValidFiberElement = void 0;

__webpack_require__(9);

__webpack_require__(8);

__webpack_require__(2);

__webpack_require__(11);

__webpack_require__(18);

__webpack_require__(19);

__webpack_require__(108);

__webpack_require__(153);

var _react = _interopRequireDefault(__webpack_require__(1));

var _flattenDeep = _interopRequireDefault(__webpack_require__(453));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

// return true if the element is renderable with react fiber
var isValidFiberElement = function isValidFiberElement(element) {
  return typeof element === 'string' || typeof element === 'number' || _react.default.isValidElement(element);
};

exports.isValidFiberElement = isValidFiberElement;

var isPriorToFiber = function isPriorToFiber(version) {
  var _version$split = version.split('.'),
      _version$split2 = _slicedToArray(_version$split, 1),
      majorVersion = _version$split2[0];

  return Number(majorVersion) < 16;
}; // accepts an element and return true if renderable else return false


exports.isPriorToFiber = isPriorToFiber;

var isReactRenderable = function isReactRenderable(element) {
  // storybook is running with a version prior to fiber,
  // run a simple check on the element
  if (isPriorToFiber(_react.default.version)) {
    return _react.default.isValidElement(element);
  } // the element is not an array, check if its a fiber renderable element


  if (!Array.isArray(element)) {
    return isValidFiberElement(element);
  } // the element is in fact a list of elements (array),
  // loop on its elements to see if its ok to render them


  var elementsList = element.map(isReactRenderable); // flatten the list of elements (possibly deep nested)

  var flatList = (0, _flattenDeep.default)(elementsList); // keep only invalid elements

  var invalidElements = flatList.filter(function (elementIsRenderable) {
    return elementIsRenderable === false;
  }); // it's ok to render this list if there is no invalid elements inside

  return !invalidElements.length;
};

var _default = isReactRenderable;
exports.default = _default;

/***/ }),

/***/ 467:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(0);

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "baseFonts", {
  enumerable: true,
  get: function get() {
    return _theme.baseFonts;
  }
});
Object.defineProperty(exports, "monoFonts", {
  enumerable: true,
  get: function get() {
    return _theme.monoFonts;
  }
});
Object.defineProperty(exports, "RoutedLink", {
  enumerable: true,
  get: function get() {
    return _RoutedLink.default;
  }
});
Object.defineProperty(exports, "MenuLink", {
  enumerable: true,
  get: function get() {
    return _MenuLink.default;
  }
});
Object.defineProperty(exports, "HighlightButton", {
  enumerable: true,
  get: function get() {
    return _highlight_button.default;
  }
});
Object.defineProperty(exports, "Table", {
  enumerable: true,
  get: function get() {
    return _table.default;
  }
});
Object.defineProperty(exports, "Td", {
  enumerable: true,
  get: function get() {
    return _cell.Td;
  }
});
Object.defineProperty(exports, "Th", {
  enumerable: true,
  get: function get() {
    return _cell.Th;
  }
});
Object.defineProperty(exports, "Button", {
  enumerable: true,
  get: function get() {
    return _input.Button;
  }
});
Object.defineProperty(exports, "Input", {
  enumerable: true,
  get: function get() {
    return _input.Input;
  }
});
Object.defineProperty(exports, "Select", {
  enumerable: true,
  get: function get() {
    return _input.Select;
  }
});
Object.defineProperty(exports, "Textarea", {
  enumerable: true,
  get: function get() {
    return _input.Textarea;
  }
});
Object.defineProperty(exports, "Field", {
  enumerable: true,
  get: function get() {
    return _field.default;
  }
});
Object.defineProperty(exports, "Tabs", {
  enumerable: true,
  get: function get() {
    return _tabs.Tabs;
  }
});
Object.defineProperty(exports, "TabsState", {
  enumerable: true,
  get: function get() {
    return _tabs.TabsState;
  }
});
Object.defineProperty(exports, "TabWrapper", {
  enumerable: true,
  get: function get() {
    return _tabs.TabWrapper;
  }
});
Object.defineProperty(exports, "ActionBar", {
  enumerable: true,
  get: function get() {
    return _panel_actionbar.ActionBar;
  }
});
Object.defineProperty(exports, "ActionButton", {
  enumerable: true,
  get: function get() {
    return _panel_actionbar.ActionButton;
  }
});
Object.defineProperty(exports, "Placeholder", {
  enumerable: true,
  get: function get() {
    return _placeholder.default;
  }
});
Object.defineProperty(exports, "AddonPanel", {
  enumerable: true,
  get: function get() {
    return _index.default;
  }
});
Object.defineProperty(exports, "Layout", {
  enumerable: true,
  get: function get() {
    return _index2.default;
  }
});
Object.defineProperty(exports, "Header", {
  enumerable: true,
  get: function get() {
    return _header.default;
  }
});
Object.defineProperty(exports, "Icons", {
  enumerable: true,
  get: function get() {
    return _index3.default;
  }
});
exports.themes = void 0;

var _theme = __webpack_require__(230);

var _RoutedLink = _interopRequireDefault(__webpack_require__(252));

var _MenuLink = _interopRequireDefault(__webpack_require__(537));

var _highlight_button = _interopRequireDefault(__webpack_require__(545));

var _table = _interopRequireDefault(__webpack_require__(546));

var _cell = __webpack_require__(547);

var _input = __webpack_require__(548);

var _field = _interopRequireDefault(__webpack_require__(554));

var _tabs = __webpack_require__(174);

var _panel_actionbar = __webpack_require__(556);

var _placeholder = _interopRequireDefault(__webpack_require__(255));

var _index = _interopRequireDefault(__webpack_require__(557));

var _index2 = _interopRequireDefault(__webpack_require__(559));

var _header = _interopRequireDefault(__webpack_require__(574));

var _index3 = _interopRequireDefault(__webpack_require__(575));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var themes = {
  normal: _theme.normal,
  dark: _theme.dark
};
exports.themes = themes;

/***/ }),

/***/ 537:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

__webpack_require__(4);

__webpack_require__(11);

__webpack_require__(2);

__webpack_require__(3);

__webpack_require__(5);

__webpack_require__(0);

var _propTypes = _interopRequireDefault(__webpack_require__(6));

var _styled = _interopRequireDefault(__webpack_require__(25));

var _RoutedLink = _interopRequireDefault(__webpack_require__(252));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var MenuLink =
/*#__PURE__*/
(0, _styled.default)(_RoutedLink.default, {
  rootEl: 'a',
  target: "e1s7lmdh0"
})(function (_ref) {
  var theme = _ref.theme;
  return _objectSpread({
    display: 'block',
    color: theme.dimmedTextColor,
    textDecoration: 'none',
    fontSize: '13px',
    lineHeight: '16px',
    padding: '1px 5px 4px',
    marginLeft: '5px',
    position: 'relative',
    zIndex: 1
  }, theme.menuLink);
}, function (_ref2) {
  var theme = _ref2.theme,
      active = _ref2.active;
  return active ? _objectSpread({
    color: 'inherit',
    fontWeight: 'bold',
    backgroundColor: 'rgba(0,0,0,0.07)',
    zIndex: 0
  }, theme.activeMenuLink) : {};
});
MenuLink.propTypes = {
  active: _propTypes.default.bool
};
var _default = MenuLink;
exports.default = _default;

/***/ }),

/***/ 545:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(0);

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _styled = _interopRequireDefault(__webpack_require__(25));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default =
/*#__PURE__*/
(0, _styled.default)("button", {
  target: "e1i4ski80"
})({
  border: '1px solid rgba(0, 0, 0, 0)',
  font: 'inherit',
  background: 'none',
  boxShadow: 'none',
  padding: 0,
  ':hover': {
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
    border: '1px solid #ccc'
  }
}, function (_ref) {
  var highlight = _ref.highlight;
  return highlight ? [{
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
    border: '1px solid #ccc'
  }] : [];
});

exports.default = _default;

/***/ }),

/***/ 546:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(0);

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _styled = _interopRequireDefault(__webpack_require__(25));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Table =
/*#__PURE__*/
(0, _styled.default)("table", {
  target: "e1vdo5380"
})({
  borderCollapse: 'collapse'
});
Table.displayName = 'Table';
var _default = Table;
exports.default = _default;

/***/ }),

/***/ 547:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Th = exports.Td = void 0;

__webpack_require__(4);

__webpack_require__(11);

__webpack_require__(2);

__webpack_require__(3);

__webpack_require__(5);

__webpack_require__(0);

var _styled = _interopRequireDefault(__webpack_require__(25));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var dynamicStyles = function dynamicStyles(_ref) {
  var bordered = _ref.bordered,
      code = _ref.code;
  return _objectSpread({}, bordered ? {
    border: '1px solid #ccc'
  } : {}, code ? {
    whiteSpace: 'nowrap',
    fontFamily: 'Monaco, Consolas, "Courier New", monospace'
  } : {});
};

var styles = {
  padding: '2px 6px'
};
var Td =
/*#__PURE__*/
(0, _styled.default)("td", {
  target: "e6fp4ir0"
})(styles, dynamicStyles);
exports.Td = Td;
var Th =
/*#__PURE__*/
(0, _styled.default)("th", {
  target: "e6fp4ir1"
})(styles, dynamicStyles);
exports.Th = Th;
Td.displayName = 'Td';
Th.displayName = 'Th';

/***/ }),

/***/ 548:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(0);

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Button = exports.Textarea = exports.Select = exports.Input = void 0;

var _styled = _interopRequireDefault(__webpack_require__(25));

var _reactTextareaAutosize = _interopRequireDefault(__webpack_require__(549));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var styles = function styles(_ref) {
  var theme = _ref.theme;
  return {
    padding: '0 10px',
    color: theme.mainTextColor,
    background: theme.inputFill,
    borderRadius: theme.mainBorderRadius,
    transition: 'border-bottom-color .3s linear',
    border: '0 solid transparent',
    borderTop: '3px solid transparent',
    borderBottom: '3px solid transparent',
    boxSizing: 'border-box',
    position: 'relative',
    '&:focus': {
      outline: '0 none',
      borderBottomColor: theme.highlightColor
    }
  };
};

var sizes = function sizes(_ref2) {
  var size = _ref2.size;

  switch (size) {
    case '100%':
      {
        return {
          width: '100%'
        };
      }

    case 'flex':
      {
        return {
          flex: 1
        };
      }

    case 'auto':
    default:
      {
        return {
          display: 'inline'
        };
      }
  }
};

var alignment = function alignment(_ref3) {
  var align = _ref3.align;

  switch (align) {
    case 'end':
      {
        return {
          textAlign: 'right'
        };
      }

    case 'center':
      {
        return {
          textAlign: 'center'
        };
      }

    case 'start':
    default:
      {
        return {
          textAlign: 'left'
        };
      }
  }
};

var validation = function validation(_ref4) {
  var valid = _ref4.valid,
      theme = _ref4.theme;

  switch (valid) {
    case 'valid':
      {
        return {
          borderBottomColor: theme.successColor
        };
      }

    case 'error':
      {
        return {
          borderBottomColor: theme.failColor
        };
      }

    case 'warn':
      {
        return {
          borderBottomColor: theme.warnColor
        };
      }

    case undefined:
    case null:
    default:
      {
        return {};
      }
  }
};

var Input =
/*#__PURE__*/
(0, _styled.default)("input", {
  target: "e1lk8yn70"
})(styles, sizes, alignment, validation, {
  minHeight: 32
});
exports.Input = Input;
Input.styles = styles;
Input.sizes = sizes;
Input.alignment = alignment;
Input.displayName = 'Input';
var Select =
/*#__PURE__*/
(0, _styled.default)("select", {
  target: "e1lk8yn71"
})(styles, sizes, alignment, validation, {
  height: 32,
  userSelect: 'none',
  paddingRight: 20
});
exports.Select = Select;
Select.displayName = 'Select';
var Textarea =
/*#__PURE__*/
(0, _styled.default)(_reactTextareaAutosize.default, {
  target: "e1lk8yn72"
})(styles, sizes, alignment, validation, {
  minHeight: 32,
  paddingTop: 5,
  paddingBottom: 5,
  overflow: 'visible'
});
exports.Textarea = Textarea;
Textarea.displayName = 'Textarea';
var Button =
/*#__PURE__*/
(0, _styled.default)("button", {
  target: "e1lk8yn73"
})(styles, sizes, alignment, validation, {
  cursor: 'pointer',
  userSelect: 'none',
  minHeight: 32,
  boxSizing: 'border-box'
});
exports.Button = Button;
Button.displayName = 'Button';

/***/ }),

/***/ 554:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(0);

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(__webpack_require__(1));

var _propTypes = _interopRequireDefault(__webpack_require__(6));

var _styled = _interopRequireDefault(__webpack_require__(25));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Wrapper =
/*#__PURE__*/
(0, _styled.default)("label", {
  target: "emawvna0"
})(function (_ref) {
  var theme = _ref.theme;
  return {
    width: '100%',
    boxSizing: 'border-box',
    display: 'flex',
    margin: '8px 0',
    borderBottom: theme.mainBorder,
    padding: '0 8px 8px 8px',
    '&:last-child': {
      borderBottom: '0 none',
      paddingBottom: 0
    }
  };
});
var Label =
/*#__PURE__*/
(0, _styled.default)("span", {
  target: "emawvna1"
})({
  minWidth: 100,
  minHeight: 32,
  marginRight: 16,
  display: 'flex',
  justifyContent: 'flex-start',
  alignItems: 'center',
  lineHeight: '16px'
});

var Field = function Field(_ref2) {
  var label = _ref2.label,
      children = _ref2.children;
  return _react.default.createElement(Wrapper, null, label ? _react.default.createElement(Label, null, _react.default.createElement("span", null, label)) : null, children);
};

Field.propTypes = {
  label: _propTypes.default.node,
  children: _propTypes.default.node.isRequired
};
Field.defaultProps = {
  label: undefined
};
var _default = Field;
exports.default = _default;

/***/ }),

/***/ 556:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(0);

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ActionBar = exports.ActionItem = exports.ActionButton = void 0;

__webpack_require__(18);

var _react = _interopRequireWildcard(__webpack_require__(1));

var _propTypes = _interopRequireDefault(__webpack_require__(6));

var _styled = _interopRequireDefault(__webpack_require__(25));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

var Container =
/*#__PURE__*/
(0, _styled.default)("ul", {
  target: "egs2kzf0"
})(function (_ref) {
  var theme = _ref.theme;
  return {
    position: 'absolute',
    bottom: 0,
    right: 0,
    maxWidth: '100%',
    display: 'flex',
    listStyle: 'none',
    margin: 0,
    padding: 0,
    borderTop: theme.mainBorder,
    borderLeft: theme.mainBorder,
    background: theme.barFill,
    borderRadius: "".concat(theme.mainBorderRadius, "px 0 0 0")
  };
});
var ActionButton =
/*#__PURE__*/
(0, _styled.default)("button", {
  target: "egs2kzf1"
})(function (_ref2) {
  var theme = _ref2.theme;
  return {
    border: '0 none',
    display: 'block',
    background: 'none',
    padding: '0 10px',
    textTransform: 'inherit',
    letterSpacing: 'inherit',
    fontSize: 'inherit',
    color: 'inherit',
    borderTop: '2px solid transparent',
    borderBottom: '2px solid transparent',
    '&:focus': {
      borderBottom: "2px solid ".concat(theme.highlightColor),
      outline: '0 none'
    }
  };
});
exports.ActionButton = ActionButton;
ActionButton.displayName = 'ActionButton';
var ActionItem =
/*#__PURE__*/
(0, _styled.default)("li", {
  target: "egs2kzf2"
})(function (_ref3) {
  var first = _ref3.first,
      theme = _ref3.theme;
  return {
    display: 'flex',
    position: 'relative',
    listStyle: 'none',
    padding: 0,
    height: 26,
    fontSize: 11,
    letterSpacing: 1,
    textTransform: 'uppercase',
    borderLeft: first ? '0 none' : "1px solid ".concat(theme.mainBorderColor)
  };
});
exports.ActionItem = ActionItem;
ActionItem.displayName = 'ActionItem';

var ActionBar = function ActionBar(_ref4) {
  var children = _ref4.children;
  return _react.default.createElement(Container, null, _react.Children.toArray(children).map(function (item, index) {
    return (// eslint-disable-next-line react/no-array-index-key
      _react.default.createElement(ActionItem, {
        key: index,
        first: index === 0
      }, item)
    );
  }));
};

exports.ActionBar = ActionBar;
ActionBar.propTypes = {
  children: _propTypes.default.node.isRequired
};

/***/ }),

/***/ 557:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(0);

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

__webpack_require__(89);

__webpack_require__(9);

__webpack_require__(8);

__webpack_require__(19);

__webpack_require__(102);

__webpack_require__(5);

__webpack_require__(2);

__webpack_require__(3);

__webpack_require__(175);

__webpack_require__(18);

var _react = _interopRequireDefault(__webpack_require__(1));

var _propTypes = _interopRequireDefault(__webpack_require__(6));

var _tabs = __webpack_require__(174);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

var AddonPanel = function AddonPanel(_ref) {
  var panels = _ref.panels,
      onPanelSelect = _ref.onPanelSelect,
      selectedPanel = _ref.selectedPanel,
      rest = _objectWithoutProperties(_ref, ["panels", "onPanelSelect", "selectedPanel"]);

  return _react.default.createElement(_tabs.Tabs, _extends({}, rest, {
    absolute: true,
    bordered: true,
    selected: selectedPanel,
    onSelect: onPanelSelect
  }), Object.entries(panels).map(function (_ref2) {
    var _ref3 = _slicedToArray(_ref2, 2),
        k = _ref3[0],
        v = _ref3[1];

    return _react.default.createElement("div", {
      key: k,
      id: k,
      title: v.title
    }, v.render);
  }));
};

AddonPanel.propTypes = {
  selectedPanel: _propTypes.default.string,
  onPanelSelect: _propTypes.default.func.isRequired,
  panels: _propTypes.default.objectOf(_propTypes.default.shape({
    title: _propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.func]),
    render: _propTypes.default.func
  })).isRequired
};
AddonPanel.defaultProps = {
  selectedPanel: null
};
var _default = AddonPanel;
exports.default = _default;

/***/ }),

/***/ 559:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(0);

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.Root = void 0;

var _react = _interopRequireDefault(__webpack_require__(1));

var _propTypes = _interopRequireDefault(__webpack_require__(6));

var _styled = _interopRequireDefault(__webpack_require__(25));

var _provider = _interopRequireDefault(__webpack_require__(560));

var _theme = __webpack_require__(230);

var _mobile = _interopRequireDefault(__webpack_require__(562));

var _desktop = _interopRequireDefault(__webpack_require__(563));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Root =
/*#__PURE__*/
(0, _styled.default)("div", {
  target: "e7rfqu0"
})(function (_ref) {
  var theme = _ref.theme;
  return {
    background: theme.mainBackground,
    fontFamily: theme.mainTextFace,
    color: theme.mainTextColor,
    fontSize: theme.mainTextSize
  };
}, function (_ref2) {
  var isMobileDevice = _ref2.isMobileDevice;
  return isMobileDevice ? {
    display: 'block',
    position: 'fixed',
    top: 0,
    left: 0,
    height: '100vh',
    width: '100vw',
    overflow: 'auto'
  } : {
    position: 'fixed',
    top: 0,
    left: 0,
    height: '100vh',
    width: '100vw',
    overflow: 'hidden'
  };
});
exports.Root = Root;
var StoriesPanelInner =
/*#__PURE__*/
(0, _styled.default)("div", {
  target: "e7rfqu1"
})({
  flexGrow: 1,
  position: 'relative',
  height: '100%',
  width: '100%',
  overflow: 'auto'
});

var Layout = function Layout(props) {
  var isMobileDevice = props.isMobileDevice,
      theme = props.theme,
      AddonPanel = props.addonPanel,
      StoriesPanel = props.storiesPanel,
      Preview = props.preview,
      ShortcutsHelp = props.shortcutsHelp,
      SearchBox = props.searchBox;
  return _react.default.createElement(_provider.default, {
    theme: theme || _theme.normal
  }, _react.default.createElement("div", null, _react.default.createElement(Root, {
    isMobileDevice: isMobileDevice
  }, isMobileDevice ? _react.default.createElement(_mobile.default, null, _react.default.createElement(StoriesPanelInner, null, _react.default.createElement(StoriesPanel, null)), _react.default.createElement(StoriesPanelInner, null, _react.default.createElement(Preview, null)), _react.default.createElement(AddonPanel, null)) : _react.default.createElement(_desktop.default, props)), _react.default.createElement(ShortcutsHelp, null), _react.default.createElement(SearchBox, null)));
};

Layout.propTypes = {
  theme: _propTypes.default.shape({}),
  showStoriesPanel: _propTypes.default.bool.isRequired,
  showAddonPanel: _propTypes.default.bool.isRequired,
  goFullScreen: _propTypes.default.bool.isRequired,
  storiesPanel: _propTypes.default.func.isRequired,
  preview: _propTypes.default.func.isRequired,
  addonPanel: _propTypes.default.func.isRequired,
  shortcutsHelp: _propTypes.default.func.isRequired,
  searchBox: _propTypes.default.func.isRequired,
  addonPanelInRight: _propTypes.default.bool.isRequired,
  isMobileDevice: _propTypes.default.bool.isRequired
};
Layout.defaultProps = {
  theme: null
};
var _default = Layout;
exports.default = _default;

/***/ }),

/***/ 562:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

__webpack_require__(4);

__webpack_require__(11);

__webpack_require__(2);

__webpack_require__(3);

__webpack_require__(5);

__webpack_require__(9);

__webpack_require__(8);

__webpack_require__(0);

__webpack_require__(58);

__webpack_require__(59);

__webpack_require__(18);

var _react = _interopRequireWildcard(__webpack_require__(1));

var _propTypes = _interopRequireDefault(__webpack_require__(6));

var _styled = _interopRequireDefault(__webpack_require__(25));

var _tabs = __webpack_require__(174);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var MobilePanel =
/*#__PURE__*/
(0, _styled.default)("div", {
  target: "e16i77hj0"
})(function (_ref) {
  var selected = _ref.selected,
      theme = _ref.theme;
  return selected ? _objectSpread({
    display: 'block',
    position: 'fixed',
    top: 0,
    left: 0,
    height: 'calc(100vh - 40px)',
    width: '100vw',
    overflow: 'auto',
    WebkitOverflowScrolling: 'touch'
  }, theme.storiesNav) : {
    display: 'none'
  };
});
var TabsWrapper =
/*#__PURE__*/
(0, _styled.default)("div", {
  target: "e16i77hj1"
})({
  position: 'fixed',
  bottom: 0,
  left: 0,
  width: '100vw',
  zIndex: 9999
});
var MobileTabs = ['Navigator', 'Preview', 'Addons'];

var Layout =
/*#__PURE__*/
function (_Component) {
  _inherits(Layout, _Component);

  function Layout() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, Layout);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(Layout)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "state", {
      index: 1
    });

    return _this;
  }

  _createClass(Layout, [{
    key: "render",
    value: function render() {
      var _this2 = this;

      var index = this.state.index;
      var children = this.props.children;
      return _react.default.createElement("div", null, _react.default.createElement(TabsWrapper, null, _react.default.createElement(_tabs.TabBar, null, children.map(function (item, i) {
        return _react.default.createElement(_tabs.Tab, {
          key: MobileTabs[i],
          name: MobileTabs[i],
          active: i === index,
          title: MobileTabs[i] || "".concat(i),
          onSelect: function onSelect() {
            return _this2.setState({
              index: i
            });
          }
        });
      }))), _react.Children.toArray(children).map(function (item, i) {
        return _react.default.createElement(MobilePanel, {
          key: MobileTabs[i],
          selected: i === index
        }, item);
      }));
    }
  }]);

  return Layout;
}(_react.Component);

exports.default = Layout;
Layout.propTypes = {
  children: _propTypes.default.node.isRequired
};

/***/ }),

/***/ 563:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

__webpack_require__(4);

__webpack_require__(11);

__webpack_require__(2);

__webpack_require__(3);

__webpack_require__(5);

__webpack_require__(9);

__webpack_require__(8);

__webpack_require__(0);

__webpack_require__(58);

__webpack_require__(59);

__webpack_require__(143);

var _react = _interopRequireWildcard(__webpack_require__(1));

var _propTypes = _interopRequireDefault(__webpack_require__(6));

var _global = __webpack_require__(17);

var _core = __webpack_require__(171);

var _styled = _interopRequireDefault(__webpack_require__(25));

var _throttle = _interopRequireDefault(__webpack_require__(564));

var _reactSplitPane = _interopRequireDefault(__webpack_require__(569));

var _dimensions = _interopRequireDefault(__webpack_require__(573));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var GlobalStyles = function GlobalStyles() {
  return _react.default.createElement(_core.Global, {
    styles:
    /*#__PURE__*/

    /*#__PURE__*/
    (0, _core.css)(".Resizer{position:relative;display:flex;align-items:center;justify-content:center;}.Resizer.horizontal{height:10px;margin:-5px 0;border-top:5px solid transparent;border-bottom:5px solid transparent;cursor:row-resize;width:100%;}.Resizer.horizontal::after{content:'';display:block;height:2px;width:20px;border-top:1px solid rgba(0,0,0,0.2);border-bottom:1px solid rgba(0,0,0,0.2);}.Resizer.vertical{width:10px;margin:0 -5px;border-left:5px solid transparent;border-right:5px solid transparent;cursor:col-resize;}.Resizer.vertical::after{content:'';display:block;width:2px;height:20px;border-left:1px solid rgba(0,0,0,0.2);border-right:1px solid rgba(0,0,0,0.2);}.Resizer.disabled{visibility:hidden;}")
  });
};

var StoriesPanelWrapper =
/*#__PURE__*/
(0, _styled.default)("div", {
  target: "e97yylu0"
})(function (_ref) {
  var showStoriesPanel = _ref.showStoriesPanel,
      storiesPanelOnTop = _ref.storiesPanelOnTop,
      storiesNav = _ref.theme.storiesNav;
  return _objectSpread({
    boxSizing: 'border-box',
    width: '100%',
    height: '100%',
    display: showStoriesPanel ? 'flex' : 'none',
    flexDirection: storiesPanelOnTop ? 'column' : 'row',
    alignItems: 'stretch',
    paddingRight: storiesPanelOnTop ? 10 : 0
  }, storiesNav);
});
var StoriesPanelInner =
/*#__PURE__*/
(0, _styled.default)("div", {
  target: "e97yylu1"
})({
  flexGrow: 1,
  position: 'relative',
  height: '100%',
  width: '100%',
  overflow: 'auto'
});
var AddonPanelWrapper =
/*#__PURE__*/
(0, _styled.default)("div", {
  target: "e97yylu2"
})(function (_ref2) {
  var showAddonPanel = _ref2.showAddonPanel,
      addonPanelInRight = _ref2.addonPanelInRight,
      layoutMargin = _ref2.theme.layoutMargin;
  return {
    display: showAddonPanel ? 'flex' : 'none',
    flexDirection: addonPanelInRight ? 'row' : 'column',
    alignItems: 'stretch',
    position: 'absolute',
    width: '100%',
    height: '100%',
    padding: addonPanelInRight ? "".concat(layoutMargin, "px ").concat(layoutMargin, "px ").concat(layoutMargin, "px 0") : "0 ".concat(layoutMargin, "px ").concat(layoutMargin, "px 0"),
    boxSizing: 'border-box'
  };
});
var ContentPanel =
/*#__PURE__*/
(0, _styled.default)("div", {
  target: "e97yylu3"
})(function (_ref3) {
  var addonPanelInRight = _ref3.addonPanelInRight,
      storiesPanelOnTop = _ref3.storiesPanelOnTop,
      layoutMargin = _ref3.theme.layoutMargin;
  return {
    position: 'absolute',
    boxSizing: 'border-box',
    width: '100%',
    height: '100%',
    padding: addonPanelInRight ? "".concat(layoutMargin, "px 0 ").concat(layoutMargin, "px 0") : "".concat(layoutMargin, "px ").concat(layoutMargin, "px 0 0"),
    paddingTop: storiesPanelOnTop ? 0 : layoutMargin
  };
});
var PreviewWrapper =
/*#__PURE__*/
(0, _styled.default)("div", {
  target: "e97yylu4"
})(function (_ref4) {
  var theme = _ref4.theme;
  return {
    width: '100%',
    height: '100%',
    boxSizing: 'border-box',
    overflow: 'auto',
    WebkitOverflowScrolling: 'touch',
    position: 'relative',
    backgroundColor: theme.mainFill
  };
}, function (_ref5) {
  var fullscreen = _ref5.fullscreen,
      theme = _ref5.theme;
  return fullscreen ? {
    position: 'fixed',
    left: 0,
    right: 0,
    top: 0,
    zIndex: 1,
    border: 0,
    margin: 0,
    padding: 0
  } : {
    border: theme.mainBorder,
    borderRadius: theme.mainBorderRadius,
    display: 'flex',
    justifyItems: 'center',
    alignItems: 'center',
    '& > *': {
      margin: 'auto'
    }
  };
});
var DragBlockOverlay =
/*#__PURE__*/
(0, _styled.default)("div", {
  target: "e97yylu5"
})(function (_ref6) {
  var isDragging = _ref6.isDragging;
  return {
    zIndex: isDragging ? 2 : 0,
    display: isDragging ? 'block' : 'none',
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0
  };
});
var defaultSizes = {
  addonPanel: {
    down: 200,
    right: 400
  },
  storiesPanel: {
    left: 250,
    top: 400
  }
};

var _saveSizes = function saveSizes(sizes) {
  try {
    _global.localStorage.setItem('panelSizes', JSON.stringify(sizes));

    return true;
  } catch (e) {
    return false;
  }
};

var getSavedSizes = function getSavedSizes(sizes) {
  try {
    var panelSizes = _global.localStorage.getItem('panelSizes');

    if (panelSizes) {
      return JSON.parse(panelSizes);
    }

    _saveSizes(sizes);

    return sizes;
  } catch (e) {
    _saveSizes(sizes);

    return sizes;
  }
};

var Layout =
/*#__PURE__*/
function (_Component) {
  _inherits(Layout, _Component);

  function Layout(props) {
    var _this;

    _classCallCheck(this, Layout);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Layout).call(this, props));
    _this.layerSizes = getSavedSizes(defaultSizes);
    _this.state = {
      previewPanelDimensions: {
        height: 0,
        width: 0
      },
      isDragging: false
    };
    _this.throttledUpdatePreviewPanelState = (0, _throttle.default)(_this.updatePrevewPanelState.bind(_assertThisInitialized(_assertThisInitialized(_this))), 200);
    _this.throttledSaveSizes = (0, _throttle.default)(_this.saveSizes, 25);
    _this.onDragStart = _this.onDragStart.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.onDragEnd = _this.onDragEnd.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    return _this;
  }

  _createClass(Layout, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      _global.window.addEventListener('resize', this.throttledUpdatePreviewPanelState);
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      _global.window.removeEventListener('resize', this.throttledUpdatePreviewPanelState);
    }
  }, {
    key: "onDragStart",
    value: function onDragStart() {
      this.setState({
        isDragging: true
      });
    }
  }, {
    key: "onDragEnd",
    value: function onDragEnd() {
      this.setState({
        isDragging: false
      });
    }
  }, {
    key: "onResize",
    value: function onResize(pane, mode, size) {
      this.throttledSaveSizes(pane, mode, size);
      this.throttledUpdatePreviewPanelState();
    }
  }, {
    key: "saveSizes",
    value: function saveSizes(pane, mode, size) {
      this.layerSizes[pane][mode] = size;

      _saveSizes(this.layerSizes);
    }
  }, {
    key: "updatePrevewPanelState",
    value: function updatePrevewPanelState() {
      var _this$previewPanelRef = this.previewPanelRef,
          clientWidth = _this$previewPanelRef.clientWidth,
          clientHeight = _this$previewPanelRef.clientHeight;
      this.setState({
        previewPanelDimensions: {
          width: clientWidth,
          height: clientHeight
        }
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var _this$props = this.props,
          goFullScreen = _this$props.goFullScreen,
          showStoriesPanel = _this$props.showStoriesPanel,
          showAddonPanel = _this$props.showAddonPanel,
          addonPanelInRight = _this$props.addonPanelInRight,
          AddonPanel = _this$props.addonPanel,
          StoriesPanel = _this$props.storiesPanel,
          Preview = _this$props.preview;
      var _this$state = this.state,
          previewPanelDimensions = _this$state.previewPanelDimensions,
          isDragging = _this$state.isDragging;
      var storiesPanelOnTop = false;
      var addonSplit = addonPanelInRight ? 'vertical' : 'horizontal';
      var storiesSplit = storiesPanelOnTop ? 'horizontal' : 'vertical';
      var sizes = getSavedSizes(this.layerSizes);
      var storiesPanelDefaultSize = !storiesPanelOnTop ? sizes.storiesPanel.left : sizes.storiesPanel.top;
      var addonPanelDefaultSize = !addonPanelInRight ? sizes.addonPanel.down : sizes.addonPanel.right;
      return _react.default.createElement(_reactSplitPane.default, {
        split: storiesSplit,
        allowResize: showStoriesPanel,
        minSize: 1,
        maxSize: -400,
        size: showStoriesPanel ? storiesPanelDefaultSize : 1,
        defaultSize: storiesPanelDefaultSize,
        onDragStarted: this.onDragStart,
        onDragFinished: this.onDragEnd,
        onChange: function onChange(size) {
          return _this2.onResize('storiesPanel', storiesPanelOnTop ? 'top' : 'left', size);
        }
      }, _react.default.createElement(StoriesPanelWrapper, {
        showStoriesPanel: showStoriesPanel,
        storiesPanelOnTop: storiesPanelOnTop
      }, _react.default.createElement(GlobalStyles, null), _react.default.createElement(StoriesPanelInner, null, _react.default.createElement(StoriesPanel, null))), _react.default.createElement(_reactSplitPane.default, {
        split: addonSplit,
        allowResize: showAddonPanel,
        primary: "second",
        minSize: addonPanelInRight ? 200 : 100,
        maxSize: -200,
        size: showAddonPanel ? addonPanelDefaultSize : 1,
        defaultSize: addonPanelDefaultSize,
        onDragStarted: this.onDragStart,
        onDragFinished: this.onDragEnd,
        onChange: function onChange(size) {
          return _this2.onResize('addonPanel', addonPanelInRight ? 'right' : 'down', size);
        }
      }, _react.default.createElement(ContentPanel, {
        addonPanelInRight: addonPanelInRight,
        storiesPanelOnTop: storiesPanelOnTop
      }, _react.default.createElement(DragBlockOverlay, {
        isDragging: isDragging
      }), _react.default.createElement(PreviewWrapper, {
        fullscreen: goFullScreen,
        innerRef: function innerRef(ref) {
          _this2.previewPanelRef = ref;
        }
      }, _react.default.createElement(Preview, null), _react.default.createElement(_dimensions.default, previewPanelDimensions))), _react.default.createElement(AddonPanelWrapper, {
        showAddonPanel: showAddonPanel,
        addonPanelInRight: addonPanelInRight
      }, _react.default.createElement(AddonPanel, null))));
    }
  }]);

  return Layout;
}(_react.Component);

Layout.propTypes = {
  showStoriesPanel: _propTypes.default.bool.isRequired,
  showAddonPanel: _propTypes.default.bool.isRequired,
  goFullScreen: _propTypes.default.bool.isRequired,
  storiesPanel: _propTypes.default.func.isRequired,
  preview: _propTypes.default.func.isRequired,
  addonPanel: _propTypes.default.func.isRequired,
  addonPanelInRight: _propTypes.default.bool.isRequired
};
var _default = Layout;
exports.default = _default;

/***/ }),

/***/ 573:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

__webpack_require__(9);

__webpack_require__(8);

__webpack_require__(4);

__webpack_require__(11);

__webpack_require__(2);

__webpack_require__(3);

__webpack_require__(5);

__webpack_require__(0);

__webpack_require__(58);

__webpack_require__(59);

var _propTypes = _interopRequireDefault(__webpack_require__(6));

var _react = _interopRequireWildcard(__webpack_require__(1));

var _styled = _interopRequireDefault(__webpack_require__(25));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var DISPLAY_TIMEOUT = 1000;
var Container =
/*#__PURE__*/
(0, _styled.default)("div", {
  target: "eiokus70"
})({
  position: 'absolute',
  padding: '5px 8px',
  bottom: 0,
  right: 0,
  backgroundColor: 'rgba(255, 255, 255, 0.5)',
  borderRadius: '5px 0 0 0'
});
var Section =
/*#__PURE__*/
(0, _styled.default)("span", {
  target: "eiokus71"
})({
  fontSize: 12
});
var Delimiter =
/*#__PURE__*/
(0, _styled.default)("span", {
  target: "eiokus72"
})({
  margin: '0px 5px',
  fontSize: 12
});

var Dimensions =
/*#__PURE__*/
function (_Component) {
  _inherits(Dimensions, _Component);

  function Dimensions(props) {
    var _this;

    _classCallCheck(this, Dimensions);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Dimensions).call(this, props));
    _this.state = _objectSpread({}, props, {
      isVisible: false
    });
    _this.hideTimeout = null;
    return _this;
  }

  _createClass(Dimensions, [{
    key: "componentDidUpdate",
    value: function componentDidUpdate() {
      var _this2 = this;

      var isVisible = this.state.isVisible;

      if (isVisible) {
        clearTimeout(this.hideTimeout);
        this.hideTimeout = setTimeout(function () {
          _this2.setState({
            isVisible: false
          });
        }, DISPLAY_TIMEOUT);
      }
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      clearTimeout(this.hideTimeout);
    }
  }, {
    key: "render",
    value: function render() {
      var isVisible = this.state.isVisible;
      var _this$props = this.props,
          width = _this$props.width,
          height = _this$props.height;
      return isVisible ? _react.default.createElement(Container, null, _react.default.createElement(Section, null, "".concat(width, "px")), _react.default.createElement(Delimiter, null, "x"), _react.default.createElement(Section, null, "".concat(height, "px"))) : null;
    }
  }]);

  return Dimensions;
}(_react.Component);

Dimensions.getDerivedStateFromProps = function (nextProps, prevState) {
  if (nextProps.width !== prevState.width || nextProps.height !== prevState.height) {
    return _objectSpread({}, nextProps, {
      isVisible: true
    });
  }

  return null;
};

Dimensions.propTypes = {
  width: _propTypes.default.number.isRequired,
  height: _propTypes.default.number.isRequired
};
var _default = Dimensions;
exports.default = _default;

/***/ }),

/***/ 574:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

__webpack_require__(4);

__webpack_require__(11);

__webpack_require__(2);

__webpack_require__(3);

__webpack_require__(5);

__webpack_require__(0);

__webpack_require__(10);

var _react = _interopRequireDefault(__webpack_require__(1));

var _propTypes = _interopRequireDefault(__webpack_require__(6));

var _styled = _interopRequireDefault(__webpack_require__(25));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Wrapper =
/*#__PURE__*/
(0, _styled.default)("div", {
  target: "ez1mtsr0"
})(function (_ref) {
  var theme = _ref.theme;
  return _objectSpread({
    margin: '0 0 10px',
    display: 'flex'
  }, theme.brand);
});
var HeadingLink =
/*#__PURE__*/
(0, _styled.default)("a", {
  target: "ez1mtsr1"
})(function (_ref2) {
  var theme = _ref2.theme;
  return _objectSpread({
    textDecoration: 'none',
    flexGrow: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    border: '1px solid rgba(0, 0, 0, 0.1)',
    borderRadius: 2,
    textTransform: 'uppercase',
    letterSpacing: '1.5px',
    fontSize: '12px',
    fontWeight: 'bolder',
    color: 'currentColor',
    textAlign: 'center',
    cursor: 'pointer',
    padding: '5px',
    margin: 0,
    overflow: 'hidden'
  }, theme.brandLink);
});
var ShortHelpButton =
/*#__PURE__*/
(0, _styled.default)("button", {
  target: "ez1mtsr2"
})({
  textTransform: 'uppercase',
  fontSize: 12,
  fontWeight: 'bolder',
  color: 'currentColor',
  border: '1px solid rgba(0, 0, 0, 0.1)',
  textAlign: 'center',
  borderRadius: 2,
  cursor: 'pointer',
  display: 'inlineBlock',
  padding: 0,
  margin: '0 0 0 5px',
  backgroundColor: 'inherit',
  outline: 0,
  width: 30,
  flexShrink: 0
});

var Header = function Header(_ref3) {
  var openShortcutsHelp = _ref3.openShortcutsHelp,
      name = _ref3.name,
      url = _ref3.url,
      enableShortcutsHelp = _ref3.enableShortcutsHelp,
      isMobileDevice = _ref3.isMobileDevice;
  return _react.default.createElement(Wrapper, {
    isMobileDevice: isMobileDevice
  }, _react.default.createElement(HeadingLink, {
    href: url,
    target: "_blank",
    rel: "noopener noreferrer",
    dangerouslySetInnerHTML: {
      __html: name
    }
  }), enableShortcutsHelp && _react.default.createElement(ShortHelpButton, {
    onClick: openShortcutsHelp
  }, "\u2318"));
};

Header.defaultProps = {
  openShortcutsHelp: null,
  enableShortcutsHelp: true,
  name: '',
  url: '',
  isMobileDevice: false
};
Header.propTypes = {
  openShortcutsHelp: _propTypes.default.func,
  name: _propTypes.default.string,
  url: _propTypes.default.string,
  isMobileDevice: _propTypes.default.bool,
  enableShortcutsHelp: _propTypes.default.bool
};
var _default = Header;
exports.default = _default;

/***/ }),

/***/ 575:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(0);

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _chevronRight = _interopRequireDefault(__webpack_require__(576));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Icons = {
  ChevronRight: _chevronRight.default
};
exports.default = Icons;

/***/ }),

/***/ 576:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(0);

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

__webpack_require__(89);

var _react = _interopRequireDefault(__webpack_require__(1));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

var _default = function _default(props) {
  return _react.default.createElement("svg", _extends({
    fill: "currentColor",
    preserveAspectRatio: "xMidYMid meet",
    height: "10",
    width: "10",
    viewBox: "0 0 40 40",
    style: {
      verticalAlign: 'top',
      fill: 'currentcolor'
    }
  }, props), _react.default.createElement("g", null, _react.default.createElement("path", {
    d: "m23.3 20l-13.1-13.6c-0.3-0.3-0.3-0.9 0-1.2l2.4-2.4c0.3-0.3 0.9-0.4 1.2-0.1l16 16.7c0.1 0.1 0.2 0.4 0.2 0.6s-0.1 0.5-0.2 0.6l-16 16.7c-0.3 0.3-0.9 0.3-1.2 0l-2.4-2.5c-0.3-0.3-0.3-0.9 0-1.2z"
  })));
};

exports.default = _default;

/***/ }),

/***/ 90:
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

/***/ 91:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(0);

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setInitialStory = setInitialStory;
exports.setError = setError;
exports.clearError = clearError;
exports.selectStory = selectStory;
exports.types = void 0;
var types = {
  SET_ERROR: 'PREVIEW_SET_ERROR',
  CLEAR_ERROR: 'PREVIEW_CLEAR_ERROR',
  SELECT_STORY: 'PREVIEW_SELECT_STORY',
  SET_INITIAL_STORY: 'PREVIEW_SET_INITIAL_STORY'
};
exports.types = types;

function setInitialStory(storyKindList) {
  return {
    type: types.SET_INITIAL_STORY,
    storyKindList: storyKindList
  };
}

function setError(error) {
  return {
    type: types.SET_ERROR,
    error: error
  };
}

function clearError() {
  return {
    type: types.CLEAR_ERROR
  };
}

function selectStory(kind, story) {
  return {
    type: types.SELECT_STORY,
    kind: kind,
    story: story
  };
}

/***/ })

}]);