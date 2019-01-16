const express = require('express');
const router  = express.Router();
const bodyParser  = require('body-parser');
const Promise = require('promise');
const verifyTokenAdmin = require('../auth/verifyTokenAdmin');

router.use(bodyParser.json());

const Model = require('./model.js');

module.exports = function(app) {

  //cRud
  router.get('/admin/users', verifyTokenAdmin, async (req, res, next) => {
    let docs = await Model.list();
    res.send(docs);
  });

  //cRud
  router.get('/admin/users/:id', verifyTokenAdmin, async (req, res, next) => {
    let id = req.params.id
    let doc = await Model.get(id);
    res.send(doc);
  });

  //Crud
  router.post('/admin/users', verifyTokenAdmin, async (req, res, next) => {
      let doc = await Model.create(req.body).catch((err) => {
        console.log('err', err);
        res.status(err.statusCode).send(err);
      });
      res.send(doc);
  });

  //cRud
  router.put('/admin/users/:id', verifyTokenAdmin, async (req, res, next) => {
    let id = req.params.id
    let doc = await Model.update(id, req.body).catch((err) => {
      console.log('err', err);
      res.status(err.statusCode).send(err);
    });
    res.send(doc);
  });

  //cruD
  router.delete('/admin/users/:id', verifyTokenAdmin, async (req, res, next) => {
    let id = req.params.id
    let doc = await Model.delete(id);
    res.send(doc);
  });

  app.use(router)
}
