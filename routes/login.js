var express = require('express');
var router = express.Router();
const Model = require('../models');
const salt = require('../helpers/salt');

router.get('/signup', (req, res)=> {
  res.render('signup');
});

router.get('/login', (req, res)=>{
  res.render('login', {error: null} )
})

router.post('/login', (req, res)=>{
  Model.User.findOne({
    where: {
      username: req.body.username
    }
  })
  .then((user) =>{
		var saltUserLogin = user.secret
		var passwordUserLogin = req.body.password
		var newPass = salt.createHash(passwordUserLogin, saltUserLogin)
		if (user.password == newPass) {
			req.session.login = true
			req.session.role = user.role
			req.session.secret = user.secret

			if(req.session.role == "teacher"){
        req.session.authority = "teacher"
      } else if(req.session.role == "academic"){
        req.session.authority = "academic"
      } else if(req.session.role == "headmaster"){
        req.session.authority = "headmaster"
      }

			res.redirect('/dashboard')
		}
	})
  .catch(err=>{
    res.send(err)
  })
})

router.get('/logout', (req, res, next)=>{
  req.session.destroy()
  res.redirect('/')
})


router.post('/signup', (req, res)=> {
  Model.User.create({
    username: req.body.username,
    password: req.body.password,
    role: req.body.role
  })
  .then(()=> {
    res.redirect('/')
  })
  .catch(err => {
    console.log(err);
    res.send(err);
  })
})


module.exports = router
