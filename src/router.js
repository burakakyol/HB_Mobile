// @flow
import React from 'react';
import { Platform, StatusBar } from 'react-native';
import { StackNavigator, TabNavigator } from 'react-navigation';
import { FontAwesome } from 'react-native-vector-icons';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';

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

export const ProtectedRoute = TabNavigator(
  {
    Dashboard: {
      screen: Dashboard,
      navigationOptions: {
        tabBarLabel: 'Panel',
        tabBarIcon: ({ tintColor }) => <FontAwesome name="home" size={30} color={tintColor} />,
      },
    },
    Profile: {
      screen: Profile,
      navigationOptions: {
        tabBarLabel: 'Profil',
        tabBarIcon: ({ tintColor }) => <FontAwesome name="home" size={30} color={tintColor} />,
      },
    },
  },
  {
    tabBarOptions: {
      style: {
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
      },
    },
  },
);

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
      ProtectedRoute: {
        screen: ProtectedRoute,
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
