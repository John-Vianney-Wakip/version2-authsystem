const { Sequelize, Model, DataTypes } = require('sequelize');
const sequelize = new Sequelize('sqlite::memory:');

class Users extends Model {}
Users.init({
  username: DataTypes.STRING,
  password: DataTypes.STRING
}, { sequelize, modelName: 'user' });

(async () => {
    await sequelize.sync()
})()

let users = {
    Users: Users,
}


module.exports = users