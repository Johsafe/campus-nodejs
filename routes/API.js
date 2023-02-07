const express=require('express');
const router=express.Router();
const {
    register,
    verify,
    verifyCode,
    login,
    deleteUser,
    protectUser,
    postBlog,
    getAllBlogs,
    getBlog
}=require('../controllers/AI');

//api routes
router.post('/',register);
router.post('/verify',verify);
router.post('/code',verifyCode);
router.post('/login',login);
router.post('/blog',protectUser,postBlog)
router.get('/blogs',getAllBlogs)
router.get('/getblogs/:id',getBlog)
router.delete('/:userid',protectUser, deleteUser);

module.exports=router;