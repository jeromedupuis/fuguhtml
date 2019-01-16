const express = require('express');
const router  = express.Router();
const bodyParser  = require('body-parser');
const Promise = require('promise');

router.use(bodyParser.json());

module.exports = function(app) {
  require('../api/tasks/routes.js')(app);
  require('../api/projects/routes.js')(app);
  require('../api/users/routes.js')(app);
  require('../api/auth/routes.js')(app);
  require('../api/comments/routes.js')(app);
  app.use(router)
}
