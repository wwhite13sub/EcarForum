import { categoryConstants } from '../constants';
import { categoryService } from '../services';

export const categoryActions = {
    getCategories
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