import { Router } from 'express'

import { validateMovie, validatePartialMovie } from '../schemas/movies.js'
import { MovieModel } from '../models/movie.js'

export const movieRouter = Router()

movieRouter.get('/', async (req, res) => {
  const { genre } = req.query
  const movies = await MovieModel.getAll({ genre })
  res.json(movies)
})

movieRouter.get('/:id', async (req, res) => {
  const { id } = req.params
  const movie = await MovieModel.getById({ id })
  if (movie) return res.json(movie)
  res.status(404).json({ error: 'Movie not found' })
})

movieRouter.post('/', async (req, res) => {
  const result = validateMovie(req.body)

  if (!result.success) {
    return res.status(400).json({ error: JSON.parse(result.error.message) })
  }

  const newMovie = await MovieModel.create({ input: result.data })
  res.status(201).json(newMovie)
})

movieRouter.delete('/', async (req, res) => {
  const { id } = req.params

  const result = await MovieModel.delete({ id })
  if (!result) return res.status(404).json({ error: 'Movie not found' })
  res.status(204).json({ message: 'Movie deleted' })
})

movieRouter.patch('/', async (req, res) => {
  const result = validatePartialMovie(req.body)

  if (!result.success) {
    return res.status(400).json({ error: JSON.parse(result.error.message) })
  }

  const { id } = req.params
  const updateMovieRes = await MovieModel.update({ id, input: result.data })

  if (updateMovieRes === false) {
    return res.status(404).json({ error: 'Movie not found' })
  }

  return res.json(updateMovieRes)
})
