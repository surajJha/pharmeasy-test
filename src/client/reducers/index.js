import { combineReducers } from 'redux';

/* Import reducers and combine them below */
import Login from './login';
import Prescriptions from './prescriptions';

export default combineReducers({
	Login,
	Prescriptions,
});
