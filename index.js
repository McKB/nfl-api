const express = require('express')
const app = express()

app.get('/team', (req, res) => {
  return res.status(200).send('TO DO: /team controller')
})

app.get('/team/:id', (req, res) => {
  return res.status(200).send('TO DO: /team/ID controller')
})

app.listen(1337, () => {
  console.log('listening on http://localhost:1337...') // eslint-disable-line no-console
})
