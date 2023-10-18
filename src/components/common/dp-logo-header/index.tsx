// Imported
import { Icon } from '@dailypay/component-library';
import React from 'react';
import { StyleProp, ImageStyle } from 'react-native';

// Local
import { makeStyles } from 'services/styles';

export interface LogoHeaderProps {
  style?: StyleProp<ImageStyle>;
}

export default function DPLogoHeader(props: LogoHeaderProps) {
  const styles = useStyles();

  return (
    <Icon
      type='logo'
      height={36}
      width={127.5}
      style={[styles.image, props.style]}
    />
  );
}

const useStyles = makeStyles((theme) => ({
  image: {
    marginBottom: 24,
  },
}));
