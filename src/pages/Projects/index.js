// @flow
import React, { Component } from 'react';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Card, Button, FormLabel, FormInput } from 'react-native-elements';
import { Container, Header, Tab, Tabs, TabHeading, Icon, Text, ScrollableTab } from 'native-base';
import { type UserState } from '../../redux/modules/user';
import { getProjectsThunk } from '../../redux/modules/project';
import ProjectList from '../Projects/ProjectList';
import Profile from '../Profile';
import NewProject from '../Projects/NewProject';

type Props = {
  user: UserState,
  navigation: any,
  project: any,
  getProjects: Function,
};
class Projects extends Component<Props, any> {
  constructor(props) {
    super(props);
  }
  componentWillMount() {
    this.props.getProjects(this.props.user.user.id);
  }

  componentDidMount() {}
  render() {
    return (
      <Container>
        <Header hasTabs />
        <Tabs renderTabBar={() => <ScrollableTab />}>
          <Tab heading="Projeler">
            <ProjectList navigation={this.props.navigation} project={this.props.project} />
          </Tab>
          <Tab heading="Profil">
            <Profile navigation={this.props.navigation} />
          </Tab>
          <Tab heading="Tab3">
            <NewProject />
          </Tab>
        </Tabs>
      </Container>
    );
  }
}

export default Projects;
