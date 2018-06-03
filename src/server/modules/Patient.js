/**
 * Created by surajjha on 02/06/18.
 */
const _ = require('lodash');

const db = require('../data/Database');

/**
 * @class Patient class contains all functionalities Patient details
 * @requires lodash
 * @requires Database
 */
class Patient {
	/**
	 * function returns a patient's prescriptions
	 * @method Patient.getPrescriptions
	 * @return {object} response standard api response
	 */
	getPrescriptions() {
		try {
			const { prescriptions } = db.get('users').find({ name: 'patient' }).value();
			return { error: null, message: 'Prescriptions fetched successfully', result: prescriptions };
		} catch (e) {
			return { error: 'Error while fetching prescriptions', message: 'Could not get prescriptions', result: null };
		}
	}

	/**
	 * function creates a new prescription for the patient, based on the input given.
	 * @param {object} data contains data fields for creating a new prescription for the patient
	 * @method Patient.createPrescription
	 * @return {object} response standard api response
	 */
	createPrescription(data) {
		if (!data || !data.isApprovedForDoctor || !data.isApprovedForPharmacist || !data.period || !data.medicines || data.medicines.length <= 0) {
			return { error: 'input is incomplete', message: 'some or all required fields are missing', result: false };
		}
		const { prescriptions } = db.get('users').find({ name: 'patient' }).value();
		const newPrescription = _.cloneDeep(data);
		newPrescription.id = prescriptions.length + 1;
		prescriptions.push(newPrescription);
		try {
			db.get('users').find({ name: 'patient' }).assign({ prescriptions }).value();
		} catch (e) {
			return { error: 'error in adding prescription', message: 'New prescription could not be created', result: false };
		}
		return { error: null, message: 'New prescription was created successfully', result: true };
	}

	/**
	 * function asks for permission on behalf of either doctor or pharmacist.
	 * @param {object} data contains data fields for requesting permission from the patient
	 * to view a prescription
	 * @method Patient.askForPermission
	 * @return {object} response standard api response
	 */
	askForPermission(data) {
		if (!data || !data.requestor || !data.id) {
			return { error: 'input is missing', message: 'Either id or requestor field is missing', result: false };
		}
		const { prescriptions } = db.get('users').find({ name: 'patient' }).value();
		const prescription = _.find(prescriptions, { id: data.id });
		const index = _.findIndex(prescriptions, { id: data.id });
		if (data.requestor === 'doctor' && prescription.isApprovedForDoctor === 'no') {
			prescription.isApprovedForDoctor = 'pending';
		}
		if (data.requestor === 'pharmacist' && prescription.isApprovedForPharmacist === 'no') {
			prescription.isApprovedForPharmacist = 'pending';
		}
		prescriptions.splice(index, 1, prescription);
		try {
			db.get('users').find({ name: 'patient' }).assign({ prescriptions }).value();
		} catch (e) {
			return { error: 'error in updating permission', message: 'prescription permission could not be updated', result: false };
		}
		return { error: null, message: 'prescription updated successfully', result: true };
	}

	/**
	 * function approves a prescription on behalf of the patient. id field is used
	 * @param {object} data contains data fields for approving a permission based in the given id
	 * @method Patient.approvePrescription
	 * @return {object} response standard api response
	 */
	approvePrescription(data) {
		if (!data || !data.id) {
			return { error: 'input is missing', message: 'Some or all fields are missing', result: false };
		}
		const { prescriptions } = db.get('users').find({ name: 'patient' }).value();
		const prescription = _.find(prescriptions, { id: data.id });
		const index = _.findIndex(prescriptions, { id: data.id });
		if (data.approveForDoctor && data.approveForDoctor === 'yes' && prescription.isApprovedForDoctor === 'pending') {
			prescription.isApprovedForDoctor = 'yes';
		} else if (data.approveForPharmacist && data.approveForPharmacist === 'yes' && prescription.isApprovedForPharmacist === 'pending') {
			prescription.isApprovedForPharmacist = 'yes';
		}
		prescriptions.splice(index, 1, prescription);
		try {
			db.get('users').find({ name: 'patient' }).assign({ prescriptions }).value();
		} catch (e) {
			return { error: 'error in approving prescription', message: 'prescription could not be approved. database failure', result: false };
		}
		return { error: null, message: 'prescription approved successfully', result: true };
	}
}

module.exports = Patient;
