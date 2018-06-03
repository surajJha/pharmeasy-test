export const setCookie = (cname, cvalue, exdays) => {
	const d = new Date();
	d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
	const expires = `expires=${d.toUTCString()}`;
	document.cookie = `${cname}=${cvalue};${expires};path=/`;
};

export const getCookie = () => {
	const name = 'username=';
	const cookie = document.cookie.split(';');
	for (let i = 0; i < cookie.length; i++) {
		let c = cookie[i];
		while (c.charAt(0) === ' ') {
			c = c.substring(1);
		}
		if (c.indexOf(name) === 0) {
			return c.substring(name.length, c.length);
		}
	}
	return '';
};


export const deleteCookie = (cname, cvalue) => {
	const expires = 'expires=Thu, 01 Jan 1970 00:00:01 GMT;';
	document.cookie = `${cname}=${cvalue};${expires};path=/`;
};
