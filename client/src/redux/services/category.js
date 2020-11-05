import axios from 'axios';

export const categoryService = {
    getCategories,
    newQuestion,
    getQuestionList
};

function getCategories() {
    return axios.get(`http://localhost:4000/api/get-categories`).then((categoriesResponse) => {
        return categoriesResponse;
    })
    .catch((error) => {
      return Promise.reject(error);
    });
}

function newQuestion(data) {
    return axios.post(`http://localhost:4000/api/new-question`, data).then((response) => {
        return response;
    })
    .catch((error) => {
      return Promise.reject(error);
    });
}

function getQuestionList(data) {
    return axios.post(`http://localhost:4000/api/get-question-list`, data).then((response) => {
        return response;
    })
    .catch((error) => {
      return Promise.reject(error);
    });
}
