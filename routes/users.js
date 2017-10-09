var express = require('express');
var router= express.Router();

const Model = require('../models')

router.get('/', (req, res)=>{
  Model.User.findAll()
  .then((users)=>{
    res.render('user', {data_users: users})
  })
})


module.exports = router;
