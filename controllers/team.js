const teams = require('../teams')

const getAllTeams = (req, res) => {
  return res.status(200).send(teams)
}

const getTeamByID = (req, res) => {
  const id = parseInt(req.params.id)
  const team = teams.find((team) => team.id === id)

  if (team) {
    return res.status(200).send(team)
  } else {
    return res.status(404).send('Team not found :/')
  }
}

module.exports = { getAllTeams, getTeamByID }
