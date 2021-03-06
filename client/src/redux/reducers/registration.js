import { userConstants } from '../constants';

export function registration(state = {}, action) {
  switch (action.type) {
    
    case userConstants.REGISTER_REQUEST:
      return { registering: true };

    case userConstants.REGISTER_SUCCESS:
      return { registrationSuccess: true };
    
    case userConstants.REGISTER_FAILURE:
      return {};
  
    case userConstants.LOGIN_REDIRECT_DONE:
      return { registrationSuccess: false };
    
    default:
      return state
  }
}