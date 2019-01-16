var jwt = require('jsonwebtoken');
var config = require('../../config');
let decodeToken = require('./decodeToken');

async function verifyToken(req, res, next) {

  var token = req.headers['x-access-token'];
  decodeToken(token)
    .then((decoded) => {
      if(!decoded) {
        return res.status(500).send({ message: 'Failed to authenticate token.' });
      }
      req.userId = decoded.id;
      req.isAdmin = decoded.isAdmin;
      next();
    })
    .catch(err => {
      return res.status(500).send({ message: 'Failed to authenticate token.' });
    });



}
module.exports = verifyToken;
