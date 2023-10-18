import PayTmClient from '@dailypay/paytm-onboarding-api-client';
import { TokenStorageKeys } from 'constants/tokenStorage';
import { tokenStorage } from 'services/token-storage';

export const DAILYPAY_API_URL = 'http://employees-api.localhost.com:3000/';
export const APP_BUNDLE_NAME = 'com.DailyPay.DailyPay';

export const ApiClient = new PayTmClient(DAILYPAY_API_URL);

ApiClient.instance.interceptors.request.use(async (config) => {
  const jwt = await tokenStorage.getItem(TokenStorageKeys.TOKEN_KEY);

  if (jwt) {
    config.headers.Authorization = `Bearer ${jwt}`;
  }
  config.headers['X-App-Bundle'] = APP_BUNDLE_NAME;

  return config;
});

ApiClient.instance.interceptors.response.use(
  async (response) => {
    const jwt = response.headers['x-user-token'];
    const refresh_token = response.headers['x-refresh-token'];
    if (jwt) {
      tokenStorage.setItem(TokenStorageKeys.TOKEN_KEY, jwt);
    }
    if (refresh_token) {
      tokenStorage.setItem(TokenStorageKeys.REFRESH_TOKEN_KEY, refresh_token);
    }
    return response;
  },
  (error) => {
    console.log(error, 'right here');
    if (error?.request?.status === 500) {
      console.log(error, 'error');
      // analytics.logEvent({
      //   type: AnalyticsEventTypes.ClientError,
      //   payload: {
      //     error: 'API_ERROR',
      //     page: analytics.getCurrentScreen(),
      //   },
      // });
    }
    return Promise.reject(error);
  }
);
