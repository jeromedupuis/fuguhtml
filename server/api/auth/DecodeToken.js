var jwt = require('jsonwebtoken');
var config = require('../../config');

function decodeToken(token) {
  return new Promise((resolve, reject) => {
    if (!token) {
      reject(null);
    } else {

      jwt.verify(token, config.JWT_SECRET_TOKEN, function(err, decoded) {
        if (err) {
          reject(null);
        }
        resolve(decoded);
      })
    }
  });
}
module.exports = decodeToken;
