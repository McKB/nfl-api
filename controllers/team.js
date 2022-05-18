const { teams } = require('../models/index')
// const Sequelize = require('sequelize')

const getAllTeams = async (req, res) => {
  const allTeams = await teams.findAll()

  return res.status(200).send(allTeams)
}

const getTeamByID = async (req, res) => {
  const searchedId = req.params.id

  const foundTeam = await teams.findOne({
    where: { id: searchedId }
  })

  if (foundTeam) {
    return res.status(200).send(foundTeam)
  } else {
    return res.status(404).send('Team not found :/')
  }
}


const addTeam = async (req, res) => {
  const {
    location, mascot, abbreviation, conference, division
  } = req.body

  if (!location || !mascot || !abbreviation || !conference || !division) {
    // eslint-disable-next-line max-len
    return res.status(400).send('the following fields are required: location, mascot, abbreviation, conference, division')
  }

  const newTeam = await teams.create({
    location, mascot, abbreviation, conference, division
  })

  return res.status(201).send(newTeam)
}

// const findId = () => {
//   let newId = teams.length + 1

//   return newId
// }

module.exports = { getAllTeams, getTeamByID, addTeam }
