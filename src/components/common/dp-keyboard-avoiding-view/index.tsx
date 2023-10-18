// Imported
import React from 'react';
import { KeyboardAvoidingViewProps, KeyboardAvoidingView } from 'react-native';
import { useHeaderHeight } from '@react-navigation/elements';

// Local
import { isIOS } from 'services/device-info';

export default function DPKeyboardAvoidingView(
  props: KeyboardAvoidingViewProps
) {
  const { children, ...otherProps } = props;
  const headerHeight = useHeaderHeight();

  return (
    <KeyboardAvoidingView
      behavior={isIOS ? 'padding' : undefined}
      keyboardVerticalOffset={isIOS ? headerHeight : 0}
      {...otherProps}
    >
      {children}
    </KeyboardAvoidingView>
  );
}
