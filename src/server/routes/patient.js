/**
 * Created by surajjha on 02/06/18.
 */

const express = require('express');

const router = express.Router();

const Patient = require('../modules/Patient');

const patient = new Patient();

router.put('/prescription/create', (req, res) => {
	const data = req.body;
	const result = patient.createPrescription(data);
	const statusCode = (result.error === null) ? 200 : 500;
	res.status(statusCode).send(result);
});

router.get('/prescriptions', (req, res) => {
	const prescriptions = patient.getPrescriptions();
	const statusCode = (prescriptions.error === null) ? 200 : 500;
	res.status(statusCode).send(prescriptions);
});

router.put('/prescription/request', (req, res) => {
	const data = req.body;
	const result = patient.askForPermission(data);
	const statusCode = (result.error === null) ? 200 : 500;
	res.status(statusCode).send(result);
});

router.put('/prescription/approve', (req, res) => {
	const data = req.body;
	const result = patient.approvePrescription(data);
	const statusCode = (result.error === null) ? 200 : 500;
	res.status(statusCode).send(result);
});

module.exports = router;
