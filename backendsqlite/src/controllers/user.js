const status = require('http-status');
const userModel = require('../models/user.js');
const has = require('has-keys');
const CodeError = require('../util/CodeError.js');
const bcrypt = require('bcrypt');
const jws = require('jws');
require('mandatoryenv').load(['TOKENSECRET']);
const { TOKENSECRET } = process.env;

// 6 characters, at least one letter and one number
function validPassword(password) {
  return /^(?=.*\d)(?=.*[a-zA-Z]).{6,}$/.test(password);
}

module.exports = {
  async getUserByEmail(req, res) {
    // #swagger.tags = ['Users']
    // #swagger.summary = 'Get user by Email'
    if (!has(req.params, 'email'))
      throw new CodeError('You must specify the email', status.BAD_REQUEST);
    const { email } = req.params;
    const data = await userModel.findOne({
      where: { email },
      attributes: ['id', 'name', 'email', 'phone', 'address', 'isAdmin'],
    });
    if (!data) throw new CodeError('User not found', status.NOT_FOUND);
    res.json({ status: true, message: 'Returning user', data });
  },
  async getUsers(req, res) {
    // #swagger.tags = ['Users']
    // #swagger.summary = 'Get All users'
    const data = await userModel.findAll();
    res.json({ status: true, message: 'Returning users', data });
  },
  async newUser(req, res) {
    // #swagger.tags = ['Users']
    // #swagger.summary = 'New User'
    // #swagger.parameters['obj'] = { in: 'body', schema: { $name: 'John Doe', $email: 'abcde@gmail.com', $password: 'abcd123'}}
    if (!has(req.body, ['name', 'email', 'password']))
      throw new CodeError(
        'You must specify the name, email and password ',
        status.BAD_REQUEST
      );
    const { name, password, email } = req.body;
    if (!validPassword(password))
      throw new CodeError('Weak password!', status.BAD_REQUEST);
    await userModel.create({
      name,
      email,
      passhash: await bcrypt.hash(password, 2),
    });
    res.json({ status: true, message: 'User Added' });
  },
  async updateUser(req, res) {
    // #swagger.tags = ['Users']
    // #swagger.summary = 'Update User'
    // #swagger.parameters['obj'] = { in: 'body', schema: { $name: 'new name'}}
    const data = req.body;
    if (
      has(data, ['email']) ||
      has(data, ['name']) ||
      has(data, ['phone']) ||
      has(data, ['address']) ||
      has(data, ['password'])
    ) {
      // check if pass word is updated
      if (has(data, ['password'])) {
        const { password } = data;
        if (!validPassword(password))
          throw new CodeError('Weak password!', status.BAD_REQUEST);
        data.passhash = await bcrypt.hash(password, 2);
      }
      await userModel.update({ ...data }, { where: { id: req.user.id } });
      const user = await userModel.findOne({
        where: { id: req.user.id },
      });
      // eslint-disable-next-line no-unused-vars
      const { passhash, ...userData } = user.toJSON();
      const token = req.token;
      res.json({ status: true, message: 'User updated', user: {...userData, token} });
    } else {
      throw new CodeError('BAD REQUEST ', status.BAD_REQUEST);
    }
  },
  async deleteUser(req, res) {
    // #swagger.tags = ['Users']
    // #swagger.summary = 'Delete User'
    await userModel.destroy({ where: { id: req.user.id } });
    res.json({ status: true, message: 'User deleted' });
  },
  async login(req, res) {
    // #swagger.tags = ['Users']
    // #swagger.summary = 'Verify credentials of user using email and password and return user data and token'
    // #swagger.parameters['obj'] = { in: 'body', schema: { $email: 'admin@gmail.com', $password: 'a123456'}}
    const data = req.body;
    if (!has(data, ['email', 'password']))
      throw new CodeError(
        'You must specify the email and password',
        status.BAD_REQUEST
      );
    const { email, password } = data;
    const user = await userModel.findOne({
      where: { email },
    });

    if (user) {
      if (await bcrypt.compare(password, user.passhash)) {
        const token = jws.sign({
          header: { alg: 'HS256' },
          payload: email,
          secret: TOKENSECRET,
        });
        // eslint-disable-next-line no-unused-vars
        const { passhash, ...returnDataUser } = user.toJSON();
        res.json({
          status: true,
          message: 'Login/Password ok',
          user: { ...returnDataUser, token },
        });
        return;
      }
    }
    res
      .status(status.FORBIDDEN)
      .json({ status: false, message: 'Wrong email/password' });
  },
  async verifyTokenAndFindUser(req, res, next) {
    const token = req.headers['x-access-token'];
    if (!token) {
      throw new CodeError('No token provided', 403);
    }

    const verified = jws.verify(token, 'HS256', TOKENSECRET);
    if (!verified) {
      throw new CodeError('Failed to authenticate token', 403);
    }
    const email = jws.decode(token).payload;
    const user = await userModel.findOne({
      where: { email },
    });
    if (!user) {
      throw new CodeError('User not found', status.NOT_FOUND);
    }
    req.user = user;
    req.token = token
    next();
  },
  async verifyAdmin(req, res, next) {
    // Si user non admin, on retourne 401
    if (req.user.isAdmin) {
      next();
    } else {
      throw new CodeError('User is not an admin', status.UNAUTHORIZED);
    }
  },
};
