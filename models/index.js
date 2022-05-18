const Sequelize = require('sequelize')
const teamsModel = require('./team')

const connection = new Sequelize('nfl', 'nfl_user', 'nfl', {
  host: 'localhost',
  dialect: 'mysql'
})

const teams = teamsModel(connection, Sequelize)

module.exports = { teams }
