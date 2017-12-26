// @flow
import React, { Component } from 'react';

import { connect } from 'react-redux';

import { Card, Button, FormLabel, FormInput } from 'react-native-elements';
import { Container, Header, Tab, Tabs, TabHeading, Icon, Text, ScrollableTab } from 'native-base';
import { type UserState } from '../../redux/modules/user';
import ProjectList from '../Projects/ProjectList';
import Profile from '../Profile';
import NewProject from '../Projects/NewProject';

type Props = {
  user: UserState,
  navigation: any,
};
class Projects extends Component<Props, any> {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <Container>
        <Header hasTabs />
        <Tabs renderTabBar={() => <ScrollableTab />}>
          <Tab heading="Projeler">
            <ProjectList navigation={this.props.navigation} />
          </Tab>
          <Tab heading="Profil">
            <Profile />
          </Tab>
          <Tab heading="Tab3">
            <NewProject />
          </Tab>
        </Tabs>
      </Container>
    );
  }
}

function mapStateToProps(state) {
  return {
    user: state.currentUser,
  };
}
export default connect(mapStateToProps)(Projects);
