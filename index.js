const express = require('express')
const bodyparser = require('body-parser')
const { getAllTeams, getTeamByID, addTeam } = require('./controllers/team')
const app = express()

app.get('/teams', getAllTeams)

app.get('/teams/:id', getTeamByID)

app.post('/teams', bodyparser.json(), addTeam)

app.listen(1337, () => {
  console.log('listening on http://localhost:1337...') // eslint-disable-line no-console
})
