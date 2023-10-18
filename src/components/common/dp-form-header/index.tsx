// Imported
import React from 'react';
import { DPText } from '@dailypay/component-library';

// local
import { makeStyles } from 'services/styles';

export default function DPFormHeader(props: { text: string; testID?: string }) {
  const styles = useStyles();
  return (
    <DPText
      accessibilityRole='header'
      style={styles.text}
      fontWeight='600'
      testID={props.testID}
    >
      {props.text}
    </DPText>
  );
}

const useStyles = makeStyles((theme) => ({
  text: {
    fontSize: 24,
    lineHeight: 36,
  },
}));
