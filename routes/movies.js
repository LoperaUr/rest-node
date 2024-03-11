import { Router } from 'express'

import { MovieController } from '../controllers/movie.js'
export const movieRouter = Router()

movieRouter.get('/', MovieController.getAll)
movieRouter.post('/', MovieController.create)

movieRouter.get('/:id', MovieController.getById)
movieRouter.delete('/:id', MovieController.delete)
movieRouter.patch('/:id', MovieController.update)
