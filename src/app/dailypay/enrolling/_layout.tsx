import { DPScrollView } from '@dailypay/component-library';
import { Slot } from 'expo-router';
import { View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { makeStyles } from 'services/styles';

const EnrollingLayout = () => {
  const insets = useSafeAreaInsets();
  const styles = useStyles({ marginTop: insets.top });
  return (
    <DPScrollView
      keyboardShouldPersistTaps='handled'
      contentContainerStyle={styles.container}
    >
      <Slot />
    </DPScrollView>
  );
};

const useStyles = makeStyles((theme, props) => ({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: (props?.marginTop as number) || 0,
  },
}));

export default EnrollingLayout;
