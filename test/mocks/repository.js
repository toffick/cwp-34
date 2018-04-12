module.exports = (data) => {
	const mock = {
		findAll: jest.fn((params) => Promise.resolve(data)),

		findById: jest.fn((id) => Promise.resolve(data[id])),

		create: jest.fn((item) => ({get: () => Promise.resolve(item)})),

		update: jest.fn((item) => Promise.resolve([1, [item]])),

		destroy: jest.fn(() => Promise.resolve(1))
	};

	mock.mockClear = () => {
		mock.findAll.mockClear();
		mock.findById.mockClear();
		mock.create.mockClear();
		mock.update.mockClear();
		mock.destroy.mockClear();
	};

	mock.data = data;

	return mock;
};
