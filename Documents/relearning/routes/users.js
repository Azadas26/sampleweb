var express = require('express');
var router = express.Router();
var admindb = require('../database/admin-base')
var userdb = require('../database/user-base')

module.exports.common = (req, res, next) => {
  if (req.session.status) {
    next()
  }
  else {
    res.redirect('/login')
  }
}

/* GET users listing. */
router.get('/', function (req, res, next) {

  admindb.get_products().then((products) => {

    if (req.session.status) {
      var user = req.session.user

      res.render('./user/first-page', { admin: false, products, user })

    }
    else {
      res.render('./user/first-page', { admin: false, products })
    }

  })

});
router.get('/signup', (req, res) => {
  res.render('./user/signup-page', { admin: false })
})

router.post('/signup', (req, res) => {
  userdb.Do_signup(req.body).then((data) => {
    res.redirect('/signup')
  })
})

router.get('/login', (req, res) => {
  if (req.session.falase) {
    var errr = "Incorrect Username or password"
    res.render('./user/login-page', { admin: false, errr })
    req.session.falase = false
  }
  else {
    res.render('./user/login-page', { admin: false })
  }

})

router.post('/login', (req, res) => {
  userdb.Do_login(req.body).then((state) => {
    if (state.status) {
      req.session.status = true;
      req.session.user = state.user
      // console.log(req.session.user)
      res.redirect('/')
    }
    else {

      req.session.falase = true
      res.redirect('/login')

    }
  })
})

router.get('/logout', (req, res) => {
  req.session.destroy()
  res.redirect('/login')
})

router.get('/cart', this.common, (req, res) => {
  //console.log(req.query.id)
  userdb.Do_cart(req.session.user._id,req.query.id).then((data)=>
  {
     res.redirect('/')
  })
})

router.get('/selectpro', this.common, (req, res) => {
  
   userdb.Get_carted_pro(req.session.user._id).then((cartpro)=>
   {
      res.render('./user/cart-page',{admin:false,cartpro,user:req.session.user})
   })

})

module.exports = router;
