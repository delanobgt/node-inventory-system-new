const path = require('path')
const Sequelize = require('sequelize')

const sequelize = new Sequelize('', '', '', {
  dialect: 'sqlite',
  operatorsAliases: false,
  storage: path.join(__dirname, '../db/inventory.db')
})

const Mutation = require('./mutation')(sequelize)
const Product = require('./product')(sequelize)
const User = require('./user')(sequelize)

sequelize.sync({
  logging: console.log,
  // force: true,
}).then(() => {
  console.log('synced')
})

module.exports = {
  Mutation,
  Product,
  User,
}