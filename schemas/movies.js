const z = require('zod')

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
    genre: z.array(z.enum(['Adventure', 'Drama', 'Sci-Fi', 'Action', 'Animation', 'Romance', 'Biography', 'Fantasy']), {
        required_error: 'genre is required',
        invalid_type_error: 'genre must be an array of strings'
    })
})

function validateMovie(movie) {
    return movieSchema.safeParse(movie)
}

module.exports = {
    validateMovie
}
