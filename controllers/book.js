import { BookModel } from '../models/book.js'
import { validateBook, validatePartialBook } from '../schemas/book.js'

export class BookController {
  static async getAll(req, res) {
    const { genre } = req.query
    const books = await BookModel.getAll({ genre })
    res.json(books)
  }

  static async getById(req, res) {
    const { id } = req.params
    const book = await BookModel.getById({ id })
    if (book) return res.json(book)
    res.status(404).json({ error: 'Book not found in persistence' })
  }

  static async create(req, res) {
    const { resultOfSchema } = validateBook(req.body)
    if (!resultOfSchema.success) {
      return res.status(400).json({ error: JSON.parse(resultOfSchema.error.message) })
    }
    const newBook = await BookModel.create({ input: resultOfSchema.data })
    res.status(201).json(newBook)
  }

  static async update(req, res) {
    const resultOfSchema = validatePartialBook(req.body)

    if (!resultOfSchema.success) {
      return res.status(400).json({ error: JSON.parse(resultOfSchema.error.message) })
    }

    const { id } = req.params
    const updateBook = await BookModel.update({ id, input: resultOfSchema.data })
    return res.json(updateBook)
  }
}
