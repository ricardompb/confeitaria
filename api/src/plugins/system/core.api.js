const express = require('express')
const app = express()
const http = require('http')
const server = http.createServer(app)
const router = express.Router()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Methods', 'PUT, DELETE')
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization')
  next()
})

const handler = async (req, res) => {  
  const [url] = req.originalUrl.split('?')
  const api = apiConfig[req.method][url]
  if (!api) return res.json({ message: 'Api não encontrada', error: true })
  res.json(await api.handler(req, res))
}

router.get('/:module/:class/:method', handler)
router.post('/:module/:class/:method', handler)
router.put('/:module/:class/:method', handler)
router.delete('/:module/:class/:method', handler)

app.use('/api', router)

const apiConfig = {
  GET: {},
  POST: {},
  PUT: {},
  DELETE: {}
}

const Register = (filename) => {
  const api = (() => {
    const api = require(`../../plugins${filename}`)
    if (filename.match(/models/)) {
      return require('./apis/model.api')(api)
    }
    return api
  })()

  Object.keys(apiConfig).forEach(verb => {
    if (api.config[verb]) {
      Object.keys(api.config[verb]).forEach(method => {
        const path = `/api/${api.config.name}/${method}`
        const cfg = api.config[verb][method]
        apiConfig[verb][path] = {
          name: api.config.name,
          label: api.config.label,
          ...cfg,
          method: verb
        }
      })
    }    
  })
} 

function Rest (config) {
  this.config = config
}

module.exports = {
  config: apiConfig,
  Rest,
  Register,
  async setup () {
    const { port } = require('../../config.json').system.api    
    server.listen(port, () => {
      console.log(`http://localhost:${port}`)
    })
  }
}