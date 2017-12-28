// @flow

import { type Process } from '../types/process';

export const ProcessMapper = {
  fromAPIResponse(response: Object = {}): Process {
    return {
      id: response.pk,
      title: response.title,
      description: response.description,
      startDate: response.start_date,
      endDate: response.end_date,
      isCompleted: response.is_completed,
      isActive: response.is_active,
      members: [],
    };
  },
  fromAPIResponseMultiple(response: Array<Object> | null): Array<Process> {
    if (!response) {
      return [];
    }

    return response.map(ProcessMapper.fromAPIResponse);
  },
};
