// @flow

import API_ROOT_URL from '../../config';
import { type Project, ProjectUser } from '../../types/project';
import { type ReduxDispatch } from '../../types/redux';
import * as types from '../../enums/actionStatus';
import { ProjectMapper } from '../../mappers/project';
import { ProjectUserMapper } from '../../mappers/projectMember';

// Actions
export const REQUEST = 'REQUEST';
export const FAILED = 'FAILED';
export const LOADING = 'LOADING';
export const CREATE = 'CREATE';
export const UPDATE = 'CREATE';
export const SUCCESS = 'SUCCESS';
export const GET_PROJECTS = 'GET_PROJECTS';
export const ADD_MEMBER = 'ADD_MEMBER';

// Action Creator Types

export type RequestAction = {
  type: typeof REQUEST,
};
export type FailedAction = {
  type: typeof FAILED,
};

export type CreateAction = {
  type: typeof CREATE,
  project: Project,
};

export type SuccessAction = {
  type: typeof SUCCESS,
};

export type UpdateAction = {
  type: typeof UPDATE,
  project: Project,
};

export type GetProjectsAction = {
  type: typeof GET_PROJECTS,
  projects: Array<ProjectUser>,
};

export type AddMemberAction = {
  type: typeof ADD_MEMBER,
};

// Action Creators
export const create = (project: Project, status: any, message: any): CreateAction => ({
  type: CREATE,
  project,
  status,
  message,
});

export const success = (project: Project): SuccessAction => ({
  type: SUCCESS,
  project,
});

export const addMember = (status: any, message: any): AddMemberAction => ({
  type: ADD_MEMBER,
  status,
  message,
});

const request = (): RequestAction => ({
  type: REQUEST,
});

const failure = (error: any): FailedAction => ({
  type: FAILED,
  error,
});

export const update = (project: Project): UpdateAction => ({
  type: UPDATE,
  project,
});

export const getProjects = (projects: Array<ProjectUser>): GetProjectsAction => ({
  type: GET_PROJECTS,
  projects,
});

export type ProjectState = {
  currentProject: any,
  projects: any,
  status: any,
  error?: any,
};

export type ProjectActions =
  | RequestAction
  | SuccessAction
  | CreateAction
  | UpdateAction
  | FailedAction
  | GetProjectsAction
  | AddMemberAction;

// Reducer

const defaultState = { projects: [], currentProject: {}, status: types.INIT };

export default function(state: ProjectState = defaultState, action: ProjectActions): ProjectState {
  switch (action.type) {
    case REQUEST:
      return { projects: [], currentProject: {}, status: types.LOADING };

    case CREATE:
      return {
        currentProject: {},
        projects: [...state.projects],
        status: action.message,
        message: action.status,
      };

    case GET_PROJECTS:
      return {
        currentProject: {},
        projects: action.projects,
        status: types.LOADED,
      };

    case ADD_MEMBER:
      return {
        currentProject: state.currentProject,
        projects: state.projects,
        status: action.status,
        message: action.message,
      };

    case SUCCESS:
      return {
        currentProject: action.project,
        projects: [...state.projects],
        status: types.LOADED,
      };

    case FAILED:
      return {
        currentProject: null,
        projects: [],
        status: types.FAILED,
        error: action.error,
      };

    default:
      return state;
  }
}

// Thunk
export const addMemberThunk = (projectId: number, userId: number, role: number): Function => async (
  dispatch: ReduxDispatch,
): Promise<*> => {
  try {
    request();
    // eslint-disable-next-line no-undef
    const response = await fetch(
      `https://murmuring-eyrie-77138.herokuapp.com/project/${projectId}/members/add/`,
      {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user_id: userId,
          role,
        }),
      },
    );
    const json = await response.json();
    dispatch(addMember(json.status, json.message));
  } catch (error) {
    dispatch(failure(error));
  }
};

export const getProjectsThunk = (userId: number): Function => async (
  dispatch: ReduxDispatch,
): Promise<*> => {
  try {
    request();
    // eslint-disable-next-line no-undef
    const response = await fetch(
      `https://murmuring-eyrie-77138.herokuapp.com/user/${userId}/projects/`,
      {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      },
    );

    const json = await response.json();

    const projects = ProjectUserMapper.fromAPIResponseMultiple(json.projects);

    dispatch(getProjects(projects));
  } catch (error) {
    dispatch(failure(error));
  }
};

export const createProjectThunk = (
  title: string,
  description: string,
  userId: number,
): Function => async (dispatch: ReduxDispatch): Promise<*> => {
  try {
    request();
    // eslint-disable-next-line no-undef
    const response = await fetch(
      `https://murmuring-eyrie-77138.herokuapp.com/project/create_project/`,
      {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title,
          description,
        }),
      },
    );
    const json = await response.json();
    if (json.error) {
      dispatch(failure(json.error));
    } else {
      const message = json.message;
      const status = json.status;
      const project = ProjectMapper.fromAPIResponse(json.project);
      // eslint-disable-next-line no-undef
      const responseUser = await fetch(
        `https://murmuring-eyrie-77138.herokuapp.com/project/${project.id}/members/add/`,
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
      dispatch(create(project, message, status));
    }
  } catch (error) {
    dispatch(failure((error: error)));
  }
};
