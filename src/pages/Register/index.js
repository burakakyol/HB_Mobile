import React, { Component } from 'react';
import { View } from 'react-native';
import { Card, Button, FormLabel, FormInput } from 'react-native-elements';
import styles from './style';

const nav = ({ navigation }) => (
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
    </Card>
  </View>
);

export default nav;
