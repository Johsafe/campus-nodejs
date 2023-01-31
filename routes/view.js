const express=require('express'),
views=express.Router();
const {
    blog,
    blogs
}=require('../controllers/AI')
//view routes
views.get('/',blogs);

views.get('/home',(req,res)=>{
    res.render('home',{title:'Home',classes:'closed',paths:[
        {
            id:1,
            name:'For you',
            url:'/',
            title:"Lastest Feeds"
        },
        {
            id:2,
            name:'Home',
            url:'/home',
            title:"Back Home"
        }
    ]})
});
views.get('/blogs/:id',blog);
//api routes
views.use('/api',require('./API'));

//rendering not found page
views.use((req,res)=>{
    res.status(404).render('notfound',{title:'Not found',classes:'closed',paths:[
        {
            id:1,
            name:'For you',
            url:'/',
            title:"Lastest Feeds"
        },
        {
            id:2,
            name:'Home',
            url:'/home',
            title:"Back Home"
        }
    ]})
})

module.exports=views
