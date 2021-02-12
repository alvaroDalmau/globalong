const router = require('express').Router();
const bcrypt = require('bcryptjs');
const UserModel = require('../models/User.model.js');

/* GET home page */
router.get('/', (req, res, next) => {
  res.render('index');
});

//SIGNIN
router.get('/signin', (req, res, next) => {
  res.render('auth/signin.hbs');
});

//LOG IN
router.get('/login', (req, res, next) => {
  res.render('auth/login.hbs');
});

//ONGS
// router.get('/ngos', (req, res, next) => {
//   res.render('ngos.hbs');
// });

router.post('/login', (req, res, next) => {
  const { email, password } = req.body;
  UserModel.findOne()
    .then(result => {
      if (result) {
        bcrypt
          .compare(password, result.password)
          .then(matches => {
            if (matches) {
              // req.session.logedUser = response;
              res.redirect('/profile');
            } else {
              res.render('auth/login.hbs', {
                msg: 'Password dont match, try again',
              });
            }
          })
          .catch(err => {
            next(err);
          });
      } else {
        res.render('login.hbs', { msg: 'Email does not exist' });
      }
    })
    .catch(err => {
      next(err);
    });
});

//SIGNUP

// router.get("/profile", (req, res, next) => {
//   res.render("profile.hbs");
// });

module.exports = router;
