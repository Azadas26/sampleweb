var express = require('express');
var router = express.Router();
var product = require('../database/base')
/* GET users listing. */
router.get('/', function (req, res, next) {

  product.getallProducts().then((data) => {
    console.log(data)
    res.render('./user/first-page', { data, admin: false });
  })


});

module.exports = router;
