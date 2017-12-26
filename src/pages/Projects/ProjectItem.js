import React, { Component } from 'react';
import { Container, Content, Card, CardItem, Icon, Text, Right, Button } from 'native-base';

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
