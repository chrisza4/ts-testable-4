import * as CalcView from '../views/calc_view'
import * as CalcModel from '../models/calc_model'
import * as ControllerHelper from './controller_helper'

export type CalcRequest = {
  operator: CalcModel.Operator;
  firstNumber: number;
  secondNumber: number;
}

export async function CalcController(input: CalcRequest): Promise<CalcView.CalcResult> {
  const { firstNumber, secondNumber, operator } = input
  if (!Object.values(CalcModel.Operator).some(a => a === operator)) {
    throw new ControllerHelper.ValidationError('Invalid operator')
  }
  if (typeof secondNumber !== 'number') {
    throw new ControllerHelper.ValidationError('Invalid Number')
  }
  if (typeof firstNumber !== 'number') {
    throw new ControllerHelper.ValidationError('Invalid Number')
  }
  const result = CalcModel.calculate({ firstNumber, secondNumber, operator })
  return CalcView.calcResultView(result)
}

export const Calc = ControllerHelper.createExpressHandler(CalcController)
