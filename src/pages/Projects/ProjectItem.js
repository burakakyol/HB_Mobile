import React, { Component } from 'react';
import { Container, Content, Card, CardItem, Icon, Text, Right, Button } from 'native-base';

import { PROJECT_MANAGER, PROJECT_MEMBER, PROJECT_OWNER } from '../../enums/projectRoles';

const ProjectItem = ({ project }) => (
  <CardItem>
    <Button
      transparent
      onPress={() => {
        console.log('basildi');
      }}
    >
      <Icon active name="ios-archive" />
      <Text>{project ? project.title : ''}</Text>
    </Button>
  </CardItem>
);

export default ProjectItem;
