const express = require('express');
const router = express.Router();

const Model = require('../models');

router.get('/', (req, res)=>{
  Model.Teacher.findAll()
  .then((rowsTeachers)=>{
    res.render('teachers', {dataTeachers: rowsTeachers})
  })
  .catch(err=>{
    res.send(err)
  })
})


module.exports = router;
