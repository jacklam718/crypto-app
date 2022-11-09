import { registerRootComponent } from 'expo';
import { useMemo } from 'react';
import { StatusBar, useColorScheme } from 'react-native';
import { QueryClientProvider } from '@tanstack/react-query';
import ConfigProvider from 'react-native-base-components/src/helpers/ConfigProvider';
import { Snackbar } from 'react-native-base-components/src/snackbar';
import App from './App';
import themes from './themes';
import queryClient from './queryClient';

const setup = () => {
  return () => {
    const colorScheme = useColorScheme();
    const theme = useMemo(() => themes[colorScheme], [colorScheme]);

    return (
      <QueryClientProvider client={queryClient}>
        <ConfigProvider config={{ theme }}>
          <StatusBar barStyle="light-content" />
          <App />
          <Snackbar />
        </ConfigProvider>
      </QueryClientProvider>
    );
  };
};

registerRootComponent(setup());
