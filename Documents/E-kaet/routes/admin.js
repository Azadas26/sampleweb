var express = require('express');
var router = express.Router();
var base = require('../database/base')
var product = require('../database/base')
/* GET home page. */
router.get('/', function (req, res, next) {

  product.getallProducts().then((data) => {
    console.log(data)
    res.render('./admin/list-product', { data, admin: true });
  })



});

router.get('/add', (req, res) => {
  res.render('./admin/add-product', { admin: true })
})

router.post('/add', (req, res) => {
  // console.log(req.body)
  // console.log(req.files.Image)

  base.link(req.body, (data) => {
    // console.log(data)
    var image = req.files.Image

    image.mv('./public/uploded-image/' + data + ".jpg", (err, done) => {
      if (!err) {
        res.render('./admin/add-product', { admin: true })
      }
      else {
        console.log("Error :" + err)
      }
    })


  })


})

module.exports = router;
