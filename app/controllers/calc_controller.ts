import * as Express from 'express'
import * as CalcView from '../views/calc_view'
import * as CalcModel from '../models/calc_model'

type HttpErrorResponse = {
  status: number;
  errorMessage: string;
}
type CalcResponse = CalcView.CalcResult | HttpErrorResponse

export function Calc(req: Express.Request, res: Express.Response<CalcResponse>): Express.Response<CalcView.CalcResult> {
  const { operator, secondNumber, firstNumber } = req.body
  // Check operator
  if (!Object.values(CalcModel.Operator).includes(operator)) {
    return res.status(422).send({
      status: 422,
      errorMessage: 'Invalid operator'
    })
  }

  const result = CalcModel.calculate({ firstNumber, secondNumber, operator })
  return res.json(CalcView.calcResultView(result))
}
