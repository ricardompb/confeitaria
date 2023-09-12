const Api = require('./core.api')

module.exports = {  
  async setup () {
    console.log('Plugin: System')

    Api.Register('/system/models/user.model')
  }
}