// @flow
import { type User } from './user';
import {
  typeof PROJECT_MANAGER,
  typeof PROJECT_MEMBER,
  typeof PROJECT_OWNER,
} from '../enums/projectRoles';
import { type Process } from './process';

export type Project = {
  id: number,
  title: string,
  description: string,
  startDate: string,
  endDate: string,
  members: Array<ProjectUser>,
  processes: Array<Process>,
};

export type ProjectUser = {
  id: number,
  user: User,
  isActive: boolean,
  joiningDate: string,
  project: Project,
  role: PROJECT_MANAGER | PROJECT_MEMBER | PROJECT_OWNER,
};
