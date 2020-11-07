import { authHeader, APP_HOST } from '../helpers';
import axios from 'axios';

export const userService = {
    login,
    logout,
    register
};

function login(username, password) {
    const data = {
        username: username,
        password: password
    }
    return axios.post(`${APP_HOST}api/login`, data).then((user) => {
        // store user details and jwt token in local storage to keep user logged in between page refreshes
        localStorage.setItem('user', JSON.stringify(user.data.user));
        return user;
    })
    .catch((error) => {
      /**
       * If the response status code is 409 - Conflict, then we already have
       * a doggie with this name.
       **/
      if (error.response.status === 401) {
        logout();
      }
      return Promise.reject(error);
    });
}

function logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('user');
}

function register(user) {
    return axios.post(`${APP_HOST}api/register`, user).then((result) => {
      return result;
    })
    .catch((error) => {
      /**
       * If the response status code is 409 - Conflict, then we already have
       * a doggie with this name.
       **/
      if (error.response.status === 401) {
        logout();
      }
      return Promise.reject(error);
    });
}
