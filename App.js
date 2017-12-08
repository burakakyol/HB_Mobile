// @flow
import React from 'react';
import { Provider } from 'react-redux';

import { StyleSheet, Text, View } from 'react-native';
import Login from './src/pages/Login';
import store from './src/redux/configureStore';

export default class App extends React.Component {
  render() {
    return;
    <Provider store={store}>
      <Login />
    </Provider>;
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
