const router = require('express').Router()
//const check = require('express-validator').check
//const bodyParser = require('body-parser')
const productController = require('../controller/productController')
//const authGard = require('./guards/auth.guard')

 router.get('/',productController.getProduct)


 router.get('/:id',productController.getProductsById)


module.exports = router