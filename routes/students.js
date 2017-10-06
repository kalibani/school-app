const express = require('express');
const router = express.Router();

const Model = require('../models');

router.get('/', (req, res)=>{
  Model.Student.findAll({
    order:[
      ['id', 'ASC']
    ]
  })
  .then((rowsStudents)=>{
    res.render('students', {dataStudents: rowsStudents})
  })
  .catch(err=>{
    res.send(err)
  })
})

router.get('/add', (req, res)=>{
    let errorMessage = ''
    if (req.query.hasOwnProperty('error')) {
        if (req.query.error === 'Validation error: Validation isEmail on email failed') {
            errorMessage = 'Format Email Salah'
        }
    }
    res.render('studentsAdd', {dataError: errorMessage})
})

router.post('/add', (req, res)=>{
  Model.Student.create(
  {
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    email: req.body.email
  })
  .then(()=>{
    res.redirect('/students')
  })
  .catch(err=>{
    // res.send(err.message)
    res.redirect(`/students/add?error=${err.message}`)
  })

})

router.get('/edit/:id', (req, res) =>{
  let errMsg = ''
  if (req.query.hasOwnProperty('error')) {
    if (req.query.error==='Validation error: Validation isEmail on email failed'){
      errMsg = 'Format Email Salah!'
    }
  }

  Model.Student.findById(req.params.id)
  .then(rowsStudents =>{
    res.render('studentsEdit', {dataStudents: rowsStudents, dataError: errMsg})
  })
  .catch(err =>{
    res.send(err)
  })
})

router.post('/edit/:id', (req, res)=>{
  Model.Student.update(
  {
    first_name:req.body.first_name,
    last_name: req.body.last_name,
    email: req.body.email
  },{
    where : {id:req.params.id}
  })
  .then(()=>{
    res.redirect('/students')
  })
  .catch(err=>{
    res.redirect(`/students/edit/${req.params.id}?error=${err.message}`)
  })
})

router.get('/delete/:id', (req, res) => {
  Model.Student.destroy(
  {
    where : {id:req.params.id}
  })
  .then(rows=>{
    res.redirect('/students')
  })
  .catch(err =>{
    res.send(err)
  })
})

module.exports = router;
