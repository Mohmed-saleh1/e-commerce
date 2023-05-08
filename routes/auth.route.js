const check = require('express-validator').check
const router = require('express').Router();
const bodyParser = require('body-parser');
const authGuard = require('./guards/auth.guard')
const authController = require('../controller/auth.controller')
  
  router.get('/signup',authGuard.nonAuth, authController.getSignup);

  router.post( '/signup',authGuard.nonAuth, 
        bodyParser.urlencoded({extended:true}),
        check("username","username shoudn't be empty").not().isEmpty(),
        check('email',"invalid email style").not().isEmpty().isEmail(),
        check("password","password is less than 3 characters").isLength({min:3}),
        check("confirmPassword").custom((value,{req})=>{
          if (value===req.body.password) return true 
          else throw "passwords not match" }),
        authController.postSignup)

  router.get('/login',authGuard.nonAuth, 
        check('email').not().isEmpty().isEmail(),
        check('password').isLength({min:6}),
        authController.getLogin);
        
  router.post('/login',authGuard.nonAuth, bodyParser.urlencoded({extended:true}),
        check("email").not().isEmpty().withMessage("email sholdn't be empty").isEmail().withMessage("invalid email style"),
        check("password").isLength({min:3}).withMessage("the password is less than 3 characters "),
        authController.postLogin)

  router.all('/logout',authGuard.isAuth, authController.logout)



       module.exports=router