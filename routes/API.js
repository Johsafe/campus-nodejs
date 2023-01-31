const express=require('express');
const router=express.Router();
const {
    Ask,
}=require('../controllers/AI');

//post signs and sympthoms
router.post('/',Ask)

module.exports=router;