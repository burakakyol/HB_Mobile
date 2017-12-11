// @flow
import { create } from 'apisauce';
import API_URL from '../../config';
import { type User } from '../../types/user';
import { type ReduxDispatch } from '../../types/redux';

import UserMapper from '../../mappers/user';

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
export const loginTest = async (data: Object): Promise<*> => {
  const api = create({
    baseURL: 'https://murmuring-eyrie-77138.herokuapp.com',
  });
  const response = await api.post('/user/login/', data);

  if (!response.ok) {
    throw response.data;
  }

  return UserMapper.fromAPIResponse(response.data.user);
};

export const loginThunk = (username: string, password: string): Function => async (
  dispatch: ReduxDispatch,
): Promise<*> => {
  try {
    const response = await fetch('https://murmuring-eyrie-77138.herokuapp.com/user/login/', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username,
        password,
      }),
    });
    const json = await response.json();

    const user = json.user;
    const mapUser = {
      id: user.pk,
      userName: user.username,
      email: user.email,
      firstName: user.first_name || '',
      lastName: user.last_name || '',
      dateJoined: user.date_joined || '',
      isActive: user.is_active,
    };
    console.log('redux user', user);
    dispatch(login(mapUser));
  } catch (err) {
    console.error(err);
  }
};
