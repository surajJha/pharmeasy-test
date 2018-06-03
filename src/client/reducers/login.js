import { fromJS } from 'immutable';

import * as types from '../utils/ActionTypesConstant';

const initialState = fromJS({
	isLogging: false,
	isLoggingError: false,
	error: '',
	user: {},
});

export default function (state = initialState, action) {
	switch (action.type) {
		case types.LOGIN_INIT:
			return state.merge({
				isLogging: true,
				isLoggingError: false,
			});

		case types.LOGIN_SUCCESS:
			return state.merge({
				isLogging: false,
				isLoggingError: false,
				user: action.data,
				error: '',
			});

		case types.LOGIN_ERROR:
			return state.merge({
				isLogging: false,
				isLoggingError: true,
				user: {},
				error: action.error,
			});

		default:
			return state;
	}
}
