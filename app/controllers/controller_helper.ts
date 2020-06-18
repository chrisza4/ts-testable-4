import * as Express from 'express'
import * as ControllerError from './controller_error'

export type Body = {[key: string]: string | number | undefined}
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type QueryString = any
export type Params = {[key: string]: string | number | undefined}

export type ExpressHandler = (req: Express.Request, res: Express.Response) => Promise<unknown>
export type ValidationError = {
  errorMessage: string;
}
export type Validator<T> = (body: Body, queryString: QueryString, params: Params) => T | ValidationError;

export type Controller<TIn, TOut> = {
  validator: Validator<TIn>;
  handler: (input: TIn) => Promise<TOut>;
}


export function createExpressHandler<TIn, TOut> (controller: Controller<TIn, TOut>): ExpressHandler {
  return async (req: Express.Request, res: Express.Response): Promise<unknown> => {
    const validationResult = controller.validator(req.body, req.query, req.params)
    if ((validationResult as ValidationError).errorMessage) {
      const errorMessage = (validationResult as ValidationError).errorMessage
      return res.status(422).json({ success: false, errorMessage })
    }
    const request = validationResult as TIn
    try {
      const result = await controller.handler(request)
      return res.json({
        success: true,
        ...result
      })
    } catch (error) {
      const httpError = ControllerError.errorMapper(error)
      res.status(httpError.statusCode).json({ success: false, errorMessage: httpError.errorMessage })
    }
  }
}
