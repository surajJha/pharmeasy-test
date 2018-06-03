/**
 * Created by surajjha on 02/06/18.
 */

const UserAuthentication = require('../UserAuthentication');


const userAuthentication = new UserAuthentication();

describe('Testing user login', () => {
	it('returns correct response when input is correct', async () => {
		const data = {
			username: 'doctor',
			password: 'doctor',
		};
		const result = userAuthentication.login(data);
		expect(typeof result).toBe('object');
		expect(result.error).toBe(null);
		expect(typeof result.message).toBe('string');
		expect(result.message).toEqual('login successful');
		expect(typeof result.result).toBe('object');
	});

	it('returns correct error response when input is incorrect', async () => {
		const data = {};
		const result = userAuthentication.login(data);
		expect(typeof result).toBe('object');
		expect(result.error).not.toBe(null);
		expect(typeof result.message).toBe('string');
		expect(result.message).toEqual('Either username or password is missing');
		expect(typeof result.result).toBe('boolean');
	});

	it('returns correct error response when user does not exist', async () => {
		const data = {
			username: 'doc',
			password: 'doctor',
		};
		const result = userAuthentication.login(data);
		expect(typeof result).toBe('object');
		expect(result.error).not.toBe(null);
		expect(typeof result.message).toBe('string');
		expect(result.message).toEqual('User does not exist');
		expect(typeof result.result).toBe('boolean');
		expect(result.result).toEqual(false);
	});

	it('returns correct error response when password is incorrect', async () => {
		const data = {
			username: 'doctor',
			password: 'docr',
		};
		const result = userAuthentication.login(data);
		expect(typeof result).toBe('object');
		expect(result.error).not.toBe(null);
		expect(typeof result.message).toBe('string');
		expect(result.message).toEqual('Either username or password is incorrect');
		expect(typeof result.result).toBe('boolean');
		expect(result.result).toEqual(false);
	});
});

describe('Testing user logout', () => {
	it('returns correct response when input is correct', async () => {
		const result = userAuthentication.logout();
		expect(typeof result).toBe('object');
		expect(result.error).toBe(null);
		expect(typeof result.message).toBe('string');
		expect(result.message).toEqual('logout successful');
		expect(result.result).toEqual(true);
	});
});

