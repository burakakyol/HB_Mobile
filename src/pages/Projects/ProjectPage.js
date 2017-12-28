// @flow

import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { View, Button } from 'react-native';
import { Card } from 'react-native-elements';
import { ListItem, Text, Separator, Container, Header, Content } from 'native-base';
import { connect } from 'react-redux';
import { type Project } from '../../types/project';

type Props = {
  navigation: any,
  project: Project,
};

class ProjectPage extends Component<Props, any> {
  static navigationOptions = ({ navigation }) => ({
    headerRight: <Button title="Kişi Ekle" onPress={() => navigation.navigate('SearchPage')} />,
  });
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
          <ListItem>
            {this.props.project.currentProject && (
              <Text> {`Açıklama:${this.props.project.currentProject.description}`}</Text>
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
