export enum Operation {
  Add = '+',
  Substract = '-',
  Multiply = '*',
  Divide = '/',
  Power = '^'
}

export function calc(firstNumber: number, secondNumber: number, operation: Operation): number {
  switch (operation) {
    case '+':
      return firstNumber + secondNumber
    case '-':
      return firstNumber - secondNumber
    case '*':
      return firstNumber * secondNumber
    case '^':
    return firstNumber ** secondNumber
    case '/':
    default:
      return firstNumber / secondNumber
  }
}
