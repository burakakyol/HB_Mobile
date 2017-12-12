// @flow

import React, { Component } from 'react';
import { create } from 'apisauce';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { Image, ImageBackground, Alert, TextInput, ActivityIndicator } from 'react-native';
import { FormLabel, FormInput } from 'react-native-elements';
import {} from 'react-navigation';
import { loginThunk } from '../../redux/modules/user';
import { Container, Content, Button, View, Text } from 'native-base';
import styles from './styles';

import UserState from '../../redux/modules/user';
import * as types from '../../enums/actionStatus';
import logo from '../../assets/img/logo.png';
import background from '../../assets/img/background.png';
import { User } from '../../types/user';

type Props = {
  login: Function,
  user: UserState,
  navigation: any,
};
type State = {
  txtUserName: string,
  txtPassword: string,
};
const loginTest = async (data: Object): Promise<*> => {
  const api = create({
    baseURL: 'https://murmuring-eyrie-77138.herokuapp.com',
  });
  const response = await api.post('/user/login/', data);

  if (!response.ok) {
    throw response.data;
  }

  return response.data.user;
};

class Login extends Component<Props, State> {
  constructor(props) {
    super(props);
    this.state = { txtUserName: '', txtPassword: '' };
  }

  componentWillMount() {}
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
                />
                <FormLabel> Şifre </FormLabel>
                <FormInput
                  style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
                  onChangeText={text => this.setState({ txtPassword: text })}
                  value={this.state.txtPassword}
                  secureTextEntry
                />
                <Button
                  style={styles.btn}
                  onPress={() => {
                    this.props.login(this.state.txtUserName, this.state.txtPassword);
                  }}
                >
                  <Text>Login</Text>
                </Button>
                <Button
                  style={styles.btn}
                  onPress={() => {
                    this.props.navigation.navigate('Register');
                  }}
                >
                  <Text> Kayıt Ol </Text>
                </Button>
                <Text style={styles.txt}> or </Text>
                {this.props.user.status === types.FAILED && (
                  <Text>Hata!{this.props.user.error} </Text>
                )}
                {this.props.user.status === types.LOADED && (
                  <Text>Hoşgeldin {this.props.user.user.userName} </Text>
                )}

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
function mapStateToProps(state) {
  return {
    user: state.currentUser,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ login: loginThunk }, dispatch);
}
export default connect(mapStateToProps, mapDispatchToProps)(Login);
