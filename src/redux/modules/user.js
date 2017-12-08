// @flow

import API_URL from '../../config';
import { type User } from '../../types/user';
import * as status from '../enums/actionStatus';
// Actions

export const FETCH_USER_REQUEST = 'FETCH_USER_REQUEST';
export const FETCH_USER_SUCCESS = 'FETCH_USER_SUCCESS';
export const FETCH_USER_FAILURE = 'FETCH_USER_FAILURE';

// Action Creator Types

export type FetchUserRequestAction = {
  type: typeof FETCH_USER_REQUEST,
};

export type FetchUserSuccessAction = {
  type: typeof FETCH_USER_SUCCESS,
  user: User,
};

export type FetchUserFailureAction = {
  type: typeof FETCH_USER_FAILURE,
  error: any,
};

// Action Creators
const request = (): FetchUserRequestAction => ({
  type: FETCH_USER_REQUEST,
});

const success = (user: User): FetchUserSuccessAction => ({
  type: typeof FETCH_USER_SUCCESS,
  user,
});

const failure = (error: any): FetchUserFailureAction => ({
  type: typeof FETCH_USER_FAILURE,
  error,
});

export type UserState = {
  status: status.INIT | status.LOADING | status.LOADED | status.FAILED,
  user: Object,
  error: any,
};

export type UserActions = FetchUserRequestAction | FetchUserSuccessAction | FetchUserFailureAction;

// Reducer

const defaultState = {
  status: status.INIT,
  user: {},
  error: null,
};

export default function(state: UserState = defaultState, action: UserActions): UserState {
  switch (action.type) {
    case FETCH_USER_REQUEST:
      return { status: status.LOADING, user: {}, error: null };

    case FETCH_USER_SUCCESS:
      return { status: status.LOADED, user: action.user, error: null };

    case FETCH_USER_FAILURE:
      return { status: status.FAILED, user: {}, error: action.error };

    default:
      return state;
  }
}

// Thunk

export const login=(email:string,password:string):Function=>async(
    dispatch:ReduxDispatch
):Promise<*>=>{
    const user 
}