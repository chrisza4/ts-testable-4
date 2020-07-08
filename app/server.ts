import * as Express from 'express'
import Config from './config'
import { calc } from './calc'
import { numberValidate, operationValidate } from './validate'
import { ValidateError } from './custom-error'

const app = Express()

app.use(Express.json())
const port = Config.port

app.get('/', (req, res) => {
  res.send('Hello world')
})

app.post('/', (req, res) => {
  res.json({
    success: true,
    postedPayload: JSON.stringify(req.body, null, 2)
  })
})

app.post('/calc', async (req, res) => {
  try {
    const { firstNumber, secondNumber, operation } = req.body
    await numberValidate(firstNumber, secondNumber)
    await operationValidate(operation)
    const calResult = calc(firstNumber, secondNumber, operation)
    res.send({ result: calResult })
  } catch (err) {
    if (err instanceof ValidateError) {
      return res.status(err.statusCode).json({
        message: err.message
      })
    }
    res.status(500).json({ message: 'internal error' })
  }
})

if (Config.NODE_ENV !== 'TEST') {
  app.listen(port, () => console.log(`App listen to port ${Config.port}`))
}

export default app





















import * as Fs from 'fs'
import * as Multer from 'multer'

const upload = Multer()

app.post('/upload', upload.single('photo'), (req, res) => {
  Fs.writeFileSync('/tmp/this_is_the_file.png', req.file.buffer)
  res.send('Succeed')
})
