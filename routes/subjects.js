const express = require('express');
const router = express.Router();
const Model = require('../models');
const Score = require('../helpers/scoreList');

router.use((req,res, next)=>{
  if(req.session.authority == 'academic' || req.session.authority == 'headmaster'){
     next();
  } else {
    res.send('Maaf anda tidak diizinkan mengakses halaman ini');
  }
})

router.get('/', (req, res)=>{
  Model.Subject.findAll()
  .then(rowsSubjects => {
    Model.Teacher.findAll()
    .then(rowsTeachers =>{
      for (var i = 0; i < rowsSubjects.length; i++) {
        let teacherName = []
        for (var j = 0; j < rowsTeachers.length; j++) {
          if(rowsSubjects[i].id == rowsTeachers[j].SubjectId){
            let full_name = rowsTeachers[j].getfullName()
            rowsSubjects[i].teacher_name = full_name
            teacherName.push((j+1)+ '. ' +rowsSubjects[i].teacher_name)
          }
        }
        rowsSubjects[i].teacher_name = teacherName.join('\n')
      }
      res.render('subjects', {dataSubject: rowsSubjects, pageTitle : 'Subject Page'});
    })
  });
})

router.get('/add', (req, res)=>{
  res.render('subjectsAdd', {pageTitle: 'Add Subject'})
})

router.post('/add', (req, res) => {
  Model.Subject.create({
    subject_name: req.body.subject_name
  })
  .then(ok => {
    res.redirect('/subjects')
  })
})


router.get('/:id/enrolledstudents', (req, res) => {
  Model.StudentSubject.findAll({
    order: [['Student', 'first_name', 'ASC']],
    where: {
      SubjectId: req.params.id
    },
    include: [{ all: true }]
  })
  .then(rowsStudentSubject => {
    let score = []
    for(var i = 0; i < rowsStudentSubject.length; i++){
      score.push(rowsStudentSubject[i].score)
    }
    // res.send(score(Score))
    res.render('enrolledStudents', {dataEnrolled: rowsStudentSubject, scoreLetter: Score(score), pageTitle: 'data enrolledStudents'})
  })
})

router.get('/:SubjectId/:StudentId/give-score', (req, res) => {
  Model.Subject.findAll({
    where: {
      id: req.params.SubjectId
    }
  })
  .then(rowsSubjects => {
    Model.Student.findAll({
      where: {
        id: req.params.StudentId
      }
    })
    .then(rowsStudents => {
      res.render('score', {dataStudents: rowsStudents, dataSubject: rowsSubjects, pageTitle: 'score Page'})
    })
  })
})

router.post('/:SubjectId/:StudentId/give-score', (req, res) => {
  Model.StudentSubject.update({
    score: req.body.score,
    createdAt: new Date(),
    updatedAt: new Date()

  },{
    where: {
      StudentId: req.params.StudentId,
      $and: {
        SubjectId: req.params.SubjectId
      }
    }
  })
  .then(ok => {
    res.redirect(`/subjects/${req.params.SubjectId}/enrolledstudents`)
  })
})

module.exports = router;
