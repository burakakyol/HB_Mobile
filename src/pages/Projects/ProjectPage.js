// @flow

import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { View } from 'react-native';
import { Card, Button } from 'react-native-elements';
import { ListItem, Text, Separator, Container, Header, Content } from 'native-base';
import { connect } from 'react-redux';

type Props = {
  navigation: any,
};

class ProjectPage extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <Container>
        <Content>
          <Separator bordered>
            <Text>Proje Bilgileri</Text>
          </Separator>
          <ListItem>
            {this.props.project.currentProject && (
              <Text> {`Proje Adı:${this.props.project.currentProject.title}`}</Text>
            )}
          </ListItem>

          <Separator bordered>
            <Text>Süreçler</Text>
          </Separator>
          <ListItem>
            <Text>Örnek Süreç</Text>
          </ListItem>
        </Content>
      </Container>
    );
  }
}

function mapStateToProps(state) {
  return {
    project: state.project,
  };
}
export default connect(mapStateToProps)(ProjectPage);
