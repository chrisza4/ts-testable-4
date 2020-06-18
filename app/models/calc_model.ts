import * as CalcError from './calc_error'
export enum Operator {
  Plus = '+',
  Minus = '-',
  Multiply = '*',
  Divide = '/'
}

type CalculateModel = {
  firstNumber: number;
  secondNumber: number;
  operator: Operator;
}

export function calculate(input: CalculateModel): number {
  const { operator, firstNumber, secondNumber } = input
  if (operator === Operator.Divide && secondNumber === 0) {
    throw new CalcError.DivideByZeroError()
  }
  switch (operator) {
    case '+':
      return firstNumber + secondNumber
    case '-':
      return firstNumber - secondNumber
    case '*':
      return firstNumber * secondNumber
    case '/':
      return firstNumber / secondNumber
  }
  return 0
}
