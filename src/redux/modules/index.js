// @flow

import { combineReducers } from 'redux';

import userReducer, { type UserState, type UserActions } from './user';

export type ReduxState = {
  currentUser: UserState,
};

export type ReduxActions = UserActions;

export const rootReducer = combineReducers({
  currentUser: userReducer,
});
