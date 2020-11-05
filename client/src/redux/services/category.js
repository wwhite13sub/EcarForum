import axios from 'axios';
import { authHeader } from '../helpers';

export const categoryService = {
    getCategories,
    newQuestion,
    getQuestionList,
    newAnswer,
    getAnswerList
};

function getCategories() {
    const options = {
        headers: authHeader()
    };
    
    return axios.get(`http://localhost:4000/api/get-categories`, options).then((categoriesResponse) => {
        return categoriesResponse;
    })
    .catch((error) => {
      return Promise.reject(error);
    });
}

function newQuestion(data) {
    const options = {
        headers: authHeader()
    };

    return axios.post(`http://localhost:4000/api/new-question`, data, options).then((response) => {
        return response;
    })
    .catch((error) => {
      return Promise.reject(error);
    });
}

function getQuestionList(data) {
    const options = {
        headers: authHeader()
    };

    return axios.post(`http://localhost:4000/api/get-question-list`, data, options).then((response) => {
        return response;
    })
    .catch((error) => {
      return Promise.reject(error);
    });
}

function newAnswer(data) {
    const options = {
        headers: authHeader()
    };

    return axios.post(`http://localhost:4000/api/new-answer`, data, options).then((response) => {
        return response;
    })
    .catch((error) => {
      return Promise.reject(error);
    });
}

function getAnswerList(data) {
    const options = {
        headers: authHeader()
    };

    return axios.post(`http://localhost:4000/api/get-answer-list`, data, options).then((response) => {
        return response;
    })
    .catch((error) => {
      return Promise.reject(error);
    });
}

