import { categoryConstants } from '../constants';
import { categoryService } from '../services';

export const categoryActions = {
    getCategories,
    newQuestion
};

function getCategories(username, password) {
    return dispatch => {
        categoryService.getCategories()
            .then(
                res => { 
                    dispatch(success(res.data.categories));
                },
                error => {
                    dispatch(failure(error.toString()));
                }
            );
    };

    function success(categories) { return { type: categoryConstants.GET_CATEGORIES_SUCCESS, categories } }
    function failure(error) { return { type: categoryConstants.GET_CATEGORIES_FAILURE, error } }
}

function newQuestion(data) {
    return dispatch => {
        categoryService.newQuestion(data)
            .then(
                res => { 
                    dispatch(success());
                },
                error => {
                    dispatch(failure(error.toString()));
                }
            );
    };

    function success(categories) { return { type: categoryConstants.SAVE_QUESTION_SUCCESS, categories } }
    function failure(error) { return { type: categoryConstants.SAVE_QUESTION_FAILURE, error } }
}