const router = require('express').Router()
const bodyParser = require('body-parser')
const authGard = require('./guards/auth.guard')
const ordersContoller = require('../controller/orders.controller')


router.post('/',authGard.isAuth,ordersContoller.postOrders)


router.get('/', bodyParser.urlencoded({extended:true}),authGard.isAuth,ordersContoller.getOrders)



module.exports = router 
