import { customFetch } from '../utils/apiHelpers';

export default {
	signIn(username, password) {
		return customFetch(`http://localhost:3000/api/v1/user/login?username=${username}&password=${password}`, {
			mode: 'cors',
		});
	},

	signOut() {
		return customFetch('http://localhost:3000/api/v1/user/logout', {
			mode: 'cors',
		});
	},

	fetchPrescriptions() {
		return customFetch('http://localhost:3000/api/v1/patient/prescriptions', {
			mode: 'cors',
		});
	},

	requestPrescription(body) {
		return customFetch('http://localhost:3000/api/v1/patient/prescription/request', {
			mode: 'cors',
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(body),
		});
	},

	approvePrescription(body) {
		return customFetch('http://localhost:3000/api/v1/patient/prescription/approve', {
			mode: 'cors',
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(body),
		});
	},

	createPrescription(body) {
		return customFetch('http://localhost:3000/api/v1/patient/prescription/create', {
			mode: 'cors',
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(body),
		});
	},
};
