/**
 * Created by surajjha on 02/06/18.
 */
const _ = require('lodash');
const db = require('../data/Database');

/**
 * @class UserAuthentication class contains all functionalities related to User login/ logout
 * @requires lodash
 * @requires Database
 */
class UserAuthentication {
	/**
	 * function validates username and password in the input against
	 * that in the database
	 * @method UserAuthentication.login
	 * @param {object } input username and password for login
	 * @return {object} response standard api response
	 */
	login(input) {
		if (!input || !input.username || !input.password) {
			return { error: { message: 'authentication failure' }, message: 'Either username or password is missing', result: false };
		}
		const user = db.get('users').find({ name: input.username });
		if (user.value() === undefined || user.value() === null) {
			return { error: 'authentication failure', message: 'User does not exist', result: false };
		}
		if (user.value().name !== input.username || user.value().password !== input.password) {
			return { error: 'authentication failure', message: 'Either username or password is incorrect', result: false };
		}
		const result = user.value();
		const data = _.cloneDeep(result);
		delete data.password;
		return { error: null, message: 'login successful', result: data };
	}

	/**
	 * function logs out a user
	 * @method UserAuthentication.logout
	 */
	logout() {
		return { error: null, message: 'logout successful', result: true };
	}
}

module.exports = UserAuthentication;
