import express, { json } from 'express'
import { randomUUID } from 'node:crypto'

import movies from './movies.json' with { type: 'json' }
import { validateMovie, validatePartialMovie } from './schemas/movies.js'

const app = express()
const PORT = process.env.PORT || 3000

app.disable('x-powered-by')
app.use(json())

app.get('/movies', (req, res) => {
    res.header('Access-Control-Allow-Origin', '*')
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
    const result = validateMovie(req.body)

    if (!result.success) {
        return res.status(400).json({ error: JSON.parse(result.error.message) })
    }

    const newMovie = {
        id: randomUUID(),
        ...result.data
    }

    movies.push(newMovie)
    res.status(201).json(newMovie)
})

app.patch('/movies/:id', (req, res) => {
    const result = validatePartialMovie(req.body)

    if (!result.success) {
        return res.status(400).json({ error: JSON.parse(result.error.message) })
    }

    const { id } = req.params
    const movieIndex = movies.findIndex((movie) => movie.id === id)

    if (movieIndex === -1) {
        return res.status(404).json({ error: 'Movie not found' })
    }

    const updateMovie = {
        ...movies[movieIndex],
        ...result.data
    }
    return res.json(updateMovie)
})

app.delete('/movies/:id', (req, res) => {
    res.header('Access-Control-Allow-Origin', '*')

    const { id } = req.params
    const movieIndex = movies.findIndex((movie) => movie.id === id)

    if (movieIndex === -1) {
        return res.status(404).json({ error: 'Movie not found' })
    }

    movies.splice(movieIndex, 1)

    res.status(204).json({ message: 'Movie deleted' })
})

app.options('/movies/:id', (req, res) => {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE')
    res.header('Access-Control-Allow-Headers', 'Content-Type')
    res.end()
})

app.listen(PORT, () => {
    console.log(`server listening on port http://localhost:${PORT}`)
})
