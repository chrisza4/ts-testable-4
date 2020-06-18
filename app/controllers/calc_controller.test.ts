jest.mock('../models/calc_model.ts')
import * as Express from 'express'
import { mocked } from 'ts-jest/utils'
import * as CalcModel from '../models/calc_model'
import * as CalcController from './calc_controller'

const MockedCalcModel = mocked(CalcModel)

function createMockedExpressRequest(body: any): Express.Request {
  return {
    body
  } as Express.Request
}

function createMockedExpressResponse<T>(): Express.Response<T> {
  let statusCode = 200
  let sentPayload: any = { }
  return {
    send(body: any): void {
      sentPayload = body
    },

    status(code: number): any  {
      statusCode = code
      return this
    },

    json(body: any): void {
      sentPayload = body
    },

    getCode () {
      return statusCode
    },

    getSentPayload () {
      return sentPayload
    }
  } as unknown as Express.Response<T>
}

type MockedResponse = {
  getCode: () => number;
  getSentPayload: () => any;
}

describe('CalcController', () => {
  describe('Calc', () => {
    it('Return 422 if operator is not valid', async () => {
      const mockedResponse = createMockedExpressResponse()
      await CalcController.Calc(createMockedExpressRequest({
        firstNumber: 1,
        secondNumber: 2,
        operator: 'hahaha'
      }), mockedResponse)
      const mockedResponseAsserter: MockedResponse = mockedResponse as unknown as MockedResponse
      expect(mockedResponseAsserter.getCode()).toEqual(422)
      expect(mockedResponseAsserter.getSentPayload()).toEqual({
        success: false,
        errorMessage: 'Invalid operator'
      })
    })

    it('Response with whatever Model say', async () => {
      MockedCalcModel.calculate.mockReturnValue(5)
      const mockedResponse = createMockedExpressResponse()
      await CalcController.Calc(createMockedExpressRequest({
        firstNumber: 1,
        secondNumber: 2,
        operator: '+'
      }), mockedResponse)
      const mockedResponseAsserter: MockedResponse = mockedResponse as unknown as MockedResponse
      expect(mockedResponseAsserter.getSentPayload()).toEqual({
        success: true,
        result: 5
      })
    })
  })

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
})

