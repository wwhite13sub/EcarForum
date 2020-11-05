import { categoryConstants } from '../constants';

const initialState = {
  categories: [],
  newQuestionSaved: false,
  newAnswerSaved: false,
  questionList: {
    data: [],
    noOfPages: 0
  },
  answerList: {
    data: [],
    noOfPages: 0
  }
}

export function category(state = initialState, action) {
  switch (action.type) {
    case categoryConstants.GET_CATEGORIES_SUCCESS:
      return {...state, categories: action.categories};
    case categoryConstants.GET_CATEGORIES_FAILURE:
      return {};

    case categoryConstants.SAVE_QUESTION_SUCCESS:
      return {...state, newQuestionSaved: true};
    case categoryConstants.SAVE_QUESTION_FAILURE:
      return {};

    case categoryConstants.GET_QUESTION_LIST_SUCCESS:
      return {...state, newQuestionSaved: false, newAnswerSaved: false, questionList: action.questionList};
    case categoryConstants.GET_QUESTION_LIST_FAILURE:
      return {};

    case categoryConstants.SAVE_ANSWER_SUCCESS:
      return {...state, newAnswerSaved: true};
    case categoryConstants.SAVE_ANSWER_FAILURE:
      return {};

    case categoryConstants.GET_ANSWER_LIST_SUCCESS:
      return {...state, answerList: action.answerList};
    case categoryConstants.GET_ANSWER_LIST_FAILURE:
      return {};

    default:
      return state
  }
}