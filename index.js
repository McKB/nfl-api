const express = require('express')
const { getAllTeams, getTeamByID } = require('./controllers/team')
const app = express()

app.get('/team', getAllTeams)

app.get('/team/:id', getTeamByID)

app.listen(1337, () => {
  console.log('listening on http://localhost:1337...') // eslint-disable-line no-console
})
