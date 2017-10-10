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
    res.render('students', { dataStudents: rowsStudents, pageTitle: 'Student Page'})
  })
  .catch(err=>{
    res.send(err)
  })
})

router.get('/add', (req, res)=>{
  res.render('studentsAdd', {error: null, pageTitle : 'Add Student'})
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
    res.render('studentsAdd', {error: err.message, pageTitle: 'Add Student'})
  })

})

router.get('/edit/:id', (req, res) =>{
  Model.Student.findById(req.params.id)
  .then(rowsStudents =>{
    res.render('studentsEdit', {dataStudents: rowsStudents, error: null, pageTitle: 'Edit Student'})
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
    Model.Student.findById(req.params.id)
    .then(rowsStudents=>{
      res.render('studentsEdit', {dataStudents: rowsStudents, error: err.message, pageTitle: 'Edit Student'})
    })
  })
})

router.get('/delete/:id', (req, res) => {
  Model.Student.destroy({
    where: {
      id: req.params.id
    }
  })
  .then(ok => {
    Model.StudentSubject.destroy({
      where: {
        StudentId: req. params.id
      }
    })
    .then(()=> {
      res.redirect('/students')
    })
  })
})

router.get('/:id/addsubject', (req, res) => {
  Model.Student.findAll({
    where: {
      id: req.params.id
    }
  })
  .then(rowsStudents => {
    Model.Subject.findAll()
    .then(rowsSubjects => {
      res.render('student-subject', {dataStudents: rowsStudents[0], dataSubject: rowsSubjects, pageTitle: 'Add Subject'})

    })
  })
})

router.post('/:id/addsubject', (req, res) => {
  Model.StudentSubject.create({
    StudentId: req.params.id,
    SubjectId: req.body.SubjectId,
    createdAt: new Date(),
    updatedAt: new Date()
  })
  .then(ok => {
    res.redirect('/students')
  })
})

module.exports = router;
