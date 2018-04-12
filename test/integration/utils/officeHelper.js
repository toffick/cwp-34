const app = require('../../../AppManager');
const request = require('supertest');

module.exports = (db, config) => {

	const server = app(db, config);
	const testInstance = request(server);

	return {
		getOffices: () => testInstance
				.get('/offices')
				.expect(200)
				.then((res) => res.body)
		,
		getOffice: (id) =>
				testInstance
						.get(`/offices/${id}`)
						.expect(200)
						.then((res) => res.body)
		,
		createOffice: (hero) =>
				testInstance
						.post('/offices')
						.send(hero)
						.expect(201)
						.then((res) => res.body)
		,
		updateOffice: (hero) =>
				testInstance
						.put(`/offices/${hero.id}`)
						.send(hero)
						.expect(200)
						.then((res) => res.body)
		,
		deleteOffice: (hero) =>
				testInstance
						.delete(`/offices/${hero.id}`)
						.expect(200)
						.then((res) => res.body)
	}
};
