import { userConstants } from '../constants';
import { userService } from '../services';
import { alertActions } from './';

export const userActions = {
    login,
    logout,
    register,
    loginRedirectDone
};

function login(username, password) {
    return dispatch => {
        dispatch(request({ username }));

        userService.login(username, password)
            .then(
                user => { 
                    dispatch(success(user.data.user));
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error('Wrong username or password.'));
                }
            );
    };

    function request(user) { return { type: userConstants.LOGIN_REQUEST, user } }
    function success(user) { return { type: userConstants.LOGIN_SUCCESS, user } }
    function failure(error) { return { type: userConstants.LOGIN_FAILURE, error } }
}

function logout() {
    userService.logout();
    return { type: userConstants.LOGOUT };
}
//This function calls all dispatch
function register(input) {
    return dispatch => {
        dispatch(request(input));

        userService.register(input)
            .then(
                user => { 
                    dispatch(success(user));
                    dispatch(alertActions.success('Registration successful'));
                },
                error => {
                    dispatch(failure(error.response.data.error));
                    dispatch(alertActions.error(error.response.data.error));
                }
            );
    };

    function request(user) { return { type: userConstants.REGISTER_REQUEST, user } }
    function success(user) { return { type: userConstants.REGISTER_SUCCESS, user } }
    function failure(error) { return { type: userConstants.REGISTER_FAILURE, error } }
}

function loginRedirectDone() {
    return { type:  userConstants.LOGIN_REDIRECT_DONE }
}
