export type HttpError = {
  statusCode: number;
  errorMessage: string;
}

export function errorMapper(err: Error): HttpError {
  switch (err.name) {
    case 'DivideByZeroError':
      return { statusCode: 422, errorMessage: err.message }
    default:
      return { statusCode: 500, errorMessage: 'Internal error' }
  }
}
