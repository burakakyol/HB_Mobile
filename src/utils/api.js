// @flow

import { create } from 'apisauce';
import API_URL from '../config';

const api = create({
  baseURL: API_URL,
});

export function setAuthorizationHeader(token: string) {
  api.setHeader('Authorization', `Token ${token}`);
}
