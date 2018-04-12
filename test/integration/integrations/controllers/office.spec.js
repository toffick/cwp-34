const repo = require('../../../mocks/repository');
const officeHelper = require('../../utils/officeHelper');
const officesData = require('../../data/offices');
const config = require('../../data/test_config');

describe('controllers/offices', () => {

	let helper;
	let rofficesRepo;

	beforeEach(() => {
		rofficesRepo = repo(officesData);
		helper = officeHelper({offices: rofficesRepo}, config);
	})

	it('get all', async () => {
		expect.assertions(1);

		const offices = await helper.getOffices();
		console.log(offices);
		expect(offices).toEqual(officesData);
	});
});
s
