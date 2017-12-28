// @flow

import { combineReducers } from 'redux';

import userReducer, { type UserState, type UserActions } from './user';
import projectReducer, { type ProjectState, type ProjectActions } from './project';
import searchReducer, { type SearchState, type SearchActions } from './search';

export type ReduxState = {
  currentUser: UserState,
  project: ProjectState,
  search: SearchState,
};

export type ReduxActions = UserActions | ProjectActions | SearchActions;

export const rootReducer = combineReducers({
  currentUser: userReducer,
  project: projectReducer,
  search: searchReducer,
});
