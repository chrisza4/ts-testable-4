export class ValidateError extends Error {
  statusCode: number
  constructor (message: string, statusCode: number) {
    super(message)
    Object.setPrototypeOf(this, ValidateError.prototype)
    this.name = 'ValidateError'
    this.statusCode = statusCode
  }
}
