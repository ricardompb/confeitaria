const { Sequelize, DataTypes } = require('sequelize')
const { v1: uuidv1 } = require('uuid')

const system = require('../../config.json').system
const database = system.database

const sequelize = new Sequelize(database.name, database.username, database.password, {
  host: database.host,
  dialect: database.dialect
})

const document = sequelize.define('document', {
  id: { type: DataTypes.UUID, primaryKey: true, allowNull: false },
  type: { type: DataTypes.STRING, allowNull: false },
  data: { type: DataTypes.JSONB, allowNull: false },
  createdAt: { type: DataTypes.DATE, allowNull: false },
  updatedAt: { type: DataTypes.DATE, allowNull: false },
  deletedAt: { type: DataTypes.DATE, allowNull: true }
}, {
  tableName: 'document',
  modelName: 'document',
  paranoid: true
})

const connect = async () => {
  try {
    await sequelize.authenticate();
    await document.sync()
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }  
}

module.exports = {
  connect,
  document: {
    async get (id, ctx = {}) {
      if (!id) return
      return document.findByPk(id, {
        transaction: ctx.transaction
      })
    },
    async findOne (options, ctx = {}) {
      return document.findOne(options, {
        transaction: ctx.transaction
      })
    },
    async findAll (options, ctx = {}) {
      return document.findAll(options, {
        transaction: ctx.transaction
      })
    },
    async createOrUpdate (inst, ctx) {
      const inserting = !inst.createdAt
      inst.id = inst.id || uuidv1()

      if (inserting) {
        return document.create(inst, {
          transaction: ctx.transaction
        })
      }

      inst.changed('data', true)
      // const { _changed } = inst
      // _changed.add('data')      
      return inst.save({
        transaction: ctx.transaction
      })
    }
  }
}