import { combineReducers } from 'redux';

import userReducer from './user';
import managerReducer from './manager';

const rootReducer = combineReducers({
  user: userReducer,
  manager: managerReducer

})

export default rootReducer
