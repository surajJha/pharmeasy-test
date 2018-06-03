import * as types from '../utils/ActionTypesConstant';
import PrescriptionApi from '../api/prescription';

import { deleteCookie } from '../utils/cookieStorage';

const Handler = {
	signIn: {
		init() {
			return {
				type: types.LOGIN_INIT,
			};
		},
		success(data) {
			return {
				type: types.LOGIN_SUCCESS,
				data,
			};
		},
		error(error) {
			return {
				type: types.LOGIN_ERROR,
				error,
			};
		},
	},
	fetchPrescriptions: {
		init() {
			return {
				type: types.FETCH_PRESCRIPTIONS_INIT,
			};
		},
		success(data) {
			return {
				type: types.FETCH_PRESCRIPTIONS_SUCCESS,
				data,
			};
		},
		error(error) {
			return {
				type: types.FETCH_PRESCRIPTIONS_ERROR,
				error,
			};
		},
	},
	requestPrescription: {
		init() {
			return {
				type: types.REQUEST_PRESCRIPTIONS_INIT,
			};
		},
		success(data) {
			return {
				type: types.REQUEST_PRESCRIPTIONS_SUCCESS,
				data,
			};
		},
		error(error) {
			return {
				type: types.REQUEST_PRESCRIPTIONS_ERROR,
				error,
			};
		},
	},
	approvePrescription: {
		init() {
			return {
				type: types.APPROVE_PRESCRIPTIONS_INIT,
			};
		},
		success(data) {
			return {
				type: types.APPROVE_PRESCRIPTIONS_SUCCESS,
				data,
			};
		},
		error(error) {
			return {
				type: types.APPROVE_PRESCRIPTIONS_ERROR,
				error,
			};
		},
	},
	createPrescription: {
		init() {
			return {
				type: types.CREATE_PRESCRIPTIONS_INIT,
			};
		},
		success(data) {
			return {
				type: types.CREATE_PRESCRIPTIONS_SUCCESS,
				data,
			};
		},
		error(error) {
			return {
				type: types.CREATE_PRESCRIPTIONS_ERROR,
				error,
			};
		},
	},
};

const Actions = {
	signIn(username, password) {
		const handler = Handler.signIn;
		return (dispatch) => {
			dispatch(handler.init());
			PrescriptionApi.signIn(username, password).then((json) => {
				dispatch(handler.success(json.result));
			}, (error) => {
				const message = error.message || 'Something went wrong';
				dispatch(handler.error(message));
			});
		};
	},

	signOut(history, type) {
		return () => {
			PrescriptionApi.signOut().then(() => {
				deleteCookie('username', type);
				history.push('/login');
			});
		};
	},

	fetchPrescriptions() {
		const handler = Handler.fetchPrescriptions;
		return (dispatch) => {
			dispatch(handler.init());
			PrescriptionApi.fetchPrescriptions().then((json) => {
				dispatch(handler.success(json.result));
			}, (error) => {
				const message = error.message || 'Something went wrong';
				dispatch(handler.error(message));
			});
		};
	},

	requestPrescription(body) {
		const handler = Handler.requestPrescription;
		return (dispatch) => {
			dispatch(handler.init());
			PrescriptionApi.requestPrescription(body).then((json) => {
				dispatch(handler.success(json.result));
			}, (error) => {
				const message = error.message || 'Something went wrong';
				dispatch(handler.error(message));
			});
		};
	},

	approvePrescription(body) {
		const handler = Handler.approvePrescription;
		return (dispatch) => {
			dispatch(handler.init());
			PrescriptionApi.approvePrescription(body).then((json) => {
				dispatch(handler.success(json.result));
			}, (error) => {
				const message = error.message || 'Something went wrong';
				dispatch(handler.error(message));
			});
		};
	},

	createPrescription(body) {
		const handler = Handler.createPrescription;
		return (dispatch) => {
			dispatch(handler.init());
			PrescriptionApi.createPrescription(body).then((json) => {
				dispatch(handler.success(json.result));
			}, (error) => {
				const message = error.message || 'Something went wrong';
				dispatch(handler.error(message));
			});
		};
	},
};


export default Actions;
