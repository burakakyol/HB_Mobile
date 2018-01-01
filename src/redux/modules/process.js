// @flow
import { type Process, type ProcessUser } from '../../types/process';
import { type ReduxDispatch } from '../../types/redux';

import * as types from '../../enums/actionStatus';
import { ProcessMapper } from '../../mappers/process';
import { ProcessUserMapper } from '../../mappers/processMember';

// Actions
export const PROCESS_REQUEST = 'PROCESS_REQUEST';
export const PROCESS_FAILED = 'PROCESS_FAILED';

export const CREATE_PROCESS = 'CREATE_PROCESS';
export const GET_PROCESSES = 'GET_PROCESSES';
export const SET_CURRENT_PROCESS = 'SET_CURRENT_PROCESS';
export const CLEAR_PROCESSES = 'CLEAR_PROCESSES';
export const GET_PROCESS_MEMBERS = 'GET_PROCESS_MEMBERS';
export const ADD_PROCESS_MEMBER = 'ADD_PROCESS_MEMBER';

// Action Creator Types

export type ProcessRequestAction = {
  type: typeof PROCESS_REQUEST,
};
export type ProcessFailedAction = {
  type: typeof PROCESS_FAILED,
};

export type GetProcessesAction = {
  type: typeof GET_PROCESSES,
  processes: Array<Process>,
};
export type CreateProcessAction = {
  type: typeof CREATE_PROCESS,
  process: Process,
};
export type ClearProcessesAction = {
  type: typeof CLEAR_PROCESSES,
};

export type GetProcessMembersAction = {
  type: typeof GET_PROCESS_MEMBERS,
  members: Array<ProcessUser>,
};

export type SetCurrentProcessAction = {
  type: typeof SET_CURRENT_PROCESS,
};

export type AddProcessMemberAction = {
  type: typeof ADD_PROCESS_MEMBER,
  message: any,
  status: any,
};

// Action Creators
const processRequest = (): ProcessRequestAction => ({
  type: PROCESS_REQUEST,
});

const processFailure = (error: any): ProcessFailedAction => ({
  type: PROCESS_FAILED,
  error,
});

const createProcess = (process: Process, status: any, message: Any): CreateProcessAction => ({
  type: CREATE_PROCESS,
  process,
  status,
  message,
});
export const getProcesses = (processes: Array<Process>): GetProcessesAction => ({
  type: GET_PROCESSES,
  processes,
});

export const getProcessMembers = (members: Array<ProcessUser>): GetProcessMembersAction => ({
  type: GET_PROCESS_MEMBERS,
  members,
});

export const setCurrentProcess = (process: Process): SetCurrentProcessAction => ({
  type: SET_CURRENT_PROCESS,
  process,
});

export const addProcessMember = (status: any, message: any): AddProcessMemberAction => ({
  type: ADD_PROCESS_MEMBER,
  status,
  message,
});

export const clearProcesses = (): ClearProcessesAction => ({
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
  | SetCurrentProcessAction
  | ClearProcessesAction
  | GetProcessMembersAction
  | AddProcessMemberAction
  | CreateProcessAction;

// Reducer

const defaultState = {
  processList: [],
  currentProcess: {},
  status: types.INIT,
};

export default function(state: ProcessState = defaultState, action: ProcessActions): ProcessState {
  switch (action.type) {
    case PROCESS_REQUEST:
      return { ...state, status: types.LOADING };

    case GET_PROCESSES:
      return {
        currentProcess: state.currentProcess,
        processList: action.processes,
        status: types.LOADED,
      };

    case CREATE_PROCESS:
      return {
        ...state,
        status: action.status,
        message: action.message,
      };
    case ADD_PROCESS_MEMBER:
      return {
        ...state,
        status: action.status,
        message: action.message,
      };
    case SET_CURRENT_PROCESS:
      return {
        currentProcess: action.process,
        processList: state.processList,
        status: types.LOADED,
      };
    case CLEAR_PROCESSES:
      return defaultState;
    case GET_PROCESS_MEMBERS:
      return {
        ...state,
        status: types.LOADED,
        currentProcess: { ...state.currentProcess, members: action.members },
      };
    case PROCESS_FAILED:
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

export const addProcessMemberThunk = (
  processId: number,
  projectUserId: number,
  role: number,
): Function => async (dispatch: ReduxDispatch): Promise<*> => {
  try {
    processRequest();
    // eslint-disable-next-line no-undef
    const response = await fetch(
      `https://murmuring-eyrie-77138.herokuapp.com/process/${processId}/members/add/`,
      {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user_id: projectUserId,
          role,
        }),
      },
    );
    const json = await response.json();
    dispatch(addProcessMember(json.status, json.message));
  } catch (error) {
    dispatch(processFailure(error));
  }
};

export const getProcessMembersThunk = (processId: number): Function => async (
  dispatch: ReduxDispatch,
): Promise<*> => {
  try {
    dispatch(processRequest());
    // eslint-disable-next-line no-undef
    const response = await fetch(
      `https://murmuring-eyrie-77138.herokuapp.com/process/${processId}/members/`,
      {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      },
    );

    const json = await response.json();
    const members = ProcessUserMapper.fromAPIResponseMultiple(json.members);
    console.log(members);
    dispatch(getProcessMembers(members));
  } catch (error) {
    dispatch(processFailure(error));
  }
};

export const getProcessesThunk = (projectId: number): Function => async (
  dispatch: ReduxDispatch,
): Promise<*> => {
  try {
    dispatch(processRequest());
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

    const processes = ProcessMapper.fromAPIResponseMultiple(json.processes);

    dispatch(getProcesses(processes));
  } catch (error) {
    dispatch(processFailure(error));
  }
};

export const createProcessThunk = (
  title: string,
  description: string,
  projectId: number,
  userId: number,
): Function => async (dispatch: ReduxDispatch): Promise<*> => {
  try {
    processRequest();
    // eslint-disable-next-line no-undef
    const response = await fetch(
      `https://murmuring-eyrie-77138.herokuapp.com/process/create_process/`,
      {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title,
          description,
          project_id: projectId,
        }),
      },
    );
    console.log('saddas');
    const json = await response.json();
    console.log('json', json);
    if (json.error) {
      dispatch(processFailure(json.error));
    } else {
      const message = json.message;
      const status = json.status;

      const processData = ProcessMapper.fromAPIResponse(json.process);
      console.log('pdt', processData);
      // eslint-disable-next-line no-undef
      const responseUser = await fetch(
        `https://murmuring-eyrie-77138.herokuapp.com/process/${processData.id}/members/add/`,
        {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            user_id: userId,
            role: 0,
          }),
        },
      );
      dispatch(createProcess(processData, status, message));
    }
  } catch (error) {
    dispatch(processFailure((error: error)));
  }
};
