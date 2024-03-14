import z from 'zod'

const bookSchema = z.object({
  name: z.string({
    invalid_type_error: 'Book name must be a string',
    required_error: 'Book tittle is required'
  }),
  description: z
    .string({
      invalid_type_error: 'Book description must be a string',
      required_error: 'Book description is required'
    })
    .min(10)
    .max(40),
  genres: z.array(
    z.enum([
      'Fiction',
      'Classic',
      'American Literature',
      'Romance',
      'British Literature',
      'Drama',
      'Southern U.S. Literature',
      'Dystopian',
      'Political Fiction',
      'Fantasy',
      'Adventure'
    ]),
    {
      required_error: 'Book genre is required',
      invalid_type_error: 'Book genre is not valid'
    }
  ),
  stock: z.boolean({
    required_error: 'stock is required',
    invalid_type_error: 'stock require boolean input'
  })
})

export function validateBook(input) {
  return bookSchema.safeParse(input)
}

export function validatePartialBook(input) {
  return bookSchema.partial().safeParse(input)
}
