import { Router } from 'express'

import { validateMovie, validatePartialMovie } from '../schemas/movies.js'
import { MovieModel } from '../models/movie.js'

export const movieRouter = Router()

movieRouter.get('/', async (req, res) => {
  try {
    const { genre } = req.query
    const movies = await MovieModel.getAll({ genre })
    res.json(movies)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

movieRouter.get('/:id', async (req, res) => {
  try {
    const { id } = req.params
    const movie = await MovieModel.getById({ id })
    if (movie) return res.json(movie)
    res.status(404).json({ error: 'Movie not found' })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

movieRouter.post('/', async (req, res) => {
  try {
    const result = validateMovie(req.body)

    if (!result.success) {
      return res.status(400).json({ error: JSON.parse(result.error.message) })
    }

    const newMovie = await MovieModel.create({ input: result.data })
    res.status(201).json(newMovie)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

movieRouter.delete('/', async (req, res) => {
  try {
    const { id } = req.params
    const deleteMovieRes = await MovieModel.delete({ id })

    if (deleteMovieRes === false) {
      return res.status(404).json({ error: 'Movie not found' })
    }

    return res.json(deleteMovieRes)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

movieRouter.patch('/', async (req, res) => {
  try {
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
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})
