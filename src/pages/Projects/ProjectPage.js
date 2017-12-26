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
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <View>
        {this.props.project.currentProject && (
          <Text> {this.props.project.currentProject.title}</Text>
        )}
      </View>
    );
  }
}

function mapStateToProps(state) {
  return {
    project: state.project,
  };
}
export default connect(mapStateToProps)(ProjectPage);
