const status = require('http-status')
const productModel = require('../models/product.js')
const has = require('has-keys')
const CodeError = require('../util/CodeError.js')

module.exports = {
  async getProducts(req, res) {
    // #swagger.tags = ['Products']
    // #swagger.summary = 'Get All products'
    const data = await productModel.findAll({
      attributes: ['id', 'name', 'type', 'price', 'description'],
    })
    res.json({ status: true, message: 'Returning products', data })
  },
  async newProduct(req, res) {
    // #swagger.tags = ['Products']
    // #swagger.summary = 'New Product'
    // #swagger.parameters['obj'] = { in: 'body', schema: { $name: 'My burger', $type: 'burger', $price: '8.5', $description: 'A very good burger'}}
    if (!has(req.body, ['name', 'type', 'price', 'description']))
      throw new CodeError(
        'You must specify the name, type, price and description of the product',
        status.BAD_REQUEST
      )
    const { name, type, price, description } = req.body
    await productModel.create({
      name,
      type,
      price,
      description,
    })
    res.json({ status: true, message: 'Product Added' })
  },
  async getProductsByType(req, res) {
    // #swagger.tags = ['Products']
    // #swagger.summary = 'Get products by type'
    if (!has(req.params, 'type'))
      throw new CodeError('You must specify the type', status.BAD_REQUEST)
    const { type } = req.params
    const data = await productModel.findAll({
      where: { type },
      attributes: ['id', 'name', 'type', 'price', 'description', 'image'],
    })
    if (!data) throw new CodeError('Products not found', status.NOT_FOUND)
    res.json({ status: true, message: 'Returning products', data })
  },
  async deleteProduct(req, res) {
    // #swagger.tags = ['Products']
    // #swagger.summary = 'Delete Product'
    if (!has(req.params, 'id'))
      throw new CodeError('You must specify the id', status.BAD_REQUEST)
    const { id } = req.params
    await productModel.destroy({ where: { id } })
    res.json({ status: true, message: 'Product deleted' })
  },
  async updateProduct(req, res) {
    // #swagger.tags = ['Products']
    // #swagger.summary = 'Update Product'
    // #swagger.parameters['obj'] = { in: 'body', schema: { $name: 'My burger', $type: 'burger', $price: '8.5', $description: 'A very good burger'}}
    if (!has(req.params, 'id'))
      throw new CodeError('You must specify the id', status.BAD_REQUEST)
    const { id } = req.params

    const data = req.body
    if (
      has(data, ['name']) ||
      has(data, ['type']) ||
      has(data, ['price']) ||
      has(data, ['description'])
    ) {
      await productModel.update({ ...data }, { where: { id } })
      res.json({ status: true, message: 'Product updated' })
    } else {
      throw new CodeError('BAD REQUEST ', status.BAD_REQUEST)
    }
  },
}
