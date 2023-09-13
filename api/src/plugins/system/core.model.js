const db = require('./core.db')

const modelSchema = {}

function Schema (schema) {
  this.schema = schema
  modelSchema[schema.name] = schema

  this.get = async (id, ctx) => {
    return db.document.get(id, ctx)
  }

  this.findOne = async (options = {}, ctx = {}) => {
    options.where = options.where || {}
    options.where.type = schema.name
    return db.document.findOne(options, ctx)
  }

  this.findAll = async (options = {}, ctx = {}) => {
    options.where = options.where || {}
    options.where.type = schema.name
    return db.document.findAll(options, ctx)
  }

  return this
}



module.exports = {
  schema: modelSchema,
  Schema,
  String,
  Date
}