// @flow

import React, { Component } from 'react';
import { Alert, ActivityIndicator } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Card, FormLabel, FormInput, Text, Button } from 'react-native-elements';
import { Content, List, ListItem, View, Body, Right } from 'native-base';
import { searchThunk } from '../../redux/modules/search';
import { addMemberThunk as addMember } from '../../redux/modules/project';
import * as projectRoles from '../../enums/projectRoles';

import * as types from '../../enums/actionStatus';

type Props = {
  result: any,
  searchUser: Function,
  project: any,
  addMember: Function,
};

class SearchPage extends Component<Props, any> {
  onTextChangeEvent: Function;
  constructor(props) {
    super(props);
    this.state = { query: '' };
    this.onTextChangeEvent = this.onTextChangeEvent.bind(this);
  }

  onTextChangeEvent(val) {
    this.setState({ query: val });

    this.props.searchUser(val);
  }

  render() {
    return (
      <Content>
        <View>
          <Card>
            <FormLabel>Kullanıcı Adı</FormLabel>
            <FormInput
              placeholder="Aramak istediğiniz kullanıcının adını giriniz..."
              value={this.state.query || ''}
              onChangeText={this.onTextChangeEvent}
            />
            {this.props.result.status === types.LOADING && (
              <ActivityIndicator size="large" color="#0000ff" />
            )}
            {this.props.result.results.length === 0 &&
              this.props.result.status === types.LOADED && <Text> Kullanıcı bulunamadı. </Text>}
            <List>
              {this.props.result.results.map(user => (
                <ListItem key={user.id}>
                  <Body>
                    <Text>{user.userName}</Text>
                  </Body>
                  <Right>
                    {this.props.project.currentProject.members.filter(
                      member => member.user.id === user.id,
                    ).length === 0 && (
                      <Button
                        title="+"
                        onPress={() => {
                          this.props.addMember(
                            this.props.project.currentProject.id,
                            user.id,
                            projectRoles.PROJECT_MEMBER,
                          );
                        }}
                      />
                    )}
                  </Right>
                </ListItem>
              ))}
            </List>
          </Card>
        </View>
      </Content>
    );
  }
}

function mapStateToProps(state) {
  return {
    result: state.search,
    project: state.project,
    user: state.currentUser,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ searchUser: searchThunk, addMember }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchPage);
