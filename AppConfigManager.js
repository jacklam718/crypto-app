import React from 'react';
import { AppearanceProvider, useColorScheme } from 'react-native-appearance';
import ConfigProvider from 'react-native-base-components/src/helpers/ConfigProvider';
import { en, zh } from 'react-native-base-components/src/locale';

import { darkTheme, lightTheme } from './themes';

const themes = {
  dark: darkTheme,
  light: lightTheme,
};

const locales = {
  en,
  zh,
};

const initialState = {
  mode: 'dark',
  theme: darkTheme,
  locale: en,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'mode':
      return {
        ...state,
        mode: action.payload.mode,
        theme: themes[action.payload.mode],
      }
    case 'locale':
      return {
        ...state,
        locale: action.payload.locale,
      }
    default:
      return state;
  };
};

export const AppConfigContext = React.createContext();
export const useAppConfig = () => React.useContext(AppConfigContext);

// manage application configuration
// the manager is to used to manage the following things
// * app appearance (theme and delect colorScheme)
// * app locale
const AppConfigManager = ({ children }) => {
  const [config, dispatch] = React.useReducer(reducer, initialState);
  
  // observe colorScheme change
  const colorScheme = useColorScheme();
  React.useEffect(() => {
    dispatch({ type: 'mode', payload: { mode: colorScheme } });
  }, [colorScheme]);

  const switchMode = () => {
    const mode = config.mode === 'dark' ? 'light' : 'dark';
    dispatch({ type: 'mode', payload: { mode } });
  };

  const switchLocale = () => {
    const locale = config.locale === locales['en'] ? locales['zh'] : locales['en'];
    dispatch({ type: 'locale', payload: { locale } });
  };

  return (
    <AppearanceProvider>
      <AppConfigContext.Provider value={{ ...config, switchMode, switchLocale }}>
        <AppConfigContext.Consumer>
          {({ theme, locale }) => (
            <ConfigProvider config={{ theme, locale }}>
              {children}
            </ConfigProvider>
          )}
        </AppConfigContext.Consumer>
      </AppConfigContext.Provider>
    </AppearanceProvider>
  );
};

export default AppConfigManager;