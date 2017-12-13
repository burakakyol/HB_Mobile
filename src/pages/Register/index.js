// @flow
import React, { Component } from 'react';
import { Alert } from 'react-native';
import { View, Content } from 'native-base';
import { Card, Button, FormLabel, FormInput, Text } from 'react-native-elements';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { registerThunk as registerUser } from '../../redux/modules/user';
import styles from './style';

type Props = {
  navigation: any,
  register: Function,
};
type State = {
  username: string,
  email: string,
  name: string,
  surname: string,
  password: string,
  passwordConfirm: string,
};
class Register extends Component<Props, State> {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      email: '',
      name: '',
      surname: '',
      password: '',
      passwordConfirm: '',
    };
    this.validatePasswords = this.validatePasswords.bind(this);
    this.onSubmitEvent = this.onSubmitEvent.bind(this);
  }

  validatePasswords(pass, passConfirm) {
    return !!(pass === passConfirm && pass.length >= 8 && passConfirm.length >= 8);
  }
  onSubmitEvent() {
    Alert.alert(this.state.username);
    if (this.validatePasswords(this.state.password, this.state.passwordConfirm)) {
      this.props.register(
        this.state.username,
        this.state.email,
        this.state.name,
        this.state.surname,
        this.state.password,
      );

    
    } else {
      Alert.alert('Şifreler eşleşmiyor');
    }
  }

  render() {
    return (
      <Content>
        <View style={styles.card}>
          <Card>
            <FormLabel>Kullanıcı Adı</FormLabel>
            <FormInput
              placeholder="Kullanıcı adı..."
              value={this.state.username || ''}
              onChangeText={val => this.setState({ username: val })}
            />
            <FormLabel>Email </FormLabel>
            <FormInput
              placeholder="Email adresi..."
              value={this.state.email || ''}
              onChangeText={val => this.setState({ email: val })}
            />
            <FormLabel>Ad </FormLabel>
            <FormInput
              placeholder="Adınız..."
              value={this.state.name || ''}
              onChangeText={val => this.setState({ name: val })}
            />
            <FormLabel>Soyad </FormLabel>
            <FormInput
              placeholder="Soyadınız..."
              value={this.state.surname || ''}
              onChangeText={val => this.setState({ surname: val })}
            />
            <FormLabel>Şifre</FormLabel>
            <FormInput
              secureTextEntry
              placeholder="Şifre.."
              value={this.state.password || ''}
              onChangeText={val => this.setState({ password: val })}
            />
            <FormLabel>Şifre Onay</FormLabel>
            <FormInput
              secureTextEntry
              placeholder="Şifrenizi onaylayınız..."
              value={this.state.passwordConfirm || ''}
              onChangeText={val => this.setState({ passwordConfirm: val })}
            />
           {this.props.user.status && <Text> {this.props.user.message} </Text>}
            <Button title="Gönder" large onPress={this.onSubmitEvent} />
          </Card>
        </View>
      </Content>
    );
  }
}
function mapDispatchToProps(dispatch) {
  return bindActionCreators({ register: registerUser }, dispatch);
}

function mapStateToProps(state) {
  return {
    user: state.currentUser,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Register);
