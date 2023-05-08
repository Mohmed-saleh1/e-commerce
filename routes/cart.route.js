const router = require('express').Router()
const bodyParser = require('body-parser')
const { check } = require('express-validator')
const cartController = require('../controller/cart.controller.js')
const { deleteItem } = require('../models/cart.model.js')
const authGard = require('./guards/auth.guard')

router.post('/', authGard.isAuth,bodyParser.urlencoded({extended:true}),
    check("amount")
    .not()
    .isEmpty()
    .withMessage("amount is required")
    .isInt({min:1})
    .withMessage("amount must be grater than 0"),
    cartController.postCart
)
router.get('/', authGard.isAuth,cartController.getCart)

router.post('/save',authGard.isAuth,bodyParser.urlencoded({extended:true}),
check("amount")
.not()
.isEmpty()
.withMessage("amount is required")
.isInt({min:1})
.withMessage("amount must be grater than 0"),
cartController.postSave)

router.post('/delete',bodyParser.urlencoded({extended:true}) ,authGard.isAuth,cartController.postDelete)

router.post('/deleteAll',bodyParser.urlencoded({extended:true}) ,authGard.isAuth,cartController.postDeleteAll)

router.post('/verify',bodyParser.urlencoded({extended:true}) ,authGard.isAuth,cartController.postOrder)

router.get('/verify', authGard.isAuth,cartController.getOrder)




module.exports=router