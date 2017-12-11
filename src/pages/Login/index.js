// @flow

import React, { Component } from 'react';
import { create } from 'apisauce';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Image, ImageBackground, Alert } from 'react-native';
import { loginThunk } from '../../redux/modules/user';
import { Container, Content, Item, Input, Button, Icon, View, Text } from 'native-base';
import styles from './styles';

import logo from '../../assets/img/logo.png';
import background from '../../assets/img/background.png';

type Props = {
  login: Function,
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
  async fetchUser() {
    try {
      const response = await fetch('https://murmuring-eyrie-77138.herokuapp.com/user/login/', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: 'buraks9',
          password: 'ps1oqmaq',
        }),
      });
      const json = await response.json();

      const user = json.user;

      this.setState({ user });
    } catch (err) {
      console.error(err);
    }
  }
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
                <Button
                  style={styles.btn}
                  onPress={() => {
                    this.fetchUser();
                    this.props.login('buraks9', 'ps1oqmaq');
                  }}
                >
                  <Text>Login</Text>
                </Button>
                <Text style={styles.txt}> or </Text>
                <Text>state:{this.state.user ? this.state.user.username : ''}</Text>
                <Text>props:{this.props.user ? this.props.user.userName : ''}</Text>
                <Button style={styles.btn}>
                  <Text>Login withh Facebook </Text>
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
