const { teams } = require('../models/index')
// const Sequelize = require('sequelize')

const getAllTeams = async (req, res) => {
  try {
    const allTeams = await teams.findAll()

    return res.status(200).send(allTeams)
  }
  catch (error) {
    return res.sendStatus(500)
  }
}

const getTeamByID = async (req, res) => {
  try {
    const searchedId = req.params.id

    if (!searchedId) return res.sendStatus(404)

    const foundTeam = await teams.findOne({
      where: { id: searchedId }
    })

    if (foundTeam) {
      return res.status(200).send(foundTeam)
    } else {
      return res.sendStatus(404)
    }
  } catch (error) {
    return res.sendStatus(500)
  }
}


const addTeam = async (req, res) => {
  try {
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
  } catch (error) {
    return res.sendStatus(500)
  }
}

// const findId = () => {
//   let newId = teams.length + 1

//   return newId
// }

module.exports = { getAllTeams, getTeamByID, addTeam }
