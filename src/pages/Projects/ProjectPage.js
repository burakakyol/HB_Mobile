// @flow

import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { View, ActivityIndicator, TouchableOpacity, Button } from 'react-native';
import { Card } from 'react-native-elements';
import { ListItem, Text, Separator, Container, Header, Content, Right } from 'native-base';
import { connect } from 'react-redux';
import { type Project } from '../../types/project';
import { type Process } from '../../types/process';
import {
  getProcessesThunk as getProcesses,
  clearProcesses,
  setCurrentProcess as setCurrent,
} from '../../redux/modules/process';
import {
  getProjectMembersThunk as getMembers,
  clearCurrentProject as clearProject,
} from '../../redux/modules/project';
import * as types from '../../enums/actionStatus';
import * as roleTypes from '../../enums/projectRoles';

type Props = {
  navigation: any,
  project: Project,
  process: Process,
  getProcesses: Function,
  getMembers: Function,
  clearProject: Function,
  clearProcesses: Function,
  setCurrent: Function,
  user: any,
};

class ProjectPage extends Component<Props, any> {
 
  static navigationOptions = ({ navigation }) => ({
    headerRight: <Button title="Kişi Ekle" onPress={() => navigation.navigate('SearchPage')} />,
  });
  constructor(props) {
    super(props);
    this.checkUserRole = this.checkUserRole.bind(this);
  }

  componentWillMount() {
    console.log('will mount');
    if (this.props.project.currentProject) {
      this.props.getProcesses(this.props.project.currentProject.id);
      this.props.getMembers(this.props.project.currentProject.id);
    }
  }
  checkUserRole() {
    const currentMember = this.props.project.currentProject.members.find(
      user => user.user.id === this.props.user.user.id,
    );

    return currentMember.role !== roleTypes.PROJECT_MEMBER;
  }
  componentWillUnmount() {
    console.log('will unmount');
    this.props.clearProject();
    this.props.clearProcesses();
  }
  render() {
    return (
      <Container>
        <Content>
          <Separator bordered>
            <Text>Proje Bilgileri</Text>
          </Separator>
          <ListItem>
            {this.props.project.currentProject && (
              <Text> {`Proje Adı:${this.props.project.currentProject.title}`}</Text>
            )}
          </ListItem>
          <ListItem>
            {this.props.project.currentProject && (
              <Text> {`Açıklama:${this.props.project.currentProject.description}`}</Text>
            )}
          </ListItem>

          <Separator bordered>
            <Text>Süreçler</Text>
          </Separator>
          {this.props.process.status === types.LOADING && (
            <ActivityIndicator size="large" color="#0000ff" />
          )}
          {this.props.process
            ? this.props.process.processList.map(process => (
                <ListItem key={process.id}>
                  <TouchableOpacity
                    transparent
                    onPress={() => {
                      this.props.navigation.navigate('ProcessPage');
                      this.props.setCurrent(process);
                    }}
                  >
                    <Text>{process.title}</Text>
                  </TouchableOpacity>
                </ListItem>
              ))
            : ''}
          <Separator bordered>
            <Text>Üyeler</Text>
          </Separator>
          {this.props.project.status === types.LOADING && (
            <ActivityIndicator size="large" color="#0000ff" />
          )}
          {this.props.project
            ? this.props.project.currentProject.members.map(user => (
                <ListItem key={user.id}>
                  <Text>{user.user.userName}-</Text>
                  <Text>{user.role === 0 ? 'Proje Kurucusu' : 'Proje Üyesi'}</Text>
                </ListItem>
              ))
            : ''}
        </Content>
      </Container>
    );
  }
}
function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    { getProcesses, getMembers, clearProject, clearProcesses, setCurrent },
    dispatch,
  );
}

function mapStateToProps(state) {
  return {
    project: state.project,
    process: state.process,
    user: state.currentUser,
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(ProjectPage);
