import * as Express from 'express'
import Config from './config'
import * as BodyParser from 'body-parser'

const app = Express()
app.use(BodyParser.json())
const port = Config.port

app.get('/', (req, res) => res.send('Hello world'))

type CalcResult = {
  result: number;
}
app.post('/calc', (req, res) => {
  const { operator, secondNumber, firstNumber } = req.body
  let result: CalcResult | null = null
  switch (operator) {
    case '+':
      result = { result: firstNumber + secondNumber }
      break
    case '-':
      result = { result: firstNumber - secondNumber }
      break
    case '*':
      result = { result: firstNumber * secondNumber }
      break
    case '/':
      result = { result: firstNumber / secondNumber }
      break
    default:
      return res.status(422).send({ error: 'Invalid operator' })
  }
  res.json(result)
})

if (Config.NODE_ENV !== 'TEST')  {
  app.listen(port, () => console.log(`App listen to port ${Config.port}`))
}

export default app
