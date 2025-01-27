"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RNUITextViewChild = void 0;
exports.UITextView = UITextView;
var _react = _interopRequireDefault(require("react"));
var _reactNative = require("react-native");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
const LINKING_ERROR = `The package 'react-native-uitextview' doesn't seem to be linked. Make sure: \n\n` + _reactNative.Platform.select({
  ios: "- You have run 'pod install'\n",
  default: ''
}) + '- You rebuilt the app after installing the package\n' + '- You are not using Expo Go\n';

// These props are for the main native wrapper component

// These props are for each of the children native components

const RNUITextView = _reactNative.UIManager.getViewManagerConfig?.('RNUITextView') != null ? (0, _reactNative.requireNativeComponent)('RNUITextView') : () => {
  if (_reactNative.Platform.OS !== 'ios') return null;
  throw new Error(LINKING_ERROR);
};
const RNUITextViewChild = exports.RNUITextViewChild = _reactNative.UIManager.getViewManagerConfig?.('RNUITextViewChild') != null ? (0, _reactNative.requireNativeComponent)('RNUITextViewChild') : () => {
  if (_reactNative.Platform.OS !== 'ios') return null;
  throw new Error(LINKING_ERROR);
};
const TextAncestorContext = /*#__PURE__*/_react.default.createContext([false, _reactNative.StyleSheet.create({})]);
const useTextAncestorContext = () => _react.default.useContext(TextAncestorContext);
const textDefaults = {
  allowFontScaling: true,
  selectable: true
};
function UITextViewChild({
  style,
  children,
  ...rest
}) {
  const [isAncestor, rootStyle] = useTextAncestorContext();

  // Flatten the styles, and apply the root styles when needed
  const flattenedStyle = _react.default.useMemo(() => _reactNative.StyleSheet.flatten([rootStyle, style]), [rootStyle, style]);
  if (!isAncestor) {
    return /*#__PURE__*/_react.default.createElement(TextAncestorContext.Provider, {
      value: [true, flattenedStyle]
    }, /*#__PURE__*/_react.default.createElement(RNUITextView, _extends({}, textDefaults, rest, {
      ellipsizeMode: rest.ellipsizeMode ?? rest.lineBreakMode ?? 'tail',
      style: [flattenedStyle],
      onPress: undefined // We want these to go to the children only
      ,
      onLongPress: undefined
    }), _react.default.Children.toArray(children).map((c, index) => {
      if ( /*#__PURE__*/_react.default.isValidElement(c)) {
        return c;
      } else if (typeof c === 'string' || typeof c === 'number') {
        return /*#__PURE__*/_react.default.createElement(RNUITextViewChild, _extends({
          key: index,
          style: flattenedStyle,
          text: c.toString()
        }, rest));
      }
      return null;
    })));
  } else {
    return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, _react.default.Children.toArray(children).map((c, index) => {
      if ( /*#__PURE__*/_react.default.isValidElement(c)) {
        return c;
      } else if (typeof c === 'string' || typeof c === 'number') {
        return /*#__PURE__*/_react.default.createElement(RNUITextViewChild, _extends({
          key: index,
          style: flattenedStyle,
          text: c.toString()
        }, rest));
      }
      return null;
    }));
  }
}
function UITextViewInner(props) {
  const [isAncestor] = useTextAncestorContext();

  // Even if the uiTextView prop is set, we can still default to using
  // normal selection (i.e. base RN text) if the text doesn't need to be
  // selectable
  if ((!props.selectable || !props.uiTextView) && !isAncestor) {
    return /*#__PURE__*/_react.default.createElement(_reactNative.Text, props);
  }
  return /*#__PURE__*/_react.default.createElement(UITextViewChild, props);
}
function UITextView(props) {
  if (_reactNative.Platform.OS !== 'ios') {
    return /*#__PURE__*/_react.default.createElement(_reactNative.Text, props);
  }
  return /*#__PURE__*/_react.default.createElement(UITextViewInner, props);
}
//# sourceMappingURL=Text.js.map