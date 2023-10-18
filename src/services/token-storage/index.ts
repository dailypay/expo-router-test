import { IStoreLocally } from '@dailypay/paytm-apollo-client/dist/Interfaces';
import * as SecureStore from 'expo-secure-store';

export const tokenStorage: IStoreLocally = {
  getItem: (key) => SecureStore.getItemAsync(key),
  setItem: (key, value) =>
    SecureStore.setItemAsync(key, value, {
      keychainAccessible: SecureStore.AFTER_FIRST_UNLOCK_THIS_DEVICE_ONLY,
    }),
  removeItem: (key) => SecureStore.deleteItemAsync(key),
};
