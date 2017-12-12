// @flow
import React from 'react';
import { Platform, StatusBar } from 'react-native';
import { StackNavigator, TabNavigator } from 'react-navigation';

import Login from './pages/Login';
import Register from './pages/Register';

const headerStyle = {
  marginTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
};

export const AnonymousRoute = StackNavigator({
  Login: {
    screen: Login,
  },
  Register: {
    screen: Register,
    navigationOptions: {
      title: 'Kayıt Ol',
      headerStyle,
    },
  },
});

type Props = {
  signedIn?: boolean,
};

export const createRootNavigator = (signedIn = false) =>
  StackNavigator(
    {
      AnonymousRoute: {
        screen: AnonymousRoute,
        navigationOptions: {
          gesturesEnabled: false,
        },
      },
    },
    {
      headerMode: 'none',
      mode: 'modal',
      initialRouteName: 'AnonymousRoute',
    },
  );
