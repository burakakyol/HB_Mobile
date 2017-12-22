// @flow
import { type ProcessUser } from './process';

export type Task = {
  id: number,
  title: string,
  description: string,
  isActive: true,
  isCompleted: true,
  progress: number,
  startDate: string,
  manager: ProcessUser,
  member: TaskUser,
};

export type TaskUser = {
  id: number,
  member: ProcessUser,
};
