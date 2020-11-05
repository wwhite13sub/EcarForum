import { categoryConstants } from '../constants';
import { categoryService } from '../services';

export const categoryActions = {
    getCategories,
    newQuestion,
    getQuestionList,
    newAnswer,
    getAnswerList
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

function getQuestionList(data) {
    return dispatch => {
        categoryService.getQuestionList(data)
            .then(
                res => { 
                    dispatch(success(res.data.questionList));
                },
                error => {
                    dispatch(failure(error.toString()));
                }
            );
    };

    function success(questionList) { return { type: categoryConstants.GET_QUESTION_LIST_SUCCESS, questionList } }
    function failure(error) { return { type: categoryConstants.GET_QUESTION_LIST_FAILURE, error } }
}

function newAnswer(data) {
    return dispatch => {
        categoryService.newAnswer(data)
            .then(
                res => { 
                    dispatch(success());
                },
                error => {
                    dispatch(failure(error.toString()));
                }
            );
    };

    function success(categories) { return { type: categoryConstants.SAVE_ANSWER_SUCCESS, categories } }
    function failure(error) { return { type: categoryConstants.SAVE_ANSWER_FAILURE, error } }
}


function getAnswerList(data) {
    return dispatch => {
        categoryService.getAnswerList(data)
            .then(
                res => { 
                    dispatch(success(res.data.answerList));
                },
                error => {
                    dispatch(failure(error.toString()));
                }
            );
    };

    function success(answerList) { return { type: categoryConstants.GET_ANSWER_LIST_SUCCESS, answerList } }
    function failure(error) { return { type: categoryConstants.GET_ANSWER_LIST_FAILURE, error } }
}
