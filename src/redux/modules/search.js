// @flow
import { type User } from '../../types/user';
import { type ReduxDispatch } from '../../types/redux';
import * as types from '../../enums/actionStatus';
import { UserMapper } from '../../mappers/user';

// Actions
export const REQUEST_SEARCH = 'REQUEST_SEARCH';
export const FAILED_SEARCH = 'FAILED_SEARCH';
export const SEARCH = 'SEARCH';
export const CLEAR = 'CLEAR';

// Action Creator Types

export type RequestAction = {
  type: typeof REQUEST_SEARCH,
};

export type FailureAction = {
  type: typeof FAILED_SEARCH,
};

export type SearchAction = {
  type: typeof SEARCH,
  users: Array<User>,
};

export type ClearAction = {
  type: typeof CLEAR,
};

// Action Creators
const searchRequest = (): RequestAction => ({
  type: REQUEST_SEARCH,
});

const searchFailure = (error: any): FailureAction => ({
  type: FAILED_SEARCH,
  error,
});

export const search = (users: Array<User>): SearchAction => ({
  type: SEARCH,
  users,
});

export const clear = (): ClearAction => ({
  type: CLEAR,
});

export type SearchActions = RequestAction | FailureAction | SearchAction;

export type SearchState = {
  status: any,
  error: any,
  results: any,
};

// reducer
const defaultState = { results: [], status: types.INIT, error: null };

export default function(state: SearchState = defaultState, action: SearchActions): SearchState {
  switch (action.type) {
    case REQUEST_SEARCH:
      return { results: state.results, status: types.LOADING, error: null };

    case FAILED_SEARCH:
      return {
        results: state.results,
        error: action.error,
        status: types.FAILED,
      };

    case CLEAR:
      return {
        results: [],
        error: state.error,
        status: types.LOADED,
      };
    case SEARCH:
      return { results: action.users, error: null, status: types.LOADED };

    default:
      return state;
  }
}

export const searchThunk = (query: string): Function => async (
  dispatch: ReduxDispatch,
): Promise<*> => {
  dispatch(searchRequest());
  try {
    if (query.length === 0) {
      dispatch(clear());
    } else {
      // eslint-disable-next-line no-undef
      const response = await fetch('https://murmuring-eyrie-77138.herokuapp.com/user/search/', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query,
        }),
      });
      const json = await response.json();
      const users = UserMapper.fromAPIResponseMultiple(json.users);

      dispatch(search(users));
    }
  } catch (error) {
    dispatch(searchFailure(error));
  }
};
