// @flow

import { type ProcessUser } from '../types/process';
import { ProjectUserMapper } from './projectMember';
import { ProcessMapper } from './process';

export const ProcessUserMapper = {
  fromAPIResponse(response: Object = {}): ProcessUser {
    return {
      id: response.pk,
      user: ProjectUserMapper.fromAPIResponse(response.user),
      role: response.role,
      isActive: response.is_active,
      process: ProcessMapper.fromAPIResponse(response.process),
    };
  },
  fromAPIResponseMultiple(response: Array<Object> | null): Array<ProjectUser> {
    if (!response) {
      return [];
    }

    return response.map(ProjectUserMapper.fromAPIResponse);
  },
};
