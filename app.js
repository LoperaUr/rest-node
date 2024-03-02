const express = require('express')

const app = express()
const PORT = process.env.PORT || 3000
const movies = require('./movies.json')

app.disable('x-powered-by')

app.get('/movies', (req, res) => {
  res.json(movies)
})

app.listen(PORT, () => {
  console.log(`server listening on port http://localhost:${PORT}`)
})
