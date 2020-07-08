import { numberValidate, operationValidate } from '../app/validate'
import { ValidateError } from '../app/custom-error'

describe('Number Validate', () => {
  it('Return error to true when firstNumber is not number', async () => {
    expect.assertions(3)
    try {
      await numberValidate('not_number', 2)
    } catch (err) {
      expect(err).toBeInstanceOf(ValidateError)
      expect(err.statusCode).toEqual(422)
      expect(err.message).toEqual('Parameter firstNumber must be number.')
    }
  })

  it('Return error to true when secondNumber is not number', async () => {
    expect.assertions(3)
    try {
      await numberValidate(3, 'not_number')
    } catch (err) {
      expect(err).toBeInstanceOf(ValidateError)
      expect(err.statusCode).toEqual(422)
      expect(err.message).toEqual('Parameter secondNumber must be number.')
    }
  })

  it('Return success when input valid number', async () => {
    expect.assertions(2)
    const result = await numberValidate(3, 2)
    expect(result.statusCode).toEqual(200)
    expect(result.message).toEqual('Success.')
  })
})

describe('Operation Validate', () => {
  it('Return error when input invalid operation', async () => {
    expect.assertions(3)
    try {
      await operationValidate('invalid_operation')
    } catch (err) {
      expect(err).toBeInstanceOf(ValidateError)
      expect(err.statusCode).toEqual(422)
      expect(err.message).toEqual('Input invalid operation.')
    }
  })

  it('Return success when input valid operation', async () => {
    expect.assertions(2)
    const result = await operationValidate('*')
    expect(result.statusCode).toEqual(200)
    expect(result.message).toEqual('Success.')
  })
})
