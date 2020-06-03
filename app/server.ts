import * as Express from 'express'
import Config from './config'
import * as BodyParser from 'body-parser'

const app = Express()
app.use(BodyParser.json())
const port = Config.port

app.get('/', (req, res) => res.send('Hello world'))

app.post('/calc', (req, res) => {
  console.log('Body:', req.body)
  const { operator, secondNumber, firstNumber } = req.body
  res.send("")
})

if (Config.NODE_ENV !== 'TEST')  {
  app.listen(port, () => console.log(`App listen to port ${Config.port}`))
}

export default app
