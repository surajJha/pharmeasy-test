/**
 * Created by surajjha on 03/06/18.
 */

const Patient = require('../Patient');


const patient = new Patient();

describe('Testing getPrescriptions functionality', () => {
	it('returns correct prescriptions for the user type patient', async () => {
		const result = patient.getPrescriptions();
		expect(result).not.toBeNull();
		expect(typeof result).toBe('object');
		expect(typeof result.message).toBe('string');
		expect(result.error).toBeNull();
		expect(result.message).toEqual('Prescriptions fetched successfully');
	});
});

describe('Testing createPrescription functionality', () => {
	it('returns correct prescriptions for the user type patient', async () => {
		const input = {
			isApprovedForDoctor: 'yes',
			isApprovedForPharmacist: 'yes',
			period: 'Jan 2018 - Jan 2018',
			medicines: [
				{
					name: 'Paracetamol',
					qty: '5 mg',
					dosage: 'twice a day',
				},
				{
					name: 'Amoxilin',
					qty: '5 mg',
					dosage: 'Twice a day',
				},
			],
		};
		const result = patient.createPrescription(input);
		expect(result).not.toBeNull();
		expect(result.error).toBeNull();
		expect(typeof result.message).toBe('string');
		expect(typeof result.result).toBe('boolean');
		expect(result.result).toEqual(true);
		expect(result.message).toEqual('New prescription was created successfully');
	});

	it('returns correct error response when the input JSON is missing some Required fields', async () => {
		const input = {
			isApprovedForPharmacist: 'yes',
			period: 'Jan 2018 - Jan 2018',
			medicines: [
				{
					name: 'Paracetamol',
					qty: '5 mg',
					dosage: 'twice a day',
				},
				{
					name: 'Amoxilin',
					qty: '5 mg',
					dosage: 'Twice a day',
				},
			],
		};
		const result = patient.createPrescription(input);
		expect(result).not.toBeNull();
		expect(result.error).not.toBeNull();
		expect(typeof result.message).toBe('string');
		expect(typeof result.result).toBe('boolean');
		expect(result.result).toEqual(false);
		expect(result.message).toEqual('some or all required fields are missing');
	});

	it('returns correct error response when the input is null', async () => {
		const input = null;
		const result = patient.createPrescription(input);
		expect(result).not.toBeNull();
		expect(result.error).not.toBeNull();
		expect(typeof result.message).toBe('string');
		expect(typeof result.result).toBe('boolean');
		expect(result.result).toEqual(false);
		expect(result.message).toEqual('some or all required fields are missing');
	});
});

describe('Testing askForPermission functionality', () => {
	it('returns correct prescriptions for the user type patient', async () => {
		const input = { id: 3, isApproved: 'pending', requestor: 'pharmacist' };
		const result = patient.askForPermission(input);
		expect(result).not.toBeNull();
		expect(typeof result).toBe('object');
		expect(typeof result.message).toBe('string');
		expect(result.error).toBeNull();
		expect(result.message).toEqual('prescription updated successfully');
	});

	it('returns correct error response for incorrect input', async () => {
		const input = { isApproved: 'pending', requestor: 'pharmacist' };
		const result = patient.askForPermission(input);
		expect(result).not.toBeNull();
		expect(typeof result).toBe('object');
		expect(typeof result.error).toBe('string');
		expect(typeof result.message).toBe('string');
		expect(result.error).not.toBeNull();
		expect(result.error).toEqual('input is missing');
		expect(result.result).toEqual(false);
		expect(result.message).toEqual('Either id or requestor field is missing');
	});
});

describe('Testing approvePrescription functionality', () => {
	it('returns correct prescriptions for the user type patient', async () => {
		const input = { id: 3, approveForPharmacist: 'yes' };
		const result = patient.approvePrescription(input);
		expect(result).not.toBeNull();
		expect(typeof result).toBe('object');
		expect(typeof result.message).toBe('string');
		expect(result.error).toBeNull();
		expect(result.message).toEqual('prescription approved successfully');
	});

	it('returns correct error response for incorrect input', async () => {
		const input = { approveForPharmacist: 'yes' };
		const result = patient.approvePrescription(input);
		expect(result).not.toBeNull();
		expect(typeof result).toBe('object');
		expect(typeof result.error).toBe('string');
		expect(typeof result.message).toBe('string');
		expect(result.error).not.toBeNull();
		expect(result.error).toEqual('input is missing');
		expect(result.result).toEqual(false);
		expect(result.message).toEqual('Some or all fields are missing');
	});
});
