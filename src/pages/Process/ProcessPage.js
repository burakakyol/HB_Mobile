// @flow

import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { View, Button, ActivityIndicator } from 'react-native';
import { Card } from 'react-native-elements';
import { ListItem, Text, Separator, Container, Header, Content } from 'native-base';
import { getProcessMembersThunk as getMembers } from '../../redux/modules/process';
import * as types from '../../enums/actionStatus';

type Props = {
  navigation: any,
  process: any,
  getMembers: Function,
};

class ProcessPage extends Component<Props, any> {
  static navigationOptions = ({ navigation }) => ({
    headerRight: <Button title="Kişi Ekle" onPress={() => navigation.navigate('SearchPage')} />,
  });
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.props.getMembers(this.props.process.currentProcess.id);
  }
  componentDidMount() {
    console.log(this.props.process);
  }
  render() {
    return (
      <Container>
        <Content>
          <Separator bordered>
            <Text>Süreç Bilgileri</Text>
          </Separator>
          <ListItem>
            {this.props.process.currentProcess && (
              <Text> {`Süreç  Adı:${this.props.process.currentProcess.title}`}</Text>
            )}
          </ListItem>
          <ListItem>
            {this.props.process.currentProcess && (
              <Text> {`Açıklama:${this.props.process.currentProcess.description}`}</Text>
            )}
          </ListItem>
          <Separator bordered>
            <Text>Görevler</Text>
          </Separator>

          <Separator bordered>
            <Text>Üyeler</Text>
          </Separator>

          {this.props.process.status === types.LOADING && (
            <ActivityIndicator size="large" color="#0000ff" />
          )}
          {this.props.process
            ? this.props.process.currentProcess.members.map(data => (
                <ListItem key={data.id}>
                  <Text>{data.user.user.userName}</Text>
                </ListItem>
              ))
            : ''}
        </Content>
      </Container>
    );
  }
}

function mapStateToProps(state) {
  return {
    process: state.process,
  };
}
function mapDispatchToProps(dispatch) {
  return bindActionCreators({ getMembers }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ProcessPage);