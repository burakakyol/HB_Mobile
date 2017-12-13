// @flow

import React, { Component } from 'react';
import { create } from 'apisauce';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { Image, ImageBackground, Alert, TextInput, ActivityIndicator } from 'react-native';
import { FormLabel, FormInput, Button } from 'react-native-elements';

import { loginThunk, login, type UserState } from '../../redux/modules/user';
import { Container, Content, View, Text } from 'native-base';
import styles from './styles';
import UserStorage from '../../services/userStorage';

import * as types from '../../enums/actionStatus';
import logo from '../../assets/img/logo.png';
import background from '../../assets/img/background.png';
import { type User } from '../../types/user';

type Props = {
  login: Function,
  user: UserState,
  navigation: any,
};
type State = {
  txtUserName: string,
  txtPassword: string,
};

class Login extends Component<Props, State> {
  constructor(props) {
    super(props);
    this.state = { txtUserName: '', txtPassword: '' };
  }

  componentWillMount() {
    const user = this.getUserFromStorage().done();
    console.log(user);
    if (user) {
      this.props.login(user);
      Alert.alert(user.userName);
    }
  }

  async getUserFromStorage() {
    const userFromStorage = await UserStorage.get();
    return userFromStorage;
  }

  componentDidMount() {}

  render() {
    const api = create({
      baseURL: 'https://murmuring-eyrie-77138.herokuapp.com',
    });
    const asd = '';

    return (
      <Container>
        <View style={styles.container}>
          <Content>
            <ImageBackground source={background} style={styles.shadow}>
              <View style={styles.bg}>
                {this.props.user.status === types.LOADING && (
                  <ActivityIndicator size="large" color="#0000ff" />
                )}
                <FormLabel> Kullanıcı Adı </FormLabel>
                <FormInput
                  style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
                  onChangeText={text => this.setState({ txtUserName: text })}
                  value={this.state.txtUserName}
                  placeholder="Kullanıcı adı..."
                />
                <FormLabel> Şifre </FormLabel>
                <FormInput
                  style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
                  onChangeText={text => this.setState({ txtPassword: text })}
                  value={this.state.txtPassword}
                  secureTextEntry
                  placeholder="Şifre..."
                />
                <Button
                  style={styles.btn}
                  title="Giriş Yap"
                  large
                  onPress={() => {
                    this.props.login(this.state.txtUserName, this.state.txtPassword);
                  }}
                />
                <Text style={{ textAlign: 'center', marginTop: 7 }}>henüz üye olmadıysanız</Text>
                <Button
                  style={styles.btn}
                  title="Kayıt ol"
                  onPress={() => {
                    this.props.navigation.navigate('Register');
                  }}
                />

                {this.props.user.status === types.FAILED && (
                  <Text>Hata!{this.props.user.error} </Text>
                )}
                {this.props.user.status === types.LOADED && (
                  <Text>Hoşgeldin {this.props.user.user.userName} </Text>
                )}
              </View>
            </ImageBackground>
          </Content>
        </View>
      </Container>
    );
  }
}
function mapStateToProps(state) {
  return {
    user: state.currentUser,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ login: loginThunk, loginToState: login }, dispatch);
}
export default connect(mapStateToProps, mapDispatchToProps)(Login);
