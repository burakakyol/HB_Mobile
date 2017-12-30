// @flow

import { combineReducers } from 'redux';

import userReducer, { type UserState, type UserActions } from './user';
import projectReducer, { type ProjectState, type ProjectActions } from './project';
import searchReducer, { type SearchState, type SearchActions } from './search';
import processReducer, { type ProcessState, type ProcessActions } from './process';
import taskReducer, { type TaskState, type TaskActions } from './task';

export type ReduxState = {
  currentUser: UserState,
  project: ProjectState,
  search: SearchState,
  process: ProcessState,
  task: TaskState,
};

export type ReduxActions =
  | UserActions
  | ProjectActions
  | SearchActions
  | ProcessActions
  | TaskActions;

export const rootReducer = combineReducers({
  currentUser: userReducer,
  project: projectReducer,
  search: searchReducer,
  process: processReducer,
  task: taskReducer,
});
