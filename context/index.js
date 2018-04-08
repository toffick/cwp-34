module.exports = (Sequelize, config) => {

	const dbConfig = config.db[process.env.NODE_ENV || 'development'];
	const sequelize = new Sequelize(dbConfig.name,
			dbConfig.user, dbConfig.pass, dbConfig.options);

	const Property = require('../models/property')(Sequelize, sequelize);
	const Offices = require('../models/offices')(Sequelize, sequelize);
	const Agents = require('../models/agents')(Sequelize, sequelize);

	Agents.hasMany(Property, {foreignKey: 'agentId'});
	Property.belongsTo(Agents, {constraints: false, foreignKey: 'agentId'});

	Offices.hasMany(Agents, {foreignKey: 'officeId'});
	Agents.belongsTo(Offices, {constraints: false, foreignKey: 'officeId'});

	return {
		properties: Property,
		offices: Offices,
		agents: Agents,
		sequelize,
		Sequelize,
	};
};
