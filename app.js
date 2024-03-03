const express = require('express')
const crypto = require('node:crypto')
const movies = require('./movies.json')

const app = express()
const PORT = process.env.PORT || 3000

app.disable('x-powered-by')
app.use(app.use(express.json()))

app.get('/movies', (req, res) => {
    const { genre } = req.query
    if (genre) {
        const filteredMovies = movies.filter((movie) =>
            movie.genre.some((g) => g.toLowerCase() === genre.toLowerCase())
        )
        return res.json(filteredMovies)
    }
    res.json(movies)
})

app.get('/movies/:id', (req, res) => {
    const { id } = req.params
    const movie = movies.find((movie) => movie.id === id)
    if (movie) return res.json(movie)
    res.status(404).json({ error: 'Movie not found' })
})

app.post('/movies', (req, res) => {
    const { tittle, genre, year, director, duration, rate, poster } = req.body

    const newMovie = {
        id: crypto.randomUUID,
        tittle,
        genre,
        year,
        director,
        duration,
        rate: rate ?? 0,
        poster
    }
    movies.push(newMovie)

    res.status(201).json(newMovie)
})

app.listen(PORT, () => {
    console.log(`server listening on port http://localhost:${PORT}`)
})
