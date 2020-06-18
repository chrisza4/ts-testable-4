import * as Express from 'express'
import * as CalcView from '../views/calc_view'
import * as CalcModel from '../models/calc_model'
import * as ControllerHelper from './controller_helper'

export type CalcRequest = {
  operator: CalcModel.Operator;
  firstNumber: number;
  secondNumber: number;
}

// export function Calc(req: Express.Request, res: Express.Response<CalcView.CalcResult>): Express.Response<CalcView.CalcResult> {
//   const { operator, secondNumber, firstNumber } = req.body
//   if (!Object.values(CalcModel.Operator).includes(operator)) {
//     return res.status(422).send({
//       success: false,
//       errorMessage: 'Invalid operator'
//     })
//   }

//   const result = CalcModel.calculate({ firstNumber, secondNumber, operator })
//   return res.json(CalcView.calcResultView(result))
// }

// What we want

const calcValidator: ControllerHelper.Validator<CalcRequest> = (body, queryString, params) => {
  const { operator, secondNumber, firstNumber } = body
  if (!Object.values(CalcModel.Operator).some(a => a === operator)) {
    return { errorMessage: 'Invalid operator'}
  }
  if (typeof secondNumber !== 'number') {
    return { errorMessage: 'Invalid Number'}
  }
  if (typeof firstNumber !== 'number') {
    return { errorMessage: 'Invalid Number'}
  }
  return {
    operator: operator as CalcModel.Operator,
    secondNumber: secondNumber,
    firstNumber: firstNumber
   }
}
export async function CalcController(input: CalcRequest): Promise<CalcView.CalcResult> {
  const { firstNumber, secondNumber, operator } = input
  const result = CalcModel.calculate({ firstNumber, secondNumber, operator })
  return CalcView.calcResultView(result)
}

export const Calc = ControllerHelper.createExpressHandler({
  validator: calcValidator,
  handler: CalcController
})
