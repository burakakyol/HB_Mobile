// @flow

import React, { Component } from 'react';
import { Image, ImageBackground } from 'react-native';
import { Container, Content, Item, Input, Button, Icon, View, Text } from 'native-base';
import styles from './styles';

import logo from '../../assets/img/logo.png';
import background from '../../assets/img/background.png';

export default class Login extends Component {
  render() {
    return (
      <Container>
        <View style={styles.container}>
          <Content>
            <ImageBackground source={background} style={styles.shadow}>
              <View style={styles.bg}>
                <Button style={styles.btn}>
                  <Text>Login</Text>
                </Button>
                <Text style={styles.txt}> or </Text>
                <Button style={styles.btn}>
                  <Text>Login with Facebook </Text>
                </Button>
              </View>
            </ImageBackground>
          </Content>
        </View>
      </Container>
    );
  }
}
