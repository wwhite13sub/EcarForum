import axios from 'axios';

export const categoryService = {
    getCategories
};

function getCategories() {
    return axios.get(`http://localhost:4000/api/get-categories`).then((categoriesResponse) => {
        return categoriesResponse;
    })
    .catch((error) => {
      return Promise.reject(error);
    });
}