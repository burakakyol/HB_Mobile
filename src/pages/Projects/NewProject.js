// @flow
import React, { Component } from 'react';
import { Alert, ActivityIndicator, DatePickerIOS } from 'react-native';
import { View, Content } from 'native-base';
import { Card, Button, FormLabel, FormInput, Text } from 'react-native-elements';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as types from '../../enums/actionStatus';
import { createProjectThunk as createProject } from '../../redux/modules/project';
import styles from './style';

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
class NewProject extends Component<Props, State> {
  onSubmitEvent: Function;
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      description: '',
    };
    this.onSubmitEvent = this.onSubmitEvent.bind(this);
  }

  onSubmitEvent() {
    console.log('asd', this.props.user);

    this.props.create(this.state.title, this.state.description, this.props.user.user.id);

    console.log('request-sonrası', this.props.project);
    Alert.alert('Proje başarıyla eklendi');
  }

  render() {
    return (
      <Content>
        <View style={styles.card}>
          <Card>
            <FormLabel>Proje Adı</FormLabel>
            <FormInput
              placeholder="Proje adı..."
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
  return bindActionCreators({ create: createProject }, dispatch);
}

function mapStateToProps(state) {
  return {
    user: state.currentUser,
    project: state.project,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(NewProject);
