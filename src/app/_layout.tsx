import { AssetsProvider, AssetsType } from '@dailypay/component-library';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { SplashScreen, Stack } from 'expo-router';
import { useEffect } from 'react';
import { useColorScheme } from 'react-native';
import { componentLibraryAssets as assets } from '../../assets';
import { ScrollProvider } from 'src/contexts/scroll-provider';

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router';

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: '(tabs)',
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    'GraphikApp-Regular': require('../../assets/fonts/GraphikApp-Regular.ttf'),
    'GraphikApp-RegularItalic': require('../../assets/fonts/GraphikApp-RegularItalic.ttf'),
    'GraphikApp-Semibold': require('../../assets/fonts/GraphikApp-Semibold.ttf'),
    'GraphikApp-Bold': require('../../assets/fonts/GraphikApp-Bold.ttf'),
    'GraphikApp-Light': require('../../assets/fonts/GraphikApp-Light.ttf'),
    ...FontAwesome.font,
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return <RootLayoutNav />;
}

function RootLayoutNav() {
  const colorScheme = useColorScheme();

  return (
    <ScrollProvider>
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <AssetsProvider assets={assets as AssetsType}>
          <Stack>
            <Stack.Screen name='(tabs)' options={{ headerShown: false }} />
            <Stack.Screen name='dailypay' options={{ headerShown: false }} />
          </Stack>
        </AssetsProvider>
      </ThemeProvider>
    </ScrollProvider>
  );
}
