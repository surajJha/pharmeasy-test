/**
 * Created by surajjha on 02/06/18.
 */

const express = require('express');

const router = express.Router();

const UserAuthentication = require('../modules/UserAuthentication');

const userAuthentication = new UserAuthentication();

router.get('/login', (req, res) => {
	const input = req.query;
	const result = userAuthentication.login(input);
	const statusCode = (result.error === null) ? 200 : 401;
	res.status(statusCode).send(result);
});

router.get('/logout', (req, res) => {
	res.status(200).send(userAuthentication.logout());
});

module.exports = router;
