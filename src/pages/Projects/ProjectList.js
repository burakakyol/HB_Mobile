// @flow

import React, { Component } from 'react';
import { Container, Content, Card, CardItem, Icon, Text, Right } from 'native-base';
import { NavigationActions } from 'react-navigation';
import { StyleSheet, View } from 'react-native';
import ActionButton from 'react-native-action-button';

const styles = StyleSheet.create({
  actionButtonIcon: {
    fontSize: 20,
    height: 22,
    color: 'white',
  },
});

type Props = {
  navigation: any,
};
class ProjectList extends Component<Props, any> {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <Container>
        <View style={{ flexDirection: 'column', flex: 3 }}>
          <Content>
            <Card>
              <CardItem>
                <Icon active name="logo-googleplus" />
                <Text>Google Plus</Text>
                <Right>
                  <Icon name="arrow-forward" />
                </Right>
              </CardItem>
              <CardItem>
                <Icon active name="logo-googleplus" />
                <Text>Google Plus</Text>
                <Right>
                  <Icon name="arrow-forward" />
                </Right>
              </CardItem>
              <CardItem>
                <Icon active name="logo-googleplus" />
                <Text>Google Plus</Text>
                <Right>
                  <Icon name="arrow-forward" />
                </Right>
              </CardItem>
              <CardItem>
                <Icon active name="logo-googleplus" />
                <Text>Google Plus</Text>
                <Right>
                  <Icon name="arrow-forward" />
                </Right>
              </CardItem>
              <CardItem>
                <Icon active name="logo-googleplus" />
                <Text>Google Plus</Text>
                <Right>
                  <Icon name="arrow-forward" />
                </Right>
              </CardItem>
              <CardItem>
                <Icon active name="logo-googleplus" />
                <Text>Google Plus</Text>
                <Right>
                  <Icon name="arrow-forward" />
                </Right>
              </CardItem>
              <CardItem>
                <Icon active name="logo-googleplus" />
                <Text>Google Plus</Text>
                <Right>
                  <Icon name="arrow-forward" />
                </Right>
              </CardItem>
              <CardItem>
                <Icon active name="logo-googleplus" />
                <Text>Google Plus</Text>
                <Right>
                  <Icon name="arrow-forward" />
                </Right>
              </CardItem>
              <CardItem>
                <Icon active name="logo-googleplus" />
                <Text>Google Plus</Text>
                <Right>
                  <Icon name="arrow-forward" />
                </Right>
              </CardItem>
              <CardItem>
                <Icon active name="logo-googleplus" />
                <Text>Google Plus</Text>
                <Right>
                  <Icon name="arrow-forward" />
                </Right>
              </CardItem>
              <CardItem>
                <Icon active name="logo-googleplus" />
                <Text>Google Plus</Text>
                <Right>
                  <Icon name="arrow-forward" />
                </Right>
              </CardItem>
              <CardItem>
                <Icon active name="logo-googleplus" />
                <Text>Google Plus</Text>
                <Right>
                  <Icon name="arrow-forward" />
                </Right>
              </CardItem>
            </Card>
          </Content>
        </View>
        <View style={{ flexDirection: 'column', flex: 1 }}>
          <ActionButton
            position="right"
            buttonColor="rgba(231,76,60,1)"
            onPress={() => {
              this.props.navigation.navigate('NewProject');
            }}
          />
        </View>
      </Container>
    );
  }
}

export default ProjectList;
