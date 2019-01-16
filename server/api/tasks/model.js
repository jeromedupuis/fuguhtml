var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var Promise = require('promise')
var ObjectId = mongoose.Types.ObjectId;

var TasksSchema = new Schema({
  name: String
});

var Model = mongoose.model("tasks", TasksSchema);

module.exports = {
  list: () => {
    return new Promise((resolve, reject) => {
      Model.find({}, function(err, doc) {
        if(err) {
          reject(err)
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
          reject(err)
        } else {
          resolve(doc)
        }
      })
    })
  },
  create: (schema) => {

    schema = Object.assign({
      field1: '',
      field2: ''
    }, schema)

    return new Promise((resolve, reject) => {
      var model = new Model({
        field1: schema.field1,
        field2: schema.field2
      })
      model.save(function (err, doc) {
        if(err) {
          reject(err)
        }
        else {
          resolve(doc)
        }
      })
    })
  },
  update: (id, schema) => {

    schema = Object.assign({
      field1: '',
      field2: ''
    }, schema)

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
          reject(err)
        }
        else {
          resolve(doc)
        }
      })
    })
  }
}
