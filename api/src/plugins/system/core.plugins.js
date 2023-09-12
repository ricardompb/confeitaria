module.exports = {  
  async setup () {
    const config = require('../../config.json')
    const keys = Object.keys(config)
    await keys.forEach(async key => {      
      const plugin = require(`../../plugins/${key}`)
      if (plugin?.setup) await plugin.setup()
    })      
  }
}