const express = require('express');
const router  = express.Router();
const bodyParser  = require('body-parser');
const Promise = require('promise');
const verifyToken = require('../auth/verifyToken');

router.use(bodyParser.json());

const Model = require('./model.js');

module.exports = function(app) {

  //cRud
  router.get('/users', verifyToken, async (req, res, next) => {

    let query = {};
    if(req.query.isFreelancer !== undefined) {
      query.isFreelancer = true;
    }
    if(req.query.isAdmin !== undefined) {
      query.isAdmin = true;
    }
    if(req.query.isClient !== undefined) {
      query.isClient = true;
    }

    if(req.query.category !== undefined) {
      query.services = {
        "$in": req.query.category
      };
    }


    let docs = await Model.list(query).catch((err) => {
      res.status(err.statusCode).send(err);
    });
    res.send(docs);
  });

  //cRud
  router.get('/users/:id', verifyToken, async (req, res, next) => {
    let id = req.params.id
    let doc = await Model.get(id);
    res.send(doc);
  });

  //Crud
  router.post('/users', verifyToken, async (req, res, next) => {
      let doc = await Model.create(req.body).catch((err) => {
        res.status(err.statusCode).send(err);
      });
      res.send(doc);
  });

  //cRud
  router.put('/users/:id', verifyToken, async (req, res, next) => {
    let id = req.params.id
    let doc = await Model.update(id, req.body).catch((err) => {
      console.log('err', err);
      res.status(err.statusCode).send(err);
    });
    res.send(doc);
  });

  //cruD
  router.delete('/users/:id', verifyToken, async (req, res, next) => {
    let id = req.params.id
    let doc = await Model.delete(id);
    res.send(doc);
  });

  app.use(router)
}
