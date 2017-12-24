// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View } from 'react-native';
import { Card, Button, Text } from 'react-native-elements';

type Props = {
  navigation: any,
  user: Object,
};

class Profile extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { user } = this.props;
    console.log(user);
    return (
      <View style={{ paddingVertical: 20 }}>
        <Card title={user ? `${user.user.firstName} ${user.user.lastName}` : ''}>
          <View
            style={{
              backgroundColor: '#bcbec1',
              alignItems: 'center',
              justifyContent: 'center',
              width: 80,
              height: 80,
              borderRadius: 40,
              alignSelf: 'center',
              marginBottom: 20,
            }}
          >
            <Text style={{ color: 'white', fontSize: 28 }}>{`${user.user.firstName.charAt(
              0,
            )}${user.user.lastName.charAt(0)}`}</Text>
          </View>
          <Button backgroundColor="#03A9F4" title="SIGN OUT" />
        </Card>
      </View>
    );
  }
}
function mapStateToProps(state) {
  return {
    user: state.currentUser,
  };
}

export default connect(mapStateToProps)(Profile);
