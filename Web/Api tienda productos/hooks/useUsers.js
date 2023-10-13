import { APIFakeStore as API } from '../api/index.js';
import { shuffleArray } from '../utils/index.js';

/** @typedef {import('../api/fakestore').User} User */

/**
 * @template T
 * @param {(users: User[]) => T} callback
 */
export const useUsers = (callback, shuffle=true) =>
  API.users()
    .then(users => !shuffle ? users : shuffleArray(users))
    .then(callback);

export default useUsers;
