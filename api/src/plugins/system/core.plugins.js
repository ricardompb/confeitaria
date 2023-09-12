module.exports = {  
  async setup () {
    const config = require('../../config.json')
    await Object.keys(config).forEach(async key => {      
      const plugin = require(`../../plugins/${key}`)
      if (plugin?.setup) await plugin.setup()
    })      
  }
}