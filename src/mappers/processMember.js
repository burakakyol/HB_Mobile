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
    };
  },
  fromAPIResponseMultiple(response: Array<Object> | null): Array<ProcessUser> {
    if (!response) {
      return [];
    }

    return response.map(ProcessUserMapper.fromAPIResponse);
  },
};
