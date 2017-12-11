// @flow

import React, { Component } from 'react';
import { create } from 'apisauce';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Image, ImageBackground, Alert } from 'react-native';
import { loginThunk } from '../../redux/modules/user';
import { Container, Content, Item, Input, Button, Icon, View, Text } from 'native-base';
import styles from './styles';

import UserState from '../../redux/modules/user';
import * as types from '../../enums/actionStatus';
import logo from '../../assets/img/logo.png';
import background from '../../assets/img/background.png';

type Props = {
  login: Function,
  user: UserState,
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

class Login extends Component<Props, any> {
  constructor(props) {
    super(props);
    this.state = { user: null };
  }

  componentWillMount() {}
  componentDidMount() {}

  render() {
    const api = create({
      baseURL: 'https://murmuring-eyrie-77138.herokuapp.com',
    });
    const asd = '';
    console.log('prop', this.props.user);
    return (
      <Container>
        <View style={styles.container}>
          <Content>
            <ImageBackground source={background} style={styles.shadow}>
              <View style={styles.bg}>
                <Button
                  style={styles.btn}
                  onPress={() => {
                    this.props.login('buraks9', 'ps1oqmaq');
                  }}
                >
                  <Text>Login</Text>
                </Button>
                <Text style={styles.txt}> or </Text>

                <Text>
                  prop:{this.props.user.status === types.LOADING
                    ? 'loading'
                    : this.props.user.user.userName}
                </Text>
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
