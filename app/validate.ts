import { Operation } from './calc'
import { ValidateError } from './custom-error'

type Validate = {
  statusCode: number,
  message: string
}

export async function numberValidate (firstNumber: any, secondNumber: any): Promise<Validate> {
  if (isNaN(firstNumber)) {
    throw new ValidateError('Parameter firstNumber must be number.', 422)
  }

  if (isNaN(secondNumber)) {
    throw new ValidateError('Parameter secondNumber must be number.', 422)
  }

  return {
    statusCode: 200,
    message: 'Success.'
  }
}

export async function operationValidate (operation: any): Promise<Validate> {
  const allowedOperation = Object.values(Operation)
  if (!allowedOperation.includes(operation)) {
    throw new ValidateError('Input invalid operation.', 422)
  }
  return {
    statusCode: 200,
    message: 'Success.'
  }
}
