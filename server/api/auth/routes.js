const express = require('express');
const router  = express.Router();
const bodyParser  = require('body-parser');
const Promise = require('promise');
const config = require('../../config');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');

router.use(bodyParser.json());

var VerifyToken = require('./VerifyToken');
const UsersModel = require('../users/model.js');

module.exports = function(app) {

  //cRud
  router.post('/login', async (req, res) => {
    let user = await UsersModel.getByEmail(req.body.email);
    if(!user) {
      return res.status(401).send({
        auth: false,
        token: null,
        error: true,
        message: 'User does not exists'
      });
    }

    var passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
    if (!config.FORCE_AUTH && !passwordIsValid) {
      return res.status(401).send({
        auth: false,
        token: null,
        error: true,
        message: 'Password is not valid'
      });
    }

    var token = jwt.sign({
      id: user._id,
      isAdmin: user.isAdmin
    }, config.JWT_SECRET_TOKEN, {
      expiresIn: 86400
    });
    res.status(200).send({
      auth: true,
      token: token
    });
  });

  router.get('/logout', function(req, res) {
    res.status(200).send({ auth: false, token: null });
  });

  router.get('/me', VerifyToken, async function(req, res, next) {
    let user = await UsersModel.get(req.userId)
      .catch((err) => {
        if (err) return res.status(500).send("There was a problem finding the user.");
      })
    if(!user) {
      if (!user) return res.status(404).send("No user found.");
    }

    res.status(200).send(user);
  });

  app.use(router);
};
