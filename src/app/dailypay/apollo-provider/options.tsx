import { DPButton, DPText } from '@dailypay/component-library';
import { router } from 'expo-router';
import { View } from 'react-native';

const Test = () => {
  return (
    <View>
      <DPText>Test!</DPText>
      <DPButton onPress={() => router.push('/')} title='Logout' />
    </View>
  );
};

export default Test;
