import { fromJS } from 'immutable';

import * as types from '../utils/ActionTypesConstant';

const initialState = fromJS({
	isFetching: false,
	isFetchingError: false,
	isRequesting: false,
	isRequestingError: false,
	isApproving: false,
	isApprovingError: false,
	isSaving: false,
	isSavingError: false,
	error: '',
	saveError: '',
	prescriptions: {},
});

export default function (state = initialState, action) {
	switch (action.type) {
		case types.FETCH_PRESCRIPTIONS_INIT:
			return state.merge({
				isFetching: true,
				isFetchingError: false,
				error: '',
			});

		case types.FETCH_PRESCRIPTIONS_SUCCESS:
			return state.merge({
				isFetching: false,
				isFetchingError: false,
				prescriptions: action.data,
			});

		case types.FETCH_PRESCRIPTIONS_ERROR:
			return state.merge({
				isFetching: false,
				isFetchingError: true,
				prescriptions: {},
				error: action.error,
			});

		case types.REQUEST_PRESCRIPTIONS_INIT:
			return state.merge({
				isRequesting: true,
				isRequestingError: false,
				error: '',
			});

		case types.REQUEST_PRESCRIPTIONS_SUCCESS:
			return state.merge({
				isRequesting: false,
				isRequestingError: false,
			});

		case types.REQUEST_PRESCRIPTIONS_ERROR:
			return state.merge({
				isRequesting: false,
				isRequestingError: true,
				error: action.error,
			});

		case types.APPROVE_PRESCRIPTIONS_INIT:
			return state.merge({
				isApproving: true,
				isApprovingError: false,
				error: '',
			});

		case types.APPROVE_PRESCRIPTIONS_SUCCESS:
			return state.merge({
				isApproving: false,
				isApprovingError: false,
			});

		case types.APPROVE_PRESCRIPTIONS_ERROR:
			return state.merge({
				isApproving: false,
				isApprovingError: true,
				error: action.error,
			});

		case types.CREATE_PRESCRIPTIONS_INIT:
			return state.merge({
				isSaving: true,
				isSavingError: false,
				saveError: '',
			});

		case types.CREATE_PRESCRIPTIONS_SUCCESS:
			return state.merge({
				isSaving: false,
				isSavingError: false,
			});

		case types.CREATE_PRESCRIPTIONS_ERROR:
			return state.merge({
				isSaving: false,
				isSavingError: true,
				saveError: action.error,
			});

		default:
			return state;
	}
}
