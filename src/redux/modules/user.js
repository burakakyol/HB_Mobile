// @flow
import { create } from 'apisauce';
import API_URL from '../../config';
import { type User } from '../../types/user';
import { type ReduxDispatch } from '../../types/redux';
import * as types from '../../enums/actionStatus';
import { UserMapper } from '../../mappers/user';
import UserStorage from '../../services/userStorage';
// Actions
export const REQUEST = 'REQUEST';
export const FAILED = 'FAILED';
export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';
export const UPDATE = 'UPDATE';
export const REGISTER = 'REGISTER';

// Action Creator Types

export type RequestAction = {
  type: typeof REQUEST,
};
export type RegisterAction = {
  type: typeof REGISTER,
};

export type FailureAction = {
  type: typeof FAILED,
};

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
export const login = (user: User): LoginAction => ({
  type: LOGIN,
  user,
});

export const register = (message: string, status: string): RegisterAction => ({
  type: REGISTER,
  message,
  status,
});

const request = (): RequestAction => ({
  type: REQUEST,
});

const failure = (error: any): FailureAction => ({
  type: FAILED,
  error,
});

export const logout = (): LogoutAction => ({
  type: typeof LOGOUT,
});

export const update = (user: User): UpdateAction => ({
  type: typeof UPDATE,
  user,
});

export type UserState = {
  user: any,
  status: any,
  error?: any,
  results?: any,
};

export type UserActions =
  | RequestAction
  | LoginAction
  | LogoutAction
  | UpdateAction
  | FailureAction
  | RegisterAction;

// Reducer

const defaultState = { user: {}, status: types.INIT };

export default function(state: UserState = defaultState, action: UserActions): UserState {
  switch (action.type) {
    case REQUEST:
      return { user: {}, status: types.LOADING };

    case LOGIN:
      return { user: action.user, status: types.LOADED };

    case FAILED:
      return { user: state.user, status: types.FAILED, error: action.error };

    case LOGOUT:
      return defaultState;

    case UPDATE:
      return { user: action.user, status: types.LOADED };

    case REGISTER:
      return { user: null, status: action.status, message: action.message };

    default:
      return state;
  }
}

// Thunk

export const registerThunk = (
  username: string,
  email: string,
  name: string,
  surname: string,
  password: string,
): Function => async (dispatch: ReduxDispatch): Promise<*> => {
  dispatch(request());
  try {
    // eslint-disable-next-line no-undef
    const response = await fetch('https://murmuring-eyrie-77138.herokuapp.com/user/register/', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username,
        email,
        name,
        surname,
        password,
      }),
    });
    const json = await response.json();
    if (json.error) {
      dispatch(failure(json.error));
    } else {
      const message = json.message;
      const status = json.status;
      dispatch(register(message, status));
    }
  } catch (error) {
    dispatch(failure((error: error)));
  }
};

export const loginThunk = (username: string, password: string): Function => async (
  dispatch: ReduxDispatch,
): Promise<*> => {
  dispatch(request());
  try {
    // eslint-disable-next-line no-undef
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
    if (json.error) {
      dispatch(failure(json.error));
    } else {
      const user = json.user;
      const mapUser = UserMapper.fromAPIResponse(user);
      await UserStorage.save(mapUser);
      dispatch(login(mapUser));
    }
  } catch (err) {
    console.error(err);
    dispatch(failure(err));
  }
};
