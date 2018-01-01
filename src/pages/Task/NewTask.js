// @flow
import React, { Component } from 'react';
import { Alert, ActivityIndicator, Picker } from 'react-native';
import { View, Content } from 'native-base';
import { Card, Button, FormLabel, FormInput, Text } from 'react-native-elements';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as types from '../../enums/actionStatus';
import { createTaskThunk as createTask } from '../../redux/modules/task';

type Props = {
  navigation: any,
  create: Function,
  process: any,
  user: any,
};
type State = {
  title: string,
  description: string,
  selectedUser: string,
};
class NewTask extends Component<Props, State> {
  onSubmitEvent: Function;
  getProjectUser: Function;
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      description: '',
      selectedUser: '',
    };
    this.onSubmitEvent = this.onSubmitEvent.bind(this);
    this.getProjectUser = this.getProjectUser.bind(this);
  }

  componentWillMount() {
    console.log('cp', this.props.process.currentProcess);
  }

  onSubmitEvent() {
    const projectUser = this.getProjectUser();
    console.log('param3', this.props.process.currentProcess.id);
    console.log('param4', projectUser);
    console.log('param5', this.state.selectedUser);
    this.props.create(
      this.state.title,
      this.state.description,
      this.props.process.currentProcess.id,
      projectUser.id,
      this.state.selectedUser,
    );
    Alert.alert('Görev başarıyla eklendi');
  }

  getProjectUser() {
    return this.props.process.currentProcess.members.find(
      member => member.user.user.id === this.props.user.user.id,
    );
  }

  render() {
    return (
      <Content>
        <View>
          <Card>
            <FormLabel>Görev Adı</FormLabel>
            <FormInput
              placeholder="Görev adı..."
              value={this.state.title || ''}
              onChangeText={val => this.setState({ title: val })}
            />
            <FormLabel>Açıklama </FormLabel>
            <FormInput
              placeholder="Açıklama..."
              value={this.state.description || ''}
              onChangeText={val => this.setState({ description: val })}
            />
            <FormLabel>Görevli Kişi </FormLabel>
            <Picker
              selectedValue={this.state.selectedUser}
              onValueChange={itemValue => this.setState({ selectedUser: itemValue })}
            >
              {this.props.process.currentProcess.members.map(member => (
                <Picker.Item key={member.id} label={member.user.user.userName} value={member.id} />
              ))}
            </Picker>

            <Button title="Gönder" large onPress={this.onSubmitEvent} />
          </Card>
        </View>
      </Content>
    );
  }
}
function mapDispatchToProps(dispatch) {
  return bindActionCreators({ create: createTask }, dispatch);
}

function mapStateToProps(state) {
  return {
    user: state.currentUser,
    project: state.project,
    process: state.process,
    task: state.task,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(NewTask);
