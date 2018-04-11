const errors = require('../../../../helpers/errors');
const schemaProperty = require('../../../../schemas/property');
const PropertyService = require('../../../../services/property');
const {agents, properties} = require('../../data');
const repositoryMock = require('../../mocks/repository');

describe('service/property', () => {

	let agentsRepository;
	let repository;
	let instance;

	beforeEach(() => {
		repository = repositoryMock(agents());
		agentsRepository = repositoryMock(properties());

		instance = new PropertyService(repository, agentsRepository, schemaProperty, errors);
	});

	afterEach(() => {
		repository.mockClear();
		agentsRepository.mockClear();
	});

	describe('constructor', () => {
		it('success', async () => {
			expect(instance.repository).toEqual(repository);
			expect(instance.agentsRepository).toEqual(agentsRepository);
			expect(instance.schema).toEqual(schemaProperty);
			expect(instance.errors).toEqual(errors);
			expect(instance.defaults).toEqual({
				readChunk: {
					limit: 5,
					offset: 0,
					sortOrder: 'asc',
					sortField: 'id'
				}
			})
		});
	});

	describe('create', () => {

		let data;

		beforeEach(() => {
			data = {
				price: 10,
				currency: 'BYN',
				heading: 'koko',
				location: 'https://www.tut.by',
				agentId: 1
			}
		});

		it('should throw error if validation failed(agentId is string)', async () => {
			data.agentId = 'sdsd';
			try {
				await instance.create(data);
			} catch (e) {
				expect(e).toBeTruthy();
				expect(e.message).toEqual('"agentId" must be a number');
				expect(e.code).toEqual('validate_error');
				expect(e.status).toEqual(400);
				expect(repository.create).not.toHaveBeenCalled();
			}
		});

		it('should throw error if validation failed(price is negative)', async () => {
			data.price = -10;
			try {
				await instance.create(data);
			} catch (e) {
				expect(e).toBeTruthy();
				expect(e.message).toEqual('"price" must be a positive number');
				expect(e.code).toEqual('validate_error');
				expect(e.status).toEqual(400);
				expect(repository.create).not.toHaveBeenCalled();
			}
		});

		it('should return promise', async () => {
			const ret = instance.create(data);

			expect(ret).toBeInstanceOf(Promise);
		});

		it('should call db.create', async () => {
			const ret = await instance.create(data);

			expect(repository.create).toHaveBeenCalled();
			expect(repository.create.mock.calls[0][0]).toEqual(data);
			expect(ret).toEqual(data);
		});

	});

	describe('update', () => {
	});

	describe('addAgent', () => {
	});

	describe('removeAgent', () => {
	});

})
