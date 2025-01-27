import React from 'react';
import { ViewStyle, TextProps } from 'react-native';
export interface RNUITextViewProps extends TextProps {
    children: React.ReactNode;
    style: ViewStyle[];
}
type RNUITextViewChildProps = TextProps & {
    text: string;
    onTextPress?: (...args: any[]) => void;
    onTextLongPress?: (...args: any[]) => void;
};
export declare const RNUITextViewChild: import("react-native").HostComponent<RNUITextViewChildProps> | (() => null);
export declare function UITextView(props: TextProps & {
    uiTextView?: boolean;
}): React.JSX.Element;
export {};
//# sourceMappingURL=Text.d.ts.map