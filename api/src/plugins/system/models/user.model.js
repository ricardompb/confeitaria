const Model = require('../core.model')

module.exports = new Model.Schema({
  name: 'system/user',
  label: 'Usuário',
  model: {
    email: {
      type: Model.String,
      label: 'E-mail',
      required: true
    },
    password: {
      type: Model.String,
      label: 'Senha',
      required: true
    }
  }
})