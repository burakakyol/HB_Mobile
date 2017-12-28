// @flow
import { type Process, type ProcessUser } from '../../types/process';
import { type ReduxDispatch } from '../../types/redux';

import * as types from '../../enums/actionStatus';
import { ProcessMapper } from '../../mappers/process';
import { ProcessUserMapper } from '../../mappers/processMember';

// Actions
export const REQUEST = 'REQUEST';
export const FAILED = 'FAILED';
export const LOADING = 'LOADING';
export const GET_PROCESSES = 'GET_PROCESSES';
export const SET_CURRENT_PROCESS = 'SET_CURRENT_PROCESS';
export const CLEAR_PROCESSES = 'CLEAR_PROCESSES';

// Action Creator Types

export type ProcessRequestAction = {
  type: typeof REQUEST,
};
export type ProcessFailedAction = {
  type: typeof FAILED,
};

export type GetProcessesAction = {
  type: typeof GET_PROCESSES,
  processes: Array<Process>,
};

export type ClearProcessesAction = {
  type: typeof CLEAR_PROCESSES,
};

export type SetCurrentProcessAction = {
  type: typeof SET_CURRENT_PROCESS,
};

// Action Creators
const processRequest = (): ProcessRequestAction => ({
  type: REQUEST,
});

const processFailure = (error: any): ProcessFailedAction => ({
  type: FAILED,
  error,
});

export const getProcesses = (processes: Array<Process>): GetProcessesAction => ({
  type: GET_PROCESSES,
  processes,
});

export const setCurrentProcess = (process: Process): SetCurrentProcessAction => ({
  type: SET_CURRENT_PROCESS,
  process,
});

const clear = (): ClearProcessesAction => ({
  type: CLEAR_PROCESSES,
});

export type ProcessState = {
  currentProcess: any,
  processList: any,
  status: any,
  error?: any,
};

export type ProcessActions =
  | ProcessRequestAction
  | ProcessFailedAction
  | GetProcessesAction
  | SetCurrentProcessAction;

// Reducer

const defaultState = {
  processList: [],
  currentProcess: {},
  status: types.INIT,
};

export default function(state: ProcessState = defaultState, action: ProcessActions): ProcessState {
  switch (action.type) {
    case REQUEST:
      return { processList: [], currentProcess: {}, status: types.LOADING };

    case GET_PROCESSES:
      return {
        currentProcess: state.currentProcess,
        processList: action.processes,
        status: types.LOADED,
      };

    case SET_CURRENT_PROCESS:
      return {
        currentProcess: action.process,
        processList: state.processList,
        status: types.LOADED,
      };

    case FAILED:
      return {
        currentProcess: null,
        processList: [],
        status: types.FAILED,
        error: action.error,
      };

    default:
      return state;
  }
}

// thunk
export const getProcessesThunk = (projectId: number): Function => async (
  dispatch: ReduxDispatch,
): Promise<*> => {
  try {
    processRequest();
    // eslint-disable-next-line no-undef
    const response = await fetch(
      `https://murmuring-eyrie-77138.herokuapp.com/project/${projectId}/process/all/`,
      {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      },
    );

    const json = await response.json();
    console.log('processjson', json);
    const processes = ProcessMapper.fromAPIResponseMultiple(json.processes);
    console.log('processmap', processes);
    dispatch(getProcesses(processes));
  } catch (error) {
    dispatch(processFailure(error));
  }
};
