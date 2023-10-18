import { useMemo } from 'react';
import { ImageStyle, StyleSheet, TextStyle, ViewStyle } from 'react-native';
import fridayAppTheme from 'src/services/theme';
import { FridayAppTheme } from 'interfaces/theme';

type Props = { [key: string]: string | number | boolean | undefined };

type NamedStyles<T> = {
  [P in keyof T]: ViewStyle | TextStyle | ImageStyle;
};

type ThemeHook<T extends NamedStyles<T>> = (props?: Props) => NamedStyles<T>;
type ThemeFunc<T extends NamedStyles<T>> = (
  theme: FridayAppTheme,
  props?: Props
) => T;

export const makeStyles =
  <T extends NamedStyles<T> | NamedStyles<any>>(
    f: ThemeFunc<T>
  ): ThemeHook<T> =>
  (props) => {
    return useMemo(() => StyleSheet.create(f(fridayAppTheme, props)), [props]);
  };
