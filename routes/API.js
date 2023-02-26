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
    changePassword,
    updateUserPic,
    deleteBlog,
    postChat
}=require('../controllers/AI');

//api routes
router.post('/',register);
router.post('/admin',protectAdmin,registerAdmin);
router.post('/blogger',protectAdmin,registerBlogger);
router.patch('/user/updatePic/:email',updateUserPic)
router.post('/verify',verify);
router.patch('/changePassword/:email',changePassword);
router.post('/code',verifyCode);
router.post('/login',login);
router.post('/blog',postBlog)
router.get('/blogs',getAllBlogs)
router.get('/get-users',protectAdmin,getUser)
router.get('/getblogs/:id',getBlog);
router.post('/chat/:email',postChat)
router.delete('/:email', deleteUser);
router.delete('/blogs/blog/:id',protectAdmin, deleteBlog);
// router.delete('/:email',protectUser||protectAdmin, deleteUser);

module.exports=router;