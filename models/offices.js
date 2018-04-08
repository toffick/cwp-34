module.exports = (Sequelize, sequelize) => {
    return sequelize.define('offices', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        title: { type: Sequelize.STRING },
        website: { type: Sequelize.STRING(1000) },
        address: { type: Sequelize.STRING },
    });
};
