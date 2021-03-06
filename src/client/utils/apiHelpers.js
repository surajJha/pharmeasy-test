import fetch from 'cross-fetch';
import partial from 'lodash/partial';

// Ref: https://github.com/jonbern/fetch-retry/blob/master/index.js
export const customFetch = (url, options) => {
	const { retries = 0, ...restOptions } = options;
	return new Promise((resolve, reject) => {
		// Helper method which will reject if retries complete or
		// recursively call fetch
		const handleError = (n, statusCode, response = {}) => {
			if (response && typeof response === 'object') {
				response.statusCode = statusCode;
			}
			if (n > 0) {
				wrappedFetch(--n); // eslint-disable-line no-plusplus
			} else if (response instanceof Error) {
				reject(response);
			} else {
				reject(response);
			}
		};
		const wrappedFetch = (n) => {
			fetch(url, restOptions).then((response) => {
				// Handle api success/error
				if (response.ok) {
					// Parse the success response and then resolve the response
					response.json().then(resolve);
				} else {
					// Handle actual api errors, server unavailable, non-json errors
					response.json().then(
						partial(handleError, n, response.status), // Handle all api errors with valid json response
						partial(handleError, n, response.status), // Handle json parsing errors if page is not JSON.parse'able
					);
				}
			}, partial(handleError, n)); // Handle thrown api errors (cors/internet unavailable)
		};
		wrappedFetch(retries);
	});
};
