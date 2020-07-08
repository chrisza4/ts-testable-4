import * as Supertest from 'supertest'
import Server from '../app/server'

describe('Calc', () => {
  it('Can add', async () => {
    const response = await Supertest(Server).post('/calc').send({
      firstNumber: 100,
      secondNumber: 99,
      operation: '+'
    })
    expect(response.body.result).toEqual(199)
  })

  it('Return Error when invalid operation', async () => {
    const response = await Supertest(Server).post('/calc').send({
      firstNumber: 1,
      secondNumber: 2,
      operation: 'invalid_operation'
    })
    expect(response.status).toEqual(422)
    expect(response.body.message).toEqual('Input invalid operation.')
  })

  it('Return error when firstNumber is not number', async () => {
    const response = await Supertest(Server).post('/calc').send({
      firstNumber: 'not_number',
      secondNumber: 2,
      operation: '*'
    })
    expect(response.status).toEqual(422)
    expect(response.body.message).toEqual('Parameter firstNumber must be number.')
  })
})
