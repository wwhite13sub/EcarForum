import { categoryConstants } from '../constants';

const initialState = {
  categories: []
}

export function category(state = initialState, action) {
  switch (action.type) {
    case categoryConstants.GET_CATEGORIES_SUCCESS:
      return {...state, categories: action.categories};
    default:
      return state
  }
}