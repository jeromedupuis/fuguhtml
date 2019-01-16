'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: "development",
  MONGO_URI: "mongodb://localhost:27017/fuguhtml",
  FORCE_AUTH: true
});
