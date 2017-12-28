// @flow

import { combineReducers } from 'redux';

import userReducer, { type UserState, type UserActions } from './user';
import projectReducer, { type ProjectState, type ProjectActions } from './project';
import searchReducer, { type SearchState, type SearchActions } from './search';
import processReducer, { type ProcessState, type ProcessActions } from './process';

export type ReduxState = {
  currentUser: UserState,
  project: ProjectState,
  search: SearchState,
  process: ProcessState,
};

export type ReduxActions = UserActions | ProjectActions | SearchActions | ProcessActions;

export const rootReducer = combineReducers({
  currentUser: userReducer,
  project: projectReducer,
  search: searchReducer,
  process: processReducer,
});
