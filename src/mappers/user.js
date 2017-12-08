// @flow

import { type User } from '../types/user';

export const UserMapper = {
  fromAPIResponse(response: Object = {}): User {
    return {
      id: response.pk,
      userName: response.username,
      email: response.email,
      firstName: response.first_name || '',
      lastName: response.last_name || '',
      dateJoined: response.date_joined || '',
      isActive: response.is_active,
    };
  },
  fromAPIResponseMultiple(response: Array<Object> | null): Array<User> {
    if (!response) {
      return [];
    }

    return response.map(UserMapper.fromAPIResponse);
  },
};
