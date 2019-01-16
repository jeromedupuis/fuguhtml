const express = require('express');
const router  = express.Router();
const bodyParser  = require('body-parser');
const Promise = require('promise');

router.use(bodyParser.json());

const Model = require('./model.js');

module.exports = function(app) {

  //cRud
  router.get('/projects', async (req, res, next) => {
    let docs = await Model.list(req.query);
    res.send(docs);
  });

  //cRud
  router.get('/projects/:id', async (req, res, next) => {
    let id = req.params.id
    let doc = await Model.get(id);
    res.send(doc);
  });

  //Crud
  router.post('/projects', async (req, res, next) => {
      let doc = await Model.create(req.body).catch(err => {
        res.status(err.statusCode).send(err);
      });
      res.send(doc);
  });

  //cRud
  router.put('/projects/:id', async (req, res, next) => {
    let id = req.params.id
    let doc = await Model.update(id, req.body);
    res.send(doc);
  });

  //cruD
  router.delete('/projects/:id', async (req, res, next) => {
    let id = req.params.id
    let doc = await Model.delete(id);
    res.send(doc);
  });

  app.use(router)
}
