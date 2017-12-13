import React, { Component } from 'react';

import { View } from 'native-base';
import { Card, Button, FormLabel, FormInput } from 'react-native-elements';

import styles from './style';

type Props = {
  navigation: any,
};

class Register extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <View style={styles.card}>
        <Card>
          <FormLabel>Kullanıcı Adı</FormLabel>
          <FormInput placeholder="Kullanıcı adı..." />
          <FormLabel>Email </FormLabel>
          <FormInput placeholder="Email adresi..." />
          <FormLabel>Şifre</FormLabel>
          <FormInput secureTextEntry placeholder="Şifre.." />
          <FormLabel>Şifre Onay</FormLabel>
          <FormInput secureTextEntry placeholder="Şifrenizi onaylayınız..." />

          <Button title="Gönder" large />
        </Card>
      </View>
    );
  }
}

export default Register;
