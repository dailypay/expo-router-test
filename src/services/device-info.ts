// Imported
import {
  isDevice,
  brand,
  manufacturer,
  modelName,
  designName,
  productName,
  osName,
  osVersion,
  osBuildId,
  osBuildFingerprint,
  platformApiLevel,
  modelId,
  deviceName,
} from 'expo-device';
import { PixelRatio, Platform } from 'react-native';

export const deviceInfo = {
  isDevice,
  brand,
  manufacturer,
  modelName,
  designName,
  productName,
  osName,
  osVersion,
  osBuildId,
  osBuildFingerprint,
  platformApiLevel,
  deviceName,
  hasDynamicIsland:
    Platform.OS !== 'web' ||
    require('react-native-device-info').hasDynamicIsland(),
  // hasDynamicIsland: hasDynamicIsland(),
};

export const isAndroid = Platform.OS === 'android';
export const isIOS = Platform.OS === 'ios';
export const isTextScaledUp = PixelRatio.getFontScale() >= 2;
