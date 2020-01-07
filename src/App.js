import React from 'react';
import { View } from 'react-native';
import { Header } from 'react-native-base-components/src/header';
import { AppConfigContext } from './AppConfigManager';
import SymbolList from './components/SymbolList';

class App extends React.Component {
  render() {
    return (
      <AppConfigContext.Consumer>
        {({ theme }) => (
          <View style={{ backgroundColor: theme.colors.background }}>
            <Header
              title="Crypto"
              overrides={{
                Root: { style: { position: 'relative' } },
                Content: { style: { paddingHorizontal: 24 } },
                TitleText: { style: { fontSize: 30 } },
                LeftItem: { component: () => null }
              }}
            />
            <SymbolList />
          </View>
        )}
      </AppConfigContext.Consumer>
    );
  }
}

export default App;