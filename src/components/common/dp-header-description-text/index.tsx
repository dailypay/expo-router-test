// Imported
import React, { ReactNode } from 'react';
import { StyleSheet, StyleProp, TextStyle } from 'react-native';
import { DPText } from '@dailypay/component-library';

export interface HeaderDescriptionTextProps {
  children: ReactNode;
  style?: StyleProp<TextStyle>;
}

export default function DPHeaderDescriptionText(
  props: HeaderDescriptionTextProps
) {
  return (
    <DPText style={[styles.description, props.style]} accessible={true}>
      {props.children}
    </DPText>
  );
}

const styles = StyleSheet.create({
  description: {
    fontSize: 16,
    lineHeight: 24,
    letterSpacing: -0.5,
  },
});
