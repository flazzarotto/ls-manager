"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = _default;

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _default() {
  var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      _ref$autoStringify = _ref.autoStringify,
      autoStringify = _ref$autoStringify === void 0 ? true : _ref$autoStringify,
      _ref$autoParse = _ref.autoParse,
      autoParse = _ref$autoParse === void 0 ? autoStringify : _ref$autoParse,
      _ref$parsingFunction = _ref.parsingFunction,
      parsingFunction = _ref$parsingFunction === void 0 ? undefined : _ref$parsingFunction,
      _ref$stringifyingFunc = _ref.stringifyingFunction,
      stringifyingFunction = _ref$stringifyingFunc === void 0 ? undefined : _ref$stringifyingFunc;

  var silentError = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

  if (typeof window === 'undefined') {
    if (!silentError) {
      throw new Error('Local Storage Manager cannot be used in node environment');
    }

    return {
      setItem: function setItem() {},
      getItem: function getItem() {},
      update: function update() {}
    };
  }

  var parse = parsingFunction || function (string) {
    if (autoParse) {
      return JSON.parse(string);
    }

    return string;
  };

  var stringify = stringifyingFunction || function (value) {
    if (autoStringify) {
      return JSON.stringify(value);
    }

    return value;
  };

  return new ( /*#__PURE__*/function () {
    function _class() {
      _classCallCheck(this, _class);
    }

    _createClass(_class, [{
      key: "setItem",
      get: function get() {
        /**
         * @param key
         * @param value
         */
        return function (key, value) {
          localStorage.setItem(key, stringify(value));
        };
      }
    }, {
      key: "getItem",
      get: function get() {
        /**
         * @throws Error if autoparse is on and stored item is not valid JSON
         * @param key
         * @returns {null|object}
         */
        return function (key) {
          var item = localStorage.getItem(key);

          if (!item) {
            return null;
          }

          return parse(item);
        };
      }
    }, {
      key: "update",
      get: function get() {
        var _this = this;

        return function (key, newValues) {
          var item = _this.getItem(key);

          switch (_typeof(item)) {
            case 'object':
              if (Array.isArray(item)) {
                _this.setItem(key, [].concat(_toConsumableArray(item), _toConsumableArray(newValues)));

                break;
              }

              _this.setItem(key, _objectSpread(_objectSpread({}, item), newValues));

              break;

            default:
              _this.setItem(key, newValues);

              console.warn('You can update only arrays or objects. Please use `setItem` function for' + 'other types.');
          }
        };
      }
    }]);

    return _class;
  }())();
}