// @flow
import React from 'react';
import { Provider } from 'react-redux';

import { StyleSheet, Text, View } from 'react-native';
import { createRootNavigator } from './src/router';
import Login from './src/pages/Login';
import store from './src/redux/configureStore';

class App extends React.Component {
  render() {
    const Layout = createRootNavigator();
    return (
      <Provider store={store}>
        <Layout />
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
