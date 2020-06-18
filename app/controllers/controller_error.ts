import * as CalcError from '../models/calc_error'
export type HttpError = {
  statusCode: number;
  errorMessage: string;
}

export function mapHttpError(err: Error): HttpError {
  const errorMapping = {
    'ValidationError': 422,
    'DivideByZeroError': 422
  }
  return {
    statusCode: errorMapping[err.name] || 500,
    errorMessage: err.message
  }
}
