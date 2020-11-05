import { combineReducers } from 'redux';

import { authentication } from './authentication';
import { registration } from './registration';
import { alert } from './alert';
import { category } from './category';

const rootReducer = combineReducers({
  authentication,
  registration,
  alert,
  category
});

export default rootReducer;