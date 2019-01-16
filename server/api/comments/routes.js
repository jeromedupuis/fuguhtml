const express = require('express');
const router  = express.Router();
const bodyParser  = require('body-parser');
const Promise = require('promise');
var mongoose = require("mongoose");
var ObjectId = mongoose.Types.ObjectId;

router.use(bodyParser.json());

const Model = require('./model.js');

module.exports = function(app) {

  //cRud
  router.get('/comments', async (req, res, next) => {
    let query = {
      reference: req.query.reference,
      doc: new ObjectId(req.query.doc)
    }

    let docs = await Model.list(query);
    res.send(docs);
  });

  //Crud
  router.post('/comments', async (req, res, next) => {
      let doc = await Model.create(req.body);
      res.send(doc);
  });

  //cruD
  router.delete('/comments/:id', async (req, res, next) => {
    let id = req.params.id
    let doc = await Model.delete(id);
    res.send(doc);
  });

  app.use(router)
}
