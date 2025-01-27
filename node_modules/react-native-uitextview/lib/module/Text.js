function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
import React from 'react';
import { Platform, requireNativeComponent, StyleSheet, UIManager, Text as RNText } from 'react-native';
const LINKING_ERROR = `The package 'react-native-uitextview' doesn't seem to be linked. Make sure: \n\n` + Platform.select({
  ios: "- You have run 'pod install'\n",
  default: ''
}) + '- You rebuilt the app after installing the package\n' + '- You are not using Expo Go\n';

// These props are for the main native wrapper component

// These props are for each of the children native components

const RNUITextView = UIManager.getViewManagerConfig?.('RNUITextView') != null ? requireNativeComponent('RNUITextView') : () => {
  if (Platform.OS !== 'ios') return null;
  throw new Error(LINKING_ERROR);
};
export const RNUITextViewChild = UIManager.getViewManagerConfig?.('RNUITextViewChild') != null ? requireNativeComponent('RNUITextViewChild') : () => {
  if (Platform.OS !== 'ios') return null;
  throw new Error(LINKING_ERROR);
};
const TextAncestorContext = /*#__PURE__*/React.createContext([false, StyleSheet.create({})]);
const useTextAncestorContext = () => React.useContext(TextAncestorContext);
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
  const flattenedStyle = React.useMemo(() => StyleSheet.flatten([rootStyle, style]), [rootStyle, style]);
  if (!isAncestor) {
    return /*#__PURE__*/React.createElement(TextAncestorContext.Provider, {
      value: [true, flattenedStyle]
    }, /*#__PURE__*/React.createElement(RNUITextView, _extends({}, textDefaults, rest, {
      ellipsizeMode: rest.ellipsizeMode ?? rest.lineBreakMode ?? 'tail',
      style: [flattenedStyle],
      onPress: undefined // We want these to go to the children only
      ,
      onLongPress: undefined
    }), React.Children.toArray(children).map((c, index) => {
      if ( /*#__PURE__*/React.isValidElement(c)) {
        return c;
      } else if (typeof c === 'string' || typeof c === 'number') {
        return /*#__PURE__*/React.createElement(RNUITextViewChild, _extends({
          key: index,
          style: flattenedStyle,
          text: c.toString()
        }, rest));
      }
      return null;
    })));
  } else {
    return /*#__PURE__*/React.createElement(React.Fragment, null, React.Children.toArray(children).map((c, index) => {
      if ( /*#__PURE__*/React.isValidElement(c)) {
        return c;
      } else if (typeof c === 'string' || typeof c === 'number') {
        return /*#__PURE__*/React.createElement(RNUITextViewChild, _extends({
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
    return /*#__PURE__*/React.createElement(RNText, props);
  }
  return /*#__PURE__*/React.createElement(UITextViewChild, props);
}
export function UITextView(props) {
  if (Platform.OS !== 'ios') {
    return /*#__PURE__*/React.createElement(RNText, props);
  }
  return /*#__PURE__*/React.createElement(UITextViewInner, props);
}
//# sourceMappingURL=Text.js.map