const express=require('express')
const{loginController,signupController}=require('../Controllers/userController')
const router=express.Router();

router.post('/signup',signupController)
router.post('/login',loginController)

module.exports =router