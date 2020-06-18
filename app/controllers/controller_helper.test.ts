import * as Express from 'express'
import * as ControllerHelper from './controller_helper'

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

describe('createExpressHandler', () => {
  it('Render 422 on payload validation error', async () => {
    const validator: ControllerHelper.Validator<unknown> = (body, queryString, params) => {
      return {
        errorMessage: 'Invalid input'
      }
    }
    const handler = async (a: unknown): Promise<unknown> => null

    const controller: ControllerHelper.Controller<unknown, unknown> = {
      validator, handler
    }

    const expressHandler = ControllerHelper.createExpressHandler(controller)
    const expressResponse = createMockedExpressResponse()
    await expressHandler(createMockedExpressRequest({}),  expressResponse)
    const mockResponse = expressResponse as unknown as MockedResponse
    expect(mockResponse.getCode()).toEqual(422)
    expect(mockResponse.getSentPayload()).toEqual({
      success: false,
      errorMessage: 'Invalid input'
    })
  })

  it('Render view on success', async () => {
    const validator: ControllerHelper.Validator<unknown> = (body, queryString, params) => 12
    const handler = async (a: number): Promise<unknown> => ({result: 'myresult'})
    const controller = {
      validator, handler
    }
    const expressHandler = ControllerHelper.createExpressHandler(controller)
    const expressResponse = createMockedExpressResponse()
    await expressHandler(createMockedExpressRequest({}),  expressResponse)
    const mockResponse = expressResponse as unknown as MockedResponse
    expect(mockResponse.getCode()).toEqual(200)
    expect(mockResponse.getSentPayload()).toEqual({
      success: true,
      result: 'myresult'
    })
  })
})
