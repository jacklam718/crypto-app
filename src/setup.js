import React from 'react';
import { Provider } from 'react-redux';
import { registerRootComponent } from 'expo';
import { SnackbarPortal } from 'react-native-base-components/src/snackbar';

import App from './App';
import AppConfigManager from './AppConfigManager';
import store from './store';

const setup = () => {
  return () => (
    <Provider store={store}>
      <AppConfigManager>
        <App />
        <SnackbarPortal />
      </AppConfigManager>
    </Provider>
  );
}

registerRootComponent(setup());