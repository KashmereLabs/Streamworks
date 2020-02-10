import { combineReducers } from 'redux';

import userReducer from './user';
import managerReducer from './manager';
import transactionReducer from './transaction';

const rootReducer = combineReducers({
  user: userReducer,
  manager: managerReducer,
  transaction: transactionReducer

})

export default rootReducer
