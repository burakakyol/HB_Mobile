// @flow

import React, { Component } from 'react';
import { Alert, ActivityIndicator } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Card, FormLabel, FormInput, Text, Button } from 'react-native-elements';
import { Content, List, ListItem, View, Body, Right } from 'native-base';
import { searchThunk } from '../../redux/modules/search';
import * as types from '../../enums/actionStatus';

type Props = {
  result: any,
  searchUser: Function,
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

    console.log('Prop result:', this.props.result);
    console.log('prop user', this.props.user);
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.result.status === 'LOADED') {
      console.log(nextProps.result);
    }
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
                    <Button title="+" />
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
    user: state.currentUser,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ searchUser: searchThunk }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchPage);
