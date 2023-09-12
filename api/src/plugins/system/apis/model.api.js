const Api = require('../core.api')

module.exports = (config) => {
  const api = new Api.Rest({
    name: config.schema.name,
    label: config.schema.label,
    GET: {
      model: {
        handler: async (req, res) => {
          const { id } = req.query
          if (id) {
            return config.get(id, req.ctx)
          }
          return config.findAll({}, req.ctx)
        }
      }
    },
    POST: {
      model: {
        handler: async (req, res) => {}
      }
    },
    PUT: {
      model: {
        handler: async (req, res) => {}
      }
    },
    DELETE: {
      model: {
        handler: async (req, res) => {}
      }
    }
  })
  return api
}