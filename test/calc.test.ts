import { calc, Operation } from '../app/calc'

describe('Calc', () => {
  it('Can add', async () => {
    const result = calc(100, 99, Operation.Add)
    expect(result).toEqual(199)
  })

  it('Can subtract', async () => {
    const result = calc(100, 99, Operation.Substract)
    expect(result).toEqual(1)
  })

  it('Can multiply', async () => {
    const result = calc(100, 99, Operation.Multiply)
    expect(result).toEqual(9900)
  })

  it('Can divide', async () => {
    const result = calc(100, 2, Operation.Divide)
    expect(result).toEqual(50)
  })
})
