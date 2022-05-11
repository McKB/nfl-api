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


const addTeam = (req, res) => {
  const {
    location, mascot, abbreviation, conference, division
  } = req.body

  if (!location || !mascot || !abbreviation || !conference || !division) {
    // eslint-disable-next-line max-len
    return res.status(400).send('the following fields are required: location, mascot, abbreviation, conference, division')
  }

  const newTeam = {
    id: findId(), location, mascot, abbreviation, conference, division
  }

  teams.push(newTeam)

  return res.status(201).send(newTeam)
}

const findId = () => {
  let newId = teams.length + 1

  return newId
}

module.exports = { getAllTeams, getTeamByID, addTeam }
