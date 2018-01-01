// @flow
import { type Task, type TaskUser } from '../../types/task';
import { type ReduxDispatch } from '../../types/redux';

import * as types from '../../enums/actionStatus';
import { TaskMapper } from '../../mappers/task';
import { TaskUserMapper } from '../../mappers/taskUser';

// Actions
export const TASK_REQUEST = 'TASK_REQUEST';
export const TASK_FAILED = 'TASK_FAILED';
export const CREATE_TASK = 'CREATE_TASK';

export const GET_TASKS = 'GET_TASKS';
export const SET_CURRENT_TASK = 'SET_CURRENT_TASK';
export const CLEAR_TASKS = 'CLEAR_TASKS';

// Action Creator Types

export type TaskRequestAction = {
  type: typeof TASK_REQUEST,
};
export type TaskFailedAction = {
  type: typeof TASK_FAILED,
};

export type GetTasksAction = {
  type: typeof GET_TASKS,
  tasks: Array<Task>,
};

export type ClearTasksAction = {
  type: typeof CLEAR_TASKS,
};

export type CreateTaskAction = {
  type: typeof CREATE_TASK,
  message: any,
  status: any,
};
export type SetCurrentTaskAction = {
  type: typeof SET_CURRENT_TASK,
};

// Action Creators
const taskRequest = (): TaskRequestAction => ({
  type: TASK_REQUEST,
});

const taskFailure = (error: any): TaskFailedAction => ({
  type: TASK_FAILED,
  error,
});

export const getTasks = (tasks: Array<Task>): GetTasksAction => ({
  type: GET_TASKS,
  tasks,
});

export const setCurrentTask = (task: Task): SetCurrentTaskAction => ({
  type: SET_CURRENT_TASK,
  task,
});

export const clearTasks = (): ClearTasksAction => ({
  type: CLEAR_TASKS,
});

export const createTask = (status: any, message: any): CreateTaskAction => ({
  type: CREATE_TASK,
  message,
  status,
});

export type TaskState = {
  currentTask: any,
  taskList: any,
  status: any,
  error?: any,
};

export type TaskActions =
  | TaskRequestAction
  | TaskFailedAction
  | GetTasksAction
  | SetCurrentTaskAction
  | ClearTasksAction
  | CreateTaskAction;

// Reducer

const defaultState = {
  taskList: [],
  currentTask: {},
  status: types.INIT,
};

export default function(state: TaskState = defaultState, action: TaskActions): TaskState {
  switch (action.type) {
    case TASK_REQUEST:
      return { ...state, status: types.LOADING };

    case GET_TASKS:
      return {
        currentTask: state.currentTask,
        taskList: action.tasks,
        status: types.LOADED,
      };
    case CREATE_TASK:
      return {
        ...state,
        message: action.message,
        status: action.status,
      };
    case SET_CURRENT_TASK:
      return {
        currentTask: action.task,
        taskList: state.taskList,
        status: types.LOADED,
      };
    case CLEAR_TASKS:
      return defaultState;

    case TASK_FAILED:
      return {
        ...defaultState,
        error: action.error,
      };

    default:
      return state;
  }
}

// thunk
export const getProcessTasksThunk = (processId: number): Function => async (
  dispatch: ReduxDispatch,
): Promise<*> => {
  try {
    dispatch(taskRequest());
    // eslint-disable-next-line no-undef
    const response = await fetch(
      `https://murmuring-eyrie-77138.herokuapp.com/process/${processId}/tasks/`,
      {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      },
    );

    const json = await response.json();
    console.log(json);
    const tasks = TaskMapper.fromAPIResponseMultiple(json.tasks);
    console.log('task', tasks);
    dispatch(getTasks(tasks));
  } catch (error) {
    console.log('fail');
    dispatch(taskFailure(error));
  }
};

export const createTaskThunk = (
  title: string,
  description: string,
  processId: number,
  managerId: number,
  userId: number,
): Function => async (dispatch: ReduxDispatch): Promise<*> => {
  try {
    taskRequest();
    // eslint-disable-next-line no-undef
    const response = await fetch(`https://murmuring-eyrie-77138.herokuapp.com/task/create_task/`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title,
        description,
        process_id: processId,
        manager_id: managerId,
      }),
    });
    console.log('saddas');
    const json = await response.json();
    console.log('json', json);
    if (json.error) {
      dispatch(taskFailure(json.error));
    } else {
      const message = json.message;
      const status = json.status;

      const taskData = TaskMapper.fromAPIResponse(json.task);
      console.log('pdt', taskData);
      // eslint-disable-next-line no-undef
      const responseUser = await fetch(
        `https://murmuring-eyrie-77138.herokuapp.com/process/${taskData.id}/members/add/`,
        {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            process_user_id: userId,
            role: 0,
          }),
        },
      );
      dispatch(createTask(status, message));
    }
  } catch (error) {
    dispatch(taskFailure((error: error)));
  }
};
