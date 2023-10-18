import React from 'react';
import { Text, View } from 'react-native';
import { makeStyles } from 'src/services/styles';
import { DPButton } from '@dailypay/component-library';
import { Link } from 'expo-router';

const Home = () => {
  const styles = useStyles();
  const handleOnPress = () => {
    //
  };
  return (
    <View style={styles.container}>
      <Link href='/dailypay' asChild>
        <DPButton onPress={handleOnPress} title='DailyPay' />
      </Link>
      <Link href='/friday' asChild>
        <DPButton onPress={handleOnPress} title='Friday' />
      </Link>
    </View>
  );
};

const useStyles = makeStyles(() => ({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
}));

export default Home;
