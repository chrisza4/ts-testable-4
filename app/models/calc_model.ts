export enum Operator {
  Plus = '+',
  Minus = '-',
  Multiply = '*',
  Divide = '/'
}

export function calculate(firstNumber: number, secondNumber: number, operator: Operator): number {
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
