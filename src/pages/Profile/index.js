// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { View } from 'react-native';
import { Card, Button, Text } from 'react-native-elements';
import { NavigationActions } from 'react-navigation';

import { createRootNavigator } from '../../router';
import { logout } from '../../redux/modules/user';

type Props = {
  navigation: any,
  user: Object,
  project: Object,
  logoutUser: Function,
};

class Profile extends Component<Props, any> {
  constructor(props) {
    super(props);
    this.logoutAction = this.logoutAction.bind(this);
  }
  logoutAction() {
    this.props.logoutUser();
    const resetAction = NavigationActions.reset({
      index: 0,
      actions: [NavigationActions.navigate({ routeName: 'AnonymousRoute' })],
    });

    this.props.navigation.dispatch(resetAction);
  }

  render() {
    const { user, project } = this.props;
    console.log('Kullanıcı', user);
    console.log('Proje', project);
    return (
      <View style={{ paddingVertical: 20 }}>
        <Card title={user.user ? `${user.user.firstName} ${user.user.lastName}` : ''}>
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
          <Button backgroundColor="#03A9F4" title="SIGN OUT" onPress={this.logoutAction} />
        </Card>
      </View>
    );
  }
}
function mapStateToProps(state) {
  return {
    user: state.currentUser,
    project: state.project,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ logoutUser: logout }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
