module.exports = (data) => {
	const mock = {
		findAll: jest.fn((params) => Promise.resolve(data)),

		findById: jest.fn((id) => Promise.resolve(data[id])),

		create: jest.fn((item) => {
			data.push(item);
			return {
				get: () => Promise.resolve(item)
			}
		}),

		update: jest.fn((item, obj) => {
			data[+obj.where.id] = item;
			return Promise.resolve([1, [item]]);
		}),

		destroy: jest.fn((obj) => {
			delete data[obj.where.id];
			return Promise.resolve(1);
		})
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
