const express=require('express');
const router=express.Router();
const {
    register,
    verify,
    verifyCode,
    login
}=require('../controllers/AI');

//api routes
router.post('/',register);
router.post('/verify',verify);
router.post('/code',verifyCode);
router.post('/login',login);

module.exports=router;