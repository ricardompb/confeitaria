const express = require('express')
const app = express()
const http = require('http')
const server = http.createServer(app)
const router = express.Router()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

const handler = async (req, res) => {
  try {
    const [url] = req.originalUrl.split('?')
    const api = apiConfig[req.method][url]
    if (!api) return res.json({ message: 'Api não encontrada', error: true })  
    res.status(/post/i.test(req.method) ? 201 : 200).json(await api.handler(req, res))  
  } catch (e) {
    res.status(404).json({ message: e.message, error: true })
  }
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
    if (typeof filename === 'object') {
      return filename
    }
    const sufix = filename.match(/models/) ? '.model' : '.api'
    const api = require(`../../plugins${filename}${sufix}`)
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
          ...cfg          
        }
      })
    }    
  })
} 

module.exports = {
  config: apiConfig,
  Register,
  Rest: function (config) {
    this.config = config
  },
  async setup () {
    const { port } = require('../../config.json').system.api    
    server.listen(port, () => {
      console.log(`http://localhost:${port}`)
    })
  }
}