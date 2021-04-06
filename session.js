const { Sequelize, Model, DataTypes } = require('sequelize');
const sequelize = new Sequelize('sqlite::memory:');

class Sessions extends Model {}
Sessions.init({
  user: DataTypes.STRING,
  timeOfLogin: DataTypes.DATE
}, { sequelize, modelName: 'user' });

(async () => {
    await sequelize.sync()
})()

let sessions = {
    Sessions: Sessions,
}


module.exports = sessions