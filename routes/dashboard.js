var express = require('express');
var router= express.Router();

const Model = require('../models')
const userauth = require('../helpers/authentication');

router.get('/', function (req, res, next) {
  let userSession = req.session.login
  let getUserAuth = userauth.userRole(userSession.role)

  res.render('home', {userSession: userSession, getUserAuth: getUserAuth})
})


module.exports = router;
