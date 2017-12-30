// @flow

import { type TaskUser } from '../types/task';
import ProcessUserMapper from './processMember';

export const TaskUserMapper = {
  fromAPIResponse(response: Object = {}): TaskUser {
    return {
      id: response.task_user.pk,
      member: ProcessUserMapper.fromAPIResponse(response.task_user.member),
    };
  },
};
