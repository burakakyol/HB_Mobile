// @flow

import { type Project } from '../types/project';

export const ProjectMapper = {
  fromAPIResponse(response: Object = {}): Project {
    return {
      id: response.pk,
      title: response.title,
      description: response.description,
      startDate: response.start_date,
      endDate: response.end_date,
      members: [],
      processes: [],
    };
  },
  fromAPIResponseMultiple(response: Array<Object> | null): Array<Project> {
    if (!response) {
      return [];
    }

    return response.map(ProjectMapper.fromAPIResponse);
  },
};
