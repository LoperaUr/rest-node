import express, { json } from 'express'
import { movieRouter } from './routes/movies.js'
import { corsMiddleware } from './middlewares/cors.js'

const app = express()
const PORT = process.env.PORT || 3000

app.use(json())
app.use(corsMiddleware())
app.use('/movies', movieRouter)

app.listen(PORT, () => {
  console.log(`server listening on port http://localhost:${PORT}`)
})
