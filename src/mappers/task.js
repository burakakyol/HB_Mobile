// @flow

import { type Task } from '../types/task';
import TaskUserMapper from './taskUser';

export const TaskMapper = {
  fromAPIResponse(response: Object = {}): Task {
    return {
      id: response.pk,
      title: response.title,
      description: response.description,
      startDate: response.start_date,

      isCompleted: response.is_completed,
      isActive: response.is_active,
      progress: response.progress,
      manager: {},
      member: {},
    };
  },
  fromAPIResponseMultiple(response: Array<Object> | null): Array<Task> {
    if (!response) {
      return [];
    }

    return response.map(TaskMapper.fromAPIResponse);
  },
};
