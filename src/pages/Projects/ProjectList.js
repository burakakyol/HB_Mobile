// @flow

import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Container, Content, Card, CardItem, Icon, Text, Right } from 'native-base';
import { NavigationActions } from 'react-navigation';
import { StyleSheet, View, ActivityIndicator, Button } from 'react-native';
import ActionButton from 'react-native-action-button';
import * as types from '../../enums/actionStatus';
import { getProjectsThunk } from '../../redux/modules/project';
import ProjectItem from './ProjectItem';

const styles = StyleSheet.create({
  actionButtonIcon: {
    fontSize: 20,
    height: 22,
    color: 'white',
  },
});

type Props = {
  navigation: any,
  project: any,
  user: any,
  getProjects: Function,
};
class ProjectList extends Component<Props, any> {
  static navigationOptions = ({ navigation }) => ({
    headerRight: <Button title="Ekle" onPress={() => navigation.navigate('NewProject')} />,
  });

  constructor(props) {
    super(props);
  }
  navigateNewProject() {
    this.props.navigation.navigate('NewProject');
  }

  componentWillMount() {
    this.props.getProjects(this.props.user.user.id);
  }

  componentDidMount() {
    this.props.navigation.setParams({
      navigateNewProject: this.navigateNewProject,
    });
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.project.projects.length === this.props.project.projects.length) {
      this.props.getProjects(this.props.user.user.id);
    }
  }
  render() {
    return (
      <Container>
        <View style={{ flexDirection: 'column', flex: 3 }}>
          <Content>
            {this.props.project.status === types.LOADING && (
              <ActivityIndicator size="large" color="#0000ff" />
            )}
            <Card>
              {this.props.project.projects.map(project => (
                <ProjectItem key={project.id} project={project.project} />
              ))}
            </Card>
          </Content>
        </View>
        <View style={{ flexDirection: 'column', flex: 0 }}>
          <ActionButton
            position="right"
            buttonColor="rgba(231,76,60,1)"
            onPress={() => {
              this.props.navigation.navigate('NewProject');
            }}
          />
        </View>
      </Container>
    );
  }
}
function mapDispatchToProps(dispatch) {
  return bindActionCreators({ getProjects: getProjectsThunk }, dispatch);
}
function mapStateToProps(state) {
  return {
    user: state.currentUser,
    project: state.project,
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(ProjectList);
