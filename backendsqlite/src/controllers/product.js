const status = require('http-status')
const productModel = require('../models/products.js')
const has = require('has-keys')
const CodeError = require('../util/CodeError.js')

module.exports = {
  async getProducts (req, res) {
    // #swagger.tags = ['Products']
    // #swagger.summary = 'Get All products'
    const data = await productModel.findAll({ attributes: ['id', 'name', 'type', 'price', 'description'] })
    res.json({ status: true, message: 'Returning users', data })
  }
}
