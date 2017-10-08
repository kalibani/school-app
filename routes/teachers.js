const express = require('express');
const router = express.Router();

const Model = require('../models');

router.get('/', (req, res)=>{
  Model.Teacher.findAll({order:[['first_name', 'ASC']]})
  .then(rowsTeachers=>{
    let promise = rowsTeachers.map(teacher=>{
      return new Promise(function(resolve, reject) {
        teacher.getSubject()
        .then(Subject=>{
          if (Subject){
            teacher.subject_name = Subject.subject_name
          }else {
            teacher.subject_name = 'Unassigned'
          }
          resolve(teacher)
        })
        .catch(err=>{
          reject(err)
        })
      })
    })
    Promise.all(promise)
    .then(dataTeachersFix=>{
      // res.send(dataTeachersFix)
      res.render('teachers',{dataTeachers: dataTeachersFix, pageTitle: 'Page Teacher'})
    })
  })
  .catch(err=>{
    res.send(err)
  })
})

router.get('/add', (req, res)=>{
  res.render('teachersAdd', {error: null, pageTitle:'Page Teacher'})
})

router.post('/add', (req, res)=>{
  Model.Teacher.create({
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    email: req.body.email,
    createdAt: new Date(),
    updatedAt: new Date(),
    SubjectId: req.body.SubjectId
  })
  .then(()=>{
    res.redirect('/teachers')
  })
  .catch(err=>{
    // res.send(err.message)
    res.render('teachersAdd', {error: err.message, pageTitle: 'Add Teacher'})
  })
})

router.get('/edit/:id', (req, res) =>{
  Model.Teacher.findById(req.params.id)
  .then(rowsTeachers =>{
    Model.Subject.findAll()
    .then(rowsSubjects=>{
      res.render('teachersEdit', {dataTeachers: rowsTeachers, dataSubject: rowsSubjects, error: null, pageTitle:'Edit Teacher'})
    })

  })
  .catch(err =>{
    res.send(err)
  })
})

router.post('/edit/:id', (req, res)=>{
  Model.Teacher.update(
  {
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    email: req.body.email,
    SubjectId: req.body.SubjectId,
    createdAt: new Date(),
    updatedAt: new Date()
  },{
    where : {id:req.params.id}
  })
  .then(()=>{
    res.redirect('/teachers')
  })
  .catch(err=>{
    Model.Teacher.findById(req.params.id)
    .then(rowsTeachers=>{
      Model.Subject.findAll()
      .then(rowsSubjects=>{
        res.render('teachersEdit', {dataTeachers: rowsTeachers, dataSubject: rowsSubjects, error: err.message, pageTitle:'Edit Teacher'})
      })
    })
  })
})

router.get('/delete/:id', (req, res) => {
  Model.Teacher.destroy(
  {
    where : {id:req.params.id}
  })
  .then(rows=>{
    res.redirect('/teachers')
  })
  .catch(err =>{
    res.send(err)
  })
})

module.exports = router;
