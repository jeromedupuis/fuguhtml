var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var Promise = require('promise')
var ObjectId = mongoose.Types.ObjectId;

var CommentsSchema = new Schema({
  reference: {
    type: String,
    required: true
  },
  doc: {
    type: Schema.Types.ObjectId,
    required: true
  },
  body: String,
  user: {
    name: String,
    picture: String
  },
  createdAt: Date
});

var Model = mongoose.model("comments", CommentsSchema);

module.exports = {
  list: (query) => {
    return new Promise((resolve, reject) => {
      Model.find(query || {}, function(err, doc) {
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
      body: null,
      user: {},
      createdAt: null,
      reference: null,
      doc: null
    }, schema);

    schema.doc = new ObjectId(schema.doc);

    return new Promise((resolve, reject) => {
      var model = new Model(schema)
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
      body: null,
      user: {},
      createdAt: null,
      reference: null,
      doc: null
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
