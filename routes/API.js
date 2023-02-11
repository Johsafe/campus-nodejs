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
    getBlog,
    registerAdmin,
    protectAdmin
}=require('../controllers/AI');

//api routes
router.post('/',register);
router.post('/admin',protectAdmin,registerAdmin);
router.post('/verify',verify);
router.post('/code',verifyCode);
router.post('/login',login);
router.post('/blog',protectAdmin,postBlog)
router.get('/blogs',getAllBlogs)
router.get('/getblogs/:id',getBlog)
router.delete('/:userid',protectUser, deleteUser);

module.exports=router;