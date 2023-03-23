// * Unauthorized class
// Status: 401 UNAUTHORIZED
// Default message: 'Unauthorized'
export class Unauthorized extends Error {
  constructor(message = 'Unauthorized'){
    super(message)
    this.name = 'Unauthorized'
    this.status = 401
  }
}

// * NotFound class
// Status: 404 NOT FOUND
// Default message: 'Resource Not Found'
export class NotFound extends Error {
  constructor(message = 'Resource Not Found'){
    super(message)
    this.name = 'NotFoundError'
    this.status = 404
  }
}

export const sendError = (err, res) => {
  console.log(err.status)
  console.log(err.message)
  if (err.status) return res.status(err.status).json({ message: err.message })
  return res.status(422).json({ message: err.message })
}