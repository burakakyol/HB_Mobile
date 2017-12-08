// @flow

import API_URL from '../../config';
import { type User } from '../../types/user';
import { type ReduxDispatch } from '../../types/redux';
import api from '../../utils/api';

// Actions

export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';
export const UPDATE = 'UPDATE';

// Action Creator Types

export type LoginAction = {
  type: typeof LOGIN,
  user: User,
};

export type LogoutAction = {
  type: typeof LOGOUT,
};

export type UpdateAction = {
  type: typeof UPDATE,
  user: User,
};

// Action Creators
const login = (user: User): LoginAction => ({
  type: LOGIN,
  user,
});

const logout = (): LogoutAction => ({
  type: typeof LOGOUT,
});

const update = (user: User): UpdateAction => ({
  type: typeof UPDATE,
  user,
});

export type UserState = User;

export type UserActions = LoginAction | LogoutAction | UpdateAction;

// Reducer

const defaultState = {};

export default function(state: UserState = defaultState, action: UserActions): UserState {
  switch (action.type) {
    case LOGIN:
      return action.user;

    case LOGOUT:
      return defaultState;

    case UPDATE:
      return action.user;

    default:
      return state;
  }
}

// Thunk

export const loginThunk = (username: string, password: string): Function => async (
  dispatch: ReduxDispatch,
): Promise<*> => {
  const data = { username, password };
  const response = await api.post('/user/login/', data);
  dispatch(login(response.user));
};
