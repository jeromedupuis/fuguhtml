var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var Promise = require('promise')
var ObjectId = mongoose.Types.ObjectId;
var bcrypt = require('bcryptjs');

var TasksSchema = new Schema({
  firstname: {
    type: String,
    required: true
  },
  lastname: String,
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  services: Array,
  isAdmin: {
    type: Boolean,
    default: false
  },
  isFreelancer: {
    type: Boolean,
    default: false
  },
  isClient: {
    type: Boolean,
    default: false
  }
});

var Model = mongoose.model("users", TasksSchema);

const funcs = {
  list: (query) => {
    return new Promise((resolve, reject) => {
      Model.find(query || {}, { password: 0 }, function(err, doc) {
        if(err) {
          reject({
            error: true,
            message: err._message,
            statusCode: 500
          })
        } else {
          resolve(doc)
        }
      })
    })
  },
  get: (id) => {
    return new Promise((resolve, reject) => {
      Model.findById(new ObjectId(id), function(err, doc) {
        if(err) {
          reject({
            error: true,
            message: err._message,
            statusCode: 500
          })
        } else {
          resolve(doc)
        }
      })
    })
  },
  getByEmail: (email) => {
    return new Promise((resolve, reject) => {
      Model.findOne({ email: email }, function(err, doc) {
        if(err) {
          reject({
            error: true,
            message: err._message,
            statusCode: 500
          })
        } else {
          resolve(doc);
        }
      })
    })
  },
  create: async (schema) => {

    schema = Object.assign({
      lastname: '',
      firstname: '',
      email: '',
      password: '',
      services: [],
      isAdmin: false,
      isFreelancer: false,
      isClient: false
    }, schema);

    schema.password = bcrypt.hashSync(schema.password, 8);

    let exists = await funcs.getByEmail(schema.email);

    return new Promise((resolve, reject) => {

      if(exists) {
        reject({
          error: true,
          message: 'Email already exists',
          statusCode: 409
        });
        return false;
      }

      var model = new Model(schema)
      model.save(function (err, doc) {
        if(err) {
          reject({
            error: true,
            message: err._message,
            statusCode: 500
          })
        }
        else {
          resolve(doc)
        }
      })
    })
  },
  update: async (id, params) => {

    let schema = Object.assign({
      lastname: '',
      firstname: '',
      email: '',
      services: [],
      isAdmin: false,
      isFreelancer: false,
      isClient: false
    }, params);

    if(params.password !== undefined) {
      schema.password = bcrypt.hashSync(params.password, 8);
    }

    let exists = await funcs.getByEmail(schema.email);

    return new Promise((resolve, reject) => {
      if(exists && exists._id.toString() !== id) {
        reject({
          error: true,
          message: 'Email already exists',
          statusCode: 409
        });
        return false;
      }

      Model.findByIdAndUpdate(new ObjectId(id), { $set: schema }, { new: true }, function (err, doc) {
        if(err) {
          reject({
            error: true,
            message: err._message,
            statusCode: 500
          })
        }
        else {
          resolve(doc)
        }
      })
    })
  },
  delete: (id) => {
    return new Promise((resolve, reject) => {
      Model.findByIdAndRemove(new ObjectId(id), function (err, doc) {
        if(err) {
          reject({
            error: true,
            message: err._message,
            statusCode: 500
          })
        }
        else {
          resolve(doc)
        }
      })
    })
  }
};

module.exports = funcs;
