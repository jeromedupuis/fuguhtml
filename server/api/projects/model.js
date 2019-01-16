var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var Promise = require('promise')
var ObjectId = mongoose.Types.ObjectId;
var _ = require('lodash');

var ProjectsSchema = new Schema({
  ownerId: {
    type: Schema.Types.ObjectId,
    required: true
  },
  name: String,
  category: {
    type: String,
    required: true
  },
  subcategory: String,
  frontend: Object,
  assignee: Object,
  status: String,
  clearup: Object
});


var Model = mongoose.model("projects", ProjectsSchema);

module.exports = {
  list: (query) => {

    if(_.get(query, 'assignee.userId', null)) {
      query['assignee.userId'] = new ObjectId(query['assignee.userId']);
    }

    return new Promise((resolve, reject) => {
      Model.find(query || {}, function(err, doc) {
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
  create: (schema) => {
    schema = Object.assign({
      ownerId: '',
      name: 'undefined',
      category: '',
      subcategory: '',
      frontend: {},
      assignee: {},
      status: 'NEW'
    }, schema);

    schema.ownerId = new ObjectId(schema.ownerId);
    if(_.get(schema.assignee, 'userId', null)) {
      schema.assignee.userId = new ObjectId(schema.assignee.userId);
    }

    return new Promise((resolve, reject) => {
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
  update: (id, schema) => {

    if(schema.ownerId) {
      schema.ownerId = new ObjectId(schema.ownerId);
    }
    if(_.get(schema.assignee, 'userId', null)) {
      schema.assignee.userId = new ObjectId(schema.assignee.userId);
    }

    return new Promise((resolve, reject) => {
      Model.findByIdAndUpdate(new ObjectId(id), { $set: schema }, { new: true }, function (err, doc) {
        console.log(doc)
        if(err) {
          reject(err)
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
}
