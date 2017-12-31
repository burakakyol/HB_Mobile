// @flow

import React, { Component } from 'react';
import { Alert, ActivityIndicator } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Card, FormLabel, FormInput, Text, Button } from 'react-native-elements';
import { Content, List, ListItem, View, Body, Right } from 'native-base';

import { addProcessMemberThunk as addMember } from '../../redux/modules/process';
import * as processRoles from '../../enums/processRoles';

import * as types from '../../enums/actionStatus';

type Props = {
  project: any,
  addMember: Function,
};

class MemberAddPage extends Component<Props, any> {
  onTextChangeEvent: Function;
  constructor(props) {
    super(props);
    this.state = { query: '' };
  }

  render() {
    return (
      <Content>
        <View>
          <Card>
            <List>
              {this.props.project.currentProject.members.map(user => (
                <ListItem key={user.id}>
                  <Body>
                    <Text>{user.user.userName}</Text>
                  </Body>
                  <Right>
                    {this.props.process.currentProcess.members.filter(
                      member => member.user.id === user.id,
                    ).length === 0 && (
                      <Button
                        title="+"
                        onPress={() => {
                          this.props.addMember(
                            this.props.process.currentProcess.id,
                            user.id,
                            processRoles.PROCESS_MEMBER,
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
    process: state.process,
    user: state.currentUser,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ addMember }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(MemberAddPage);
