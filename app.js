const express = require('express')
const crypto = require('node:crypto')
const movies = require('./movies.json')
const z = require('zod')

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
    const movieSchema = z.object({
        title: z.string({
            invalid_type_error: 'movie title must be a string',
            required_error: 'movie title is required'
        }),
        year: z.number().int().min(1888).max(2077),
        director: z.string(),
        duration: z.number().min(1).max(10),
        rate: z.number().min(0).max(10),
        poster: z.string().url(),
        genre: z.array(
            z.enum(['Adventure', 'Drama', 'Sci-Fi', 'Action', 'Animation', 'Romance', 'Biography', 'Fantasy']),
            {
                required_error: 'genre is required',
                invalid_type_error: 'genre must be an array of strings'
            }
        )
    })
    const { title, genre, year, director, duration, rate, poster } = req.body

    const newMovie = {
        id: crypto.randomUUID,
        title,
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
