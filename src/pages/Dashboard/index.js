// @flow
import React, { Component } from 'react';

import { connect } from 'react-redux';

import { Card, Button, FormLabel, FormInput } from 'react-native-elements';
import { Container, Content, View, Text } from 'native-base';
import { type UserState } from '../../redux/modules/user';

type Props = {
  user: UserState,
};
class Dashboard extends Component<Props, any> {
  render() {
    const { user } = this.props;
    return (
      <Container>
        <View>
          <Content>{user && <FormLabel> {user.user.userName}</FormLabel>}</Content>
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
export default connect(mapStateToProps)(Dashboard);
