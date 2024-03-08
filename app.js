import express, { json } from 'express'

const app = express()
const PORT = process.env.PORT || 3000

app.disable('x-powered-by')
app.use(json())

app.get('/movies', TODO)

app.get('/movies/:id', TODO)

app.post('/movies', TODO)

app.patch('/movies/:id', TODO)

app.delete('/movies/:id', TODO)

app.listen(PORT, () => {
  console.log(`server listening on port http://localhost:${PORT}`)
})
