const status = require('http-status')
const orderModel = require('../models/order.js')
const productModel = require('../models/product.js')
const orderProductModel = require('../models/orderProduct.js')
const has = require('has-keys')
const CodeError = require('../util/CodeError.js')

module.exports = {
  async getOrders(req, res) {
    // #swagger.tags = ['Orders']
    // #swagger.summary = 'Get All orders'
    const orders = await orderModel.findAll({ attributes: ['id', 'userId', 'status', 'date', 'address'] });
    const result = [];

    await Promise.all(orders.map(async (order) => {
      const orderProductData = await orderProductModel.findAll({
        where: { orderId: order.id },
        attributes: ['productId', 'quantity'],
      });
      result.push({ ...order.toJSON(), products: orderProductData });
    }));

    res.json({ status: true, message: 'Returning orders', data: result });
  },
  async newOrder(req, res) {
    // #swagger.tags = ['Orders']
    // #swagger.summary = 'New Order'
    // #swagger.parameters['obj'] = { in: 'body', schema: { $address: '7 lotissement la riverate 1, 38420 Le Versoud', $products: [{'productId':1, 'quantity': 3}]}}
    if (!has(req.body, ["address", "products"])) {
      console.log("AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA")
      throw new CodeError(
        "You must specify the client id, address, and products list of the order",
        status.BAD_REQUEST
      );
    }
    const { address, products } = req.body;
    const order = await orderModel.create({
      date: new Date(),
      userId: req.user.id,
      address
    });

    const orderProducts = JSON.parse(products)

    console.log("ORDER PRODUCTS: " + orderProducts)

    for (const product of orderProducts) {
      const productData = await productModel.findByPk(product.productId);
      await order.addProduct(productData, {
        through: { quantity: product.quantity }
      });
    }
    
    res.json({ status: true, message: "Order Added" });
  },
  async getOrderById(req, res) {
    // #swagger.tags = ['Orders']
    // #swagger.summary = 'Get order by id'
    const { id } = req.params
    const order = await orderModel.findOne({ where: { id }, attributes: ['id', 'status', 'date', 'address'] });
    const result = [];

    const orderProductData = await orderProductModel.findAll({
      where: { orderId: order.id },
      attributes: ['productId', 'quantity'],
    });
    result.push({ ...order.toJSON(), products: orderProductData });

    res.json({ status: true, message: 'Returning order', data: result });
  },
  async getOrdersByClientId(req, res) {
    // #swagger.tags = ['Orders']
    // #swagger.summary = 'Get order by client id'
    const { userId } = req.params
    const orders = await orderModel.findAll({ where: { userId }, attributes: ['id', 'status', 'date', 'address'] });
    const result = [];

    await Promise.all(orders.map(async (order) => {
      const orderProductData = await orderProductModel.findAll({
        where: { orderId: order.id },
        attributes: ['productId', 'quantity'],
      });
      result.push({ ...order.toJSON(), products: orderProductData });
    }));

    res.json({ status: true, message: 'Returning order', data: result });
  },
  async updateOrder(req, res) {
    // #swagger.tags = ['Orders']
    // #swagger.summary = 'Update Order'
    // #swagger.parameters['obj'] = { in: 'body', schema: { $address: 'new address'}}
    const data = req.body
    const { id } = req.params
    if (has(data, ['products']) || has(data, ['status']) || has(data, ['address'])) {
      if (has(data, ['products'])) {
        const order = await orderModel.findByPk(id);
        // Suppression de la liste des produits
        await order.setProducts([]);
  
        // Parsing des produits
        const { products } = data;
        const orderProducts = JSON.parse(products)
  
        // Ajout de chaque produit à la liste des produits de la commande
        for (const product of orderProducts) {
          const productData = await productModel.findByPk(product.productId);
          await order.addProduct(productData, {
            through: { quantity: product.quantity }
          });
        }
      }
      await orderModel.update({ ...data }, { where: { id } })
    } else {
      throw new CodeError('BAD REQUEST ', status.BAD_REQUEST)
    }

    res.json({ status: true, message: 'Order updated' })
  },
  async deleteOrder(req, res) {
    // #swagger.tags = ['Orders']
    // #swagger.summary = 'Delete Order'
    const { id } = req.params
    await orderModel.destroy({ where: { id } })
    res.json({ status: true, message: 'Order deleted' })
  },
  async verifyAuthorizedUserByOrderId(req, res, next) {
    if (req.user.isAdmin) {
      next()
    } else {
      if (!has(req.params, 'id')) {
        throw new CodeError('You must specify the order id', status.BAD_REQUEST)
      }
      const { id } = req.params
      const orderData = await orderModel.findByPk(id);
      if (orderData.userId == req.user.id) {
        next()
      } else {
        throw new CodeError('User is not authorized for this order', status.UNAUTHORIZED)
      }
    }
  },
  async verifyAuthorizedUserById(req, res, next) {
    if (req.user.isAdmin) {
      next()
    } else {
      if (!has(req.params, 'userId')) {
        throw new CodeError('You must specify the user id', status.BAD_REQUEST)
      }
      const { id } = req.params
      if (id == req.user.id) {
        next()
      } else {
        throw new CodeError('User is not authorized for this order', status.UNAUTHORIZED)
      }
    }
  }
}
