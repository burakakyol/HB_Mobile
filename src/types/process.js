// @flow
import { type ProjectUser } from './project';
import { typeof PROCESS_MEMBER, typeof PROCESS_MANAGER } from '../enums/processRoles';

export type Process = {
  id: number,
  title: string,
  description: string,
  startDate: string,
  endDate: string,
  isCompleted: boolean,
  isActive: boolean,
  members: Array<ProcessUser>,
};

export type ProcessUser = {
  id: number,
  user: ProjectUser,
  process: Process,
  isActive: boolean,
  role: PROCESS_MEMBER | PROCESS_MANAGER,
};
