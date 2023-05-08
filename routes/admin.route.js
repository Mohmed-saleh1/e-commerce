const router = require('express').Router();

const check= require('express-validator').check;

const adminController = require('../controller/admin.controller');
const adminGuard = require('./guards/admin.guard')
const multer = require('multer')

router.get('/add',adminGuard,adminController.getAdmin )


router.post('/add',adminGuard,multer({
    dest:'images'
}).single('image'),adminController.postAdmin)









module.exports= router;