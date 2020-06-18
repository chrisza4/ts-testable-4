import * as ControllerError from './controller_error'
import * as ControllerHelper from './controller_helper'

describe('mapHttpError', () => {
  it('Given ValidationError, return 422', () => {
    const err = new ControllerHelper.ValidationError('Invalid input for some reason')
    const actual = ControllerError.mapHttpError(err)
    expect(actual.statusCode).toEqual(422)
    expect(actual.errorMessage).toEqual('Invalid input for some reason')
  })

  it('Given other error, return 500', () => {
    const err = new Error('Super Error')
    const actual = ControllerError.mapHttpError(err)
    expect(actual.statusCode).toEqual(500)
    expect(actual.errorMessage).toEqual('Super Error')
  })
})
