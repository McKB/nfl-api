const teams = require('../teams')

const getAllTeams = (req, res) => {
  return res.status(200).send(teams)
}

const getTeamByID = (req, res) => {
  return res.status(200).send('TO DO: /team/IDcontroller')
}

module.exports = { getAllTeams, getTeamByID }
