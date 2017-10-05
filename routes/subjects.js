const express = require('express');
const router = express.Router();

const Model = require('../models');

router.get('/', (req, res)=>{
  Model.Subject.findAll()
  .then((rowsSubjects)=>{
    res.render('subjects', {dataSubjects: rowsSubjects})
  })
  .catch(err=>{
    res.send(err)
  })
})


module.exports = router;
