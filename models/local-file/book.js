import { randomUUID } from 'node:crypto'
import books from '../../books.json' assert { type: 'json' }

export class BookModel {
  static async getAll({ genre }) {
    if (genre) {
      return books.filter((book) => book.genre.some((g) => g.toLowerCase() === genre.toLowerCase()))
    }
    return books
  }

  static async getById({ id }) {
    const book = books.find((book) => book.id === id)
    return book
  }

  static async create({ input }) {
    const newBook = {
      id: randomUUID(),
      ...input
    }

    books.push(newBook)

    return newBook
  }

  static async delete({ id }) {
    const bookIndex = books.findIndex((book) => book.id === id)
    if (bookIndex === -1) return false

    books.splice(bookIndex, 1)
    return true
  }

  static async update({ id, input }) {
    const bookIndex = books.findIndex((book) => book.id === id)
    if (bookIndex === -1) return false

    books[bookIndex] = {
      ...books[bookIndex],
      ...input
    }

    return books[bookIndex]
  }
}
