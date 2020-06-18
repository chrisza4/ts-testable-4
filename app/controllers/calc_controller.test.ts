jest.mock('../models/calc_model.ts')
import { mocked } from 'ts-jest/utils'
import * as CalcModel from '../models/calc_model'
import * as CalcController from './calc_controller'

const MockedCalcModel = mocked(CalcModel)

describe('CalcController', () => {
  it('Return result from model', async () => {
    MockedCalcModel.calculate.mockReturnValue(5)
    const actual = await CalcController.CalcController({
      firstNumber: 1,
      secondNumber: 2,
      operator: CalcModel.Operator.Plus
    })
    expect(actual.success).toBeTruthy()
    if (!actual.success) {
      return fail()
    }
    expect(actual.result).toEqual(5)
  })
})
