const express = require('express');

const router = new express.Router();

router.use('/user', require('./routes/user'));
router.use('/patient', require('./routes/patient'));

router.use((req, res) => {
	res.status(404).send('are you lost?');
});

module.exports = router;
