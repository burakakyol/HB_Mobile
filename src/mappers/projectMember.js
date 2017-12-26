// @flow

import { type ProjectUser } from '../types/project';
import { UserMapper } from './user';
import { ProjectMapper } from './project';

export const ProjectUserMapper = {
  fromAPIResponse(response: Object = {}): ProjectUser {
    return {
      id: response.pk,
      user: UserMapper.fromAPIResponse(response.user),
      joiningDate: response.joining_date,
      role: response.role,
      isActive: response.is_active,
      project: ProjectMapper.fromAPIResponse(response.project),
    };
  },
  fromAPIResponseMultiple(response: Array<Object> | null): Array<ProjectUser> {
    if (!response) {
      return [];
    }

    return response.map(ProjectUserMapper.fromAPIResponse);
  },
};
