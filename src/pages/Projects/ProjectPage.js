// @flow

import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { View } from 'react-native';
import { Card, Button, Text } from 'react-native-elements';
import { connect } from 'react-redux';

type Props = {
  navigation: any,
};

class ProjectPage extends Component {
  render() {
    return <Text>Project Page</Text>;
  }
}

export default ProjectPage;
