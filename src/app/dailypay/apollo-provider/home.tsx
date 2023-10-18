import { useQuery } from '@apollo/client';
import { DPText, DashboardLoader } from '@dailypay/component-library';
import { Queries } from '@dailypay/paytm-apollo-client';
import DPKeyboardAvoidingView from 'components/common/dp-keyboard-avoiding-view';
import { View } from 'react-native';

const Root = () => {
  const {
    data,
    loading: employeeQueryLoading,
    refetch,
  } = Queries.getHydrateDashboardQuery();
  if (employeeQueryLoading) return <DashboardLoader />;
  return (
    <View>
      <DPText>Testing!!</DPText>
    </View>
  );
};

export default Root;
