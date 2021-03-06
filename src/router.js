// @flow
import React from 'react';
import { Platform, StatusBar, Text, Button } from 'react-native';
import { StackNavigator, TabNavigator } from 'react-navigation';
import { FontAwesome } from 'react-native-vector-icons';
import Login from './pages/Login';
import Register from './pages/Register';

import Profile from './pages/Profile';
import ProjectList from './pages/Projects/ProjectList';
import NewProject from './pages/Projects/NewProject';
import ProjectPage from './pages/Projects/ProjectPage';
import SearchPage from './pages/Projects/SearchPage';

import ProcessPage from './pages/Process/ProcessPage';
import MemberAddPage from './pages/Process/MemberAddPage';
import NewProcess from './pages/Process/NewProcess';

import NewTask from './pages/Task/NewTask';

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

export const ProjectRoute = StackNavigator({
  ProjectList: {
    screen: ProjectList,
    navigationOptions: {
      title: 'Projelerim',
    },
  },
  NewProject: {
    screen: NewProject,
    navigationOptions: {
      title: 'Yeni Proje',
    },
  },
  ProjectPage: {
    screen: ProjectPage,
    navigationOptions: {
      title: 'Proje',
    },
  },
  SearchPage: {
    screen: SearchPage,
    navigationOptions: {
      title: 'Üye Ekle',
    },
  },
  ProcessPage: {
    screen: ProcessPage,
  },
  MemberAddPage: {
    screen: MemberAddPage,
  },
  NewProcess: {
    screen: NewProcess,
    navigationOptions: {
      title: 'Yeni Süreç',
    },
  },
  NewTask: {
    screen: NewTask,
    navigationOptions: {
      title: 'Yeni Görev',
    },
  },
});

export const ProtectedRoute = TabNavigator(
  {
    Dashboard: {
      screen: ProjectRoute,
      navigationOptions: {
        tabBarLabel: 'Panel',
        tabBarIcon: ({ tintColor }) => <FontAwesome name="home" size={30} color={tintColor} />,
      },
    },
    Profile: {
      screen: Profile,
      navigationOptions: {
        tabBarLabel: 'Profil',
        tabBarIcon: ({ tintColor }) => (
          <FontAwesome name="user-circle" size={30} color={tintColor} />
        ),
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
