const status = require('http-status');
const has = require('has-keys');
const CodeError = require('../util/CodeError.js');
const restaurantModel = require('../models/restaurant.js');
module.exports = {
  async getRestaurants(req, res) {
    // #swagger.tags = ['Restaurants']
    // #swagger.summary = 'Get All restorants'
    const data = await restaurantModel.findAll({
      attributes: ['id', 'name', 'address', 'phone'],
    });
    res.json({ status: true, message: 'Returning restaurants', data });
  },
  async newRestaurant(req, res) {
    // #swagger.tags = ['Restaurants']
    // #swagger.summary = 'New Restaurant'
    // #swagger.parameters['obj'] = {schema: { $name: 'My restaurant', $address: '2 rue de l'etoile', $phone: '12345'}}
    if (!has(req.body, ['name', 'address', 'phone']))
      throw new CodeError(
        'You must specify the name, address and phone of the restaurant',
        status.BAD_REQUEST
      );
    const { name, address, phone } = req.body;
    await restaurantModel.create({
      name,
      address,
      phone,
    });
    res.json({ status: true, message: 'Restaurant Added' });
  },
  async deleteRestaurant(req, res) {
    // #swagger.tags = ['Restaurants']
    // #swagger.summary = 'Delete Restaurant'
    if (!has(req.params, 'id'))
      throw new CodeError(
        'You must specify the id of the resaurant',
        status.BAD_REQUEST
      );
    const { id } = req.params;
    await restaurantModel.destroy({ where: { id } });
    res.json({ status: true, message: 'Restaurant deleted' });
  },
  async updateRestaurant(req, res) {
    // #swagger.tags = ['Restaurant']
    // #swagger.summary = 'Update Restaurant'
    // #swagger.parameters['obj'] = {schema: { $name: 'My restaurant', $address: '2 rue de l'etoile', $phone: '12345'}}
    if (!has(req.params, 'id'))
      throw new CodeError('You must specify the id', status.BAD_REQUEST);
    const { id } = req.params;

    const data = req.body;
    if (
      has(data, ['name']) ||
      has(data, ['type']) ||
      has(data, ['price']) ||
      has(data, ['description'])
    ) {
      await restaurantModel.update({ ...data }, { where: { id } });
      res.json({ status: true, message: 'Restaurant updated' });
    } else {
      throw new CodeError('BAD REQUEST ', status.BAD_REQUEST);
    }
  },
};
