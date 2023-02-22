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
    protectAdmin,
    getUser,
    registerBlogger,
    changePassword
}=require('../controllers/AI');

//api routes
router.post('/',register);
router.post('/admin',protectAdmin,registerAdmin);
router.post('/blogger',protectAdmin,registerBlogger);
router.post('/verify',verify);
router.patch('/changePassword/:email',changePassword);
router.post('/code',verifyCode);
router.post('/login',login);
router.post('/blog',protectAdmin,postBlog)
router.get('/blogs',getAllBlogs)
router.get('/get-users',protectAdmin,getUser)
router.get('/getblogs/:id',getBlog)
router.delete('/:email',protectUser, deleteUser);

module.exports=router;