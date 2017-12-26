// @flow

import { combineReducers } from 'redux';

import userReducer, { type UserState, type UserActions } from './user';
import projectReducer, { type ProjectState, type ProjectActions } from './project';

export type ReduxState = {
  currentUser: UserState,
  project: ProjectState,
};

export type ReduxActions = UserActions | ProjectActions;

export const rootReducer = combineReducers({
  currentUser: userReducer,
  project: projectReducer,
});
