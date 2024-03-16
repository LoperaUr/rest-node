import mysql from 'mysql2/promise'

const config = {
  host: 'localhost',
  user: 'root',
  password: '12345',
  port: 3306,
  database: 'moviesdb'
}

const conn = await mysql.createConnection(config)

export class MovieModel {
  static async getAll({ genre }) {
    const [movies] = await conn.query(
      'SELECT BIN_TO_UUID(id)"id", title, year, director, duration, poster, rate FROM movie;'
    )
    if (movies.length === 0) return null
    return movies
  }

  static async getById({ id }) {
    const [movie] = await conn.query(
      'SELECT BIN_TO_UUID(id)"id", title, year, director, duration, poster, rate FROM movie WHERE id = UUID_TO_BIN(?);',
      [id]
    )
    if (movie.length === 0) return null
    return movie[0]
  }

  static async create({ input }) {
    const { title, year, director, duration, poster, rate } = input
    const [uuidResult] = await conn.query('SELECT UUID() uuid;')
    const [{ uuid }] = uuidResult
    try {
      await conn.query(
        'INSERT INTO movie (id, title, year, director, duration, poster, rate) VALUES (UUID_TO_BIN(?), ?, ?, ?, ?, ?, ?);',
        [uuid, title, year, director, duration, poster, rate]
      )
    } catch (error) {
      console.error(error)
      return null
    }
    const [newMovie] = await conn.query(
      'SELECT BIN_TO_UUID(id)"id", title, year, director, duration, poster, rate FROM movie WHERE id = UUID_TO_BIN(?);',
      [uuid]
    )
    return newMovie[0]
  }

  static async delete({ id }) {
    const [deletedMovie] = await conn.query('DELETE FROM movie WHERE id = UUID_TO_BIN(?);', [id])
    if (deletedMovie.affectedRows === 0) return false
    return { id }
  }

  static async update({ id, input }) {
    const { title, year, director, duration, poster, rate } = input
    const [updatedMovie] = await conn.query(
      'UPDATE movie SET title = ?, year = ?, director = ?, duration = ?, poster = ?, rate = ? WHERE id = UUID_TO_BIN(?);',
      [title, year, director, duration, poster, rate, id]
    )
    if (updatedMovie.affectedRows === 0) return null
    const [movie] = await conn.query(
      'SELECT BIN_TO_UUID(id)"id", title, year, director, duration, poster, rate FROM movie WHERE id = UUID_TO_BIN(?);',
      [id]
    )
    return movie[0]
  }
}
