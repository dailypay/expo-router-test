import { IStoreLocally } from '@dailypay/paytm-apollo-client/dist/Interfaces';

export const tokenStorage: IStoreLocally = {
  getItem: (key) => localStorage.getItem(key),
  setItem: (key, value) => localStorage.setItem(key, value),
  removeItem: (key) => localStorage.removeItem(key),
};
