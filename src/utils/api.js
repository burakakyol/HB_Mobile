// @flow

import { create } from 'apisauce';
import API_ROOT_URL from '../config';

const api = create({
  baseURL: API_ROOT_URL,
});

export function setAuthorizationHeader(token: string) {
  api.setHeader('Authorization', `Token ${token}`);
}
