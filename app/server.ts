import * as Express from 'express'
import Config from './config'
import { calc, Operation } from './calc'

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

app.post('/calc', (req, res) => {
  const { operation, firstNumber, secondNumber } = req.body
  const allowedOperations = Object.values(Operation)
  if (!allowedOperations.includes(operation)) {
    return res.status(422).json({
      error: true,
      message: 'Invalid operation'
    })
  }
  const result = calc(firstNumber, secondNumber, operation)
  return res.json({
    result: result
  })
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
