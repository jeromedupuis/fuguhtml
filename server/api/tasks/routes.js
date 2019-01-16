const express = require('express');
const router  = express.Router();
const bodyParser  = require('body-parser');
const Promise = require('promise');

router.use(bodyParser.json());

const Model = require('./model.js');

module.exports = function(app) {

  //cRud
  router.get('/tasks', async (req, res, next) => {
    let docs = await Model.list();
    res.send(docs);
  });

  //cRud
  router.get('/tasks/:id', async (req, res, next) => {
    let id = req.params.id
    let doc = await Model.get(id);
    res.send(doc);
  });

  //Crud
  router.post('/tasks', async (req, res, next) => {
      let schema = Object.assign({
        name: ''
      }, req.body);

      let doc = await Model.create(id, schema);
      res.send(doc);
  });

  //cRud
  router.put('/tasks/:id', async (req, res, next) => {

    let schema = Object.assign({
      name: ''
    }, req.body);

    let id = req.params.id
    let doc = await Model.update(id, schema);
    res.send(doc);
  });

  //cruD
  router.delete('/tasks/:id', async (req, res, next) => {
    let id = req.params.id
    let doc = await Model.delete(id);
    res.send(doc);
  });

  app.use(router)
}
