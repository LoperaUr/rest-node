import { Router } from 'express'

import { BookController } from '../controllers/book.js'
export const booksRouter = Router()

booksRouter.get('/', BookController.getAll)
booksRouter.post('/', BookController.create)

booksRouter.get('/:id', BookController.getById)
booksRouter.put('/:id', BookController.update)
