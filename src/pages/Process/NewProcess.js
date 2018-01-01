// @flow
import React, { Component } from 'react';
import { Alert, ActivityIndicator } from 'react-native';
import { View, Content } from 'native-base';
import { Card, Button, FormLabel, FormInput, Text } from 'react-native-elements';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as types from '../../enums/actionStatus';
import { createProcessThunk as createProcess } from '../../redux/modules/process';

type Props = {
  navigation: any,
  create: Function,
  project: any,
  user: any,
};
type State = {
  title: string,
  description: string,
};
class NewProcess extends Component<Props, State> {
  onSubmitEvent: Function;
  getProjectUser: Function;
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      description: '',
    };
    this.onSubmitEvent = this.onSubmitEvent.bind(this);
    this.getProjectUser = this.getProjectUser.bind(this);
  }

  onSubmitEvent() {
    const projectUser = this.getProjectUser();

    this.props.create(
      this.state.title,
      this.state.description,
      this.props.project.currentProject.id,
      projectUser.id,
    );

    Alert.alert('Süreç başarıyla eklendi');
  }

  getProjectUser() {
    return this.props.project.currentProject.members.find(
      member => member.user.id === this.props.user.user.id,
    );
  }

  render() {
    return (
      <Content>
        <View>
          <Card>
            <FormLabel>Süreç Adı</FormLabel>
            <FormInput
              placeholder="Süreç adı..."
              value={this.state.title || ''}
              onChangeText={val => this.setState({ title: val })}
            />
            <FormLabel>Açıklama </FormLabel>
            <FormInput
              placeholder="Açıklama..."
              value={this.state.description || ''}
              onChangeText={val => this.setState({ description: val })}
            />

            <Button title="Gönder" large onPress={this.onSubmitEvent} />
          </Card>
        </View>
      </Content>
    );
  }
}
function mapDispatchToProps(dispatch) {
  return bindActionCreators({ create: createProcess }, dispatch);
}

function mapStateToProps(state) {
  return {
    user: state.currentUser,
    project: state.project,
    process: state.process,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(NewProcess);
