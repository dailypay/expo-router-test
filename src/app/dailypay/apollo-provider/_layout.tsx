import { ErrorResponse } from '@apollo/client/link/error';
import { PayTmApolloClient } from '@dailypay/paytm-apollo-client';
import { Stack } from 'expo-router';
import { Drawer } from 'expo-router/drawer';
import { APP_BUNDLE_NAME, DAILYPAY_API_URL } from 'services/api';
import { tokenStorage } from 'services/token-storage';

const DailyPayLayout = () => {
  const handle500Error = (error: ErrorResponse) => console.log(error, '500');
  const handle422 = (error: ErrorResponse) => console.log(error, '422');
  const handleLogout = () => {
    console.log('Logging out!');
  };
  const correlationId = 'test';
  const fingerPrintService = {
    getFingerPrintNetworkHeader: async () => {
      return Promise.resolve({ test: 'test' });
    },
  };
  return (
    <PayTmApolloClient
      appVersion={'test'}
      graphQLEndpoint={`${DAILYPAY_API_URL}graphql`}
      //   gatewayEndpoint={GQL_GATEWAY_API}
      storage={tokenStorage}
      fingerPrintService={fingerPrintService}
      appBundleName={APP_BUNDLE_NAME}
      handle500Error={handle500Error}
      handle422={handle422}
      handleUnauthorized={handleLogout}
      correlationId={correlationId}
    >
      {() => (
        <Drawer>
          <Drawer.Screen name='home' options={{ headerTitle: 'Welcome' }} />
          <Drawer.Screen name='options' options={{ headerTitle: 'Options' }} />
        </Drawer>
      )}
    </PayTmApolloClient>
  );
};

export default DailyPayLayout;
