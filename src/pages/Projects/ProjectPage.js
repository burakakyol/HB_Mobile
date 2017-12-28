// @flow

import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { View, Button, ActivityIndicator } from 'react-native';
import { Card } from 'react-native-elements';
import { ListItem, Text, Separator, Container, Header, Content } from 'native-base';
import { connect } from 'react-redux';
import { type Project } from '../../types/project';
import { type Process } from '../../types/process';
import { getProcessesThunk as getProcesses } from '../../redux/modules/process';
import * as types from '../../enums/actionStatus';

type Props = {
  navigation: any,
  project: Project,
  process: Process,
  getProcesses: Function,
};

class ProjectPage extends Component<Props, any> {
  static navigationOptions = ({ navigation }) => ({
    headerRight: <Button title="Kişi Ekle" onPress={() => navigation.navigate('SearchPage')} />,
  });
  constructor(props) {
    super(props);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.project.currentProject) {
      this.props.getProcesses(nextProps.project.currentProject.id);
    }
  }
  componentDidMount() {
    this.props.getProcesses(4);
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
                  <Text>{process.title}</Text>
                </ListItem>
              ))
            : ''}
        </Content>
      </Container>
    );
  }
}
function mapDispatchToProps(dispatch) {
  return bindActionCreators({ getProcesses }, dispatch);
}

function mapStateToProps(state) {
  return {
    project: state.project,
    process: state.process,
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(ProjectPage);
