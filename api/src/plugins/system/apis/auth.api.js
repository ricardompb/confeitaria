const Api = require('../core.api')
const { login } = require('../services/auth.service')

module.exports = new Api.Rest({
  name: 'system/auth',
  label: 'Autenticação/Autorização',
  GET: {},
  POST: {
    login: {
      async handler(req, res) {
        return login(req.body, req.ctx)
      }
    }    
  },
  PUT: {},
  DELETE: {}
})