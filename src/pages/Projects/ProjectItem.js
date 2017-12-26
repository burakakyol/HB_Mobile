// @flow
import React, { Component } from 'react';
import { Container, Content, Card, CardItem, Icon, Text, Right, Button } from 'native-base';
import { type Project } from '../../types/project';
import { PROJECT_MANAGER, PROJECT_MEMBER, PROJECT_OWNER } from '../../enums/projectRoles';

type Props = {
  project: Project,
  navigation: any,
  currentProjectAction: Function,
};

const ProjectItem = ({ project, navigation, currentProjectAction, test }: Props) => (
  <CardItem>
    <Button
      transparent
      onPress={() => {
        console.log('basildi');
        navigation.navigate('ProjectPage');
        currentProjectAction(project);
        console.log(test);
      }}
    >
      <Icon active name="ios-archive" />
      <Text>{project ? project.title : ''}</Text>
    </Button>
  </CardItem>
);

export default ProjectItem;
