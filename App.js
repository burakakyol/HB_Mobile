// @flow
import React from 'react';
import { Provider } from 'react-redux';

import { StyleSheet, Text, View } from 'react-native';
import { createRootNavigator } from './src/router';
import store from './src/redux/configureStore';
import { init } from './src/nav';

class App extends React.Component {
  render() {
    const Layout = createRootNavigator();
    return (
      <Provider store={store}>
        <Layout
          ref={nav => {
            init(nav);
          }}
        />
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default App;
