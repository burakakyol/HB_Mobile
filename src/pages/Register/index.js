// @flow
import React, { Component } from 'react';

import { View, Content } from 'native-base';
import { Card, Button, FormLabel, FormInput } from 'react-native-elements';

import styles from './style';

type Props = {
  navigation: any,
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
  }

  render() {
    const { username, email, name, surname, password, passwordConfirm } = this.state;
    return (
      <Content>
        <View style={styles.card}>
          <Card>
            <FormLabel>Kullanıcı Adı</FormLabel>
            <FormInput
              placeholder="Kullanıcı adı..."
              value={username || ''}
              onChangeText={val => this.setState({ username: val })}
            />
            <FormLabel>Email </FormLabel>
            <FormInput
              placeholder="Email adresi..."
              value={email || ''}
              onChangeText={val => this.setState({ email: val })}
            />
            <FormLabel>Ad </FormLabel>
            <FormInput
              placeholder="Adınız..."
              value={name || ''}
              onChangeText={val => this.setState({ name: val })}
            />
            <FormLabel>Soyad </FormLabel>
            <FormInput
              placeholder="Soyadınız..."
              value={surname || ''}
              onChangeText={val => this.setState({ surname: val })}
            />
            <FormLabel>Şifre</FormLabel>
            <FormInput
              secureTextEntry
              placeholder="Şifre.."
              value={password || ''}
              onChangeText={val => this.setState({ password: val })}
            />
            <FormLabel>Şifre Onay</FormLabel>
            <FormInput
              secureTextEntry
              placeholder="Şifrenizi onaylayınız..."
              value={passwordConfirm || ''}
              onChangeText={val => this.setState({ passwordConfirm: val })}
            />

            <Button title="Gönder" large />
          </Card>
        </View>
      </Content>
    );
  }
}

export default Register;
