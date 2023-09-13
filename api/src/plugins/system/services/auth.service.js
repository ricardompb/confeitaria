const User = require('../models/user.model')
const JsonWebToken = require('jsonwebtoken')
const config = require('../../../config.json')
const bcrypt = require('bcryptjs')

module.exports = {
  login: async (params, ctx) => {
    const { email, password } = params
    const user = await User.findOne({ where: { data: { email } } }, ctx)
    if (!user) throw new Error('Usuário não encontrado!')    
    const isValid = bcrypt.compareSync(password, user.data.password)
    if (!isValid) throw new Error('A Senha informada é inválida.')
    const token = JsonWebToken.sign({ id: user.id }, config.system.api.secret, { expiresIn: '1y' })
    return { token }
  }
}