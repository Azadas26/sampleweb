var express = require('express');
var router = express.Router();
var base=require('../database/base')
/* GET home page. */
router.get('/', function(req, res, next) {

  var products=
  [
    {
      name:"Iphone 12 pro",
      disc:"An apple Product",
      price:"200000",
      image:"https://cdn.shopify.com/s/files/1/1684/4603/products/iphone-12-pro_Graphite.png?v=1652856493"
    },
      {
        name: "Iphone 12 pro",
        disc: "An apple Product",
        price: "200000",
        image: "https://cdn.shopify.com/s/files/1/1684/4603/products/iphone-12-pro_Graphite.png?v=1652856493"
      },
      {
        name: "Iphone 12 pro",
        disc: "An apple Product",
        price: "200000",
        image: "https://cdn.shopify.com/s/files/1/1684/4603/products/iphone-12-pro_Graphite.png?v=1652856493"
      },
      {
        name: "Iphone 12 pro",
        disc: "An apple Product",
        price: "200000",
        image: "https://cdn.shopify.com/s/files/1/1684/4603/products/iphone-12-pro_Graphite.png?v=1652856493"
      },
      {
        name: "Iphone 12 pro",
        disc: "An apple Product",
        price: "200000",
        image: "https://cdn.shopify.com/s/files/1/1684/4603/products/iphone-12-pro_Graphite.png?v=1652856493"
      },
      {
        name: "Iphone 12 pro",
        disc: "An apple Product",
        price: "200000",
        image: "https://cdn.shopify.com/s/files/1/1684/4603/products/iphone-12-pro_Graphite.png?v=1652856493"
      },
      {
        name: "Iphone 12 pro",
        disc: "An apple Product",
        price: "200000",
        image: "https://cdn.shopify.com/s/files/1/1684/4603/products/iphone-12-pro_Graphite.png?v=1652856493"
      },
      {
        name: "Iphone 12 pro",
        disc: "An apple Product",
        price: "200000",
        image: "https://cdn.shopify.com/s/files/1/1684/4603/products/iphone-12-pro_Graphite.png?v=1652856493"
      }
  ]


  res.render('./admin/list-product', {products,admin:true });
});

router.get('/add',(req,res)=>
{
          res.render('./admin/add-product',{admin:true})
})

router.post('/add', (req, res) => {
  // console.log(req.body)
  // console.log(req.files.Image)

   base.link(req.body,(data)=>
   {
      // console.log(data)
      var image = req.files.Image
     
      image.mv('./public/uploded-image/'+data+".jpg",(err,done)=>
      {
              if(!err)
              {
                res.render('./admin/add-product', { admin: true })
              }
              else
              {
                console.log("Error :"+err)
              }
      })

     
   })

  
})

module.exports = router;
