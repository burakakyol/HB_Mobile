// @flow
import { AsyncStorage } from 'react-native';
import { type User } from '../types/user';

const STORAGE_KEY = 'user';

async function save(user: User): Promise<boolean> {
  try {
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(user));
    return true;
  } catch (error) {
    return false;
  }
}

async function clear(): Promise<boolean> {
  try {
    await AsyncStorage.removeItem(STORAGE_KEY);

    return true;
  } catch (error) {
    return false;
  }
}

async function get(): Promise<User | null> {
  try {
    const data = await AsyncStorage.getItem(STORAGE_KEY);

    if (data === null) {
      return null;
    }

    return JSON.parse(data);
  } catch (error) {
    return null;
  }
}

export default {
  save,
  clear,
  get,
};
