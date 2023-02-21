const express=require('express'),
views=express.Router();
const {
    blog,
    blogs,
    blogCategory
}=require('../controllers/AI')
//view routes
views.get('/',blogs);

views.get('/categories/:cat',blogCategory);

views.get('/home',(req,res)=>{
    res.render('home',{title:'Home',classes:'closed',js:"/js/main.js",paths:[
        {
            id:1,
            name:'For you',
            url:'/',
            title:"Lastest Feeds"
        },
        {
            id:2,
            name:'Login',
            url:'/login',
            class:'out',
            title:"Go to login page"
        },
        {
            id:3,
            name:'Polities',
            url:'/categories/polities',
            title:"Polities"
        },
        {
            id:4,
            name:'Sign up',
            url:'/register',
            class:'out',
            title:"Go to Sign up page"
        }
    ]})
});
views.get('/dashboard',(req,res)=>{
    res.render('dashboard',{title:'Dashboard',classes:'closed',js:"/js/main.js",paths:[
        {
            id:1,
            name:'For you',
            url:'/',
            title:"Lastest Feeds"
        },
        {
            id:2,
            name:'Home',
            url:'/',
            title:"Back Home"
        },
        {
            id:3,
            name:'Polities',
            url:'/categories/polities',
            title:"Polities"
        }
    ]})
});
views.get('/create',(req,res)=>{
    res.render('createBlog',{title:'Add a new blog',classes:'closed',js:"/js/main.js",paths:[
        {
            id:1,
            name:'For you',
            url:'/',
            title:"Lastest Feeds"
        },
        {
            id:2,
            name:'Home',
            url:'/',
            title:"Back Home"
        }
    ]})
});
views.get('/addAdmin',(req,res)=>{
    res.render('addAdmin',{title:'Add a new administrator',classes:'closed',js:"/js/main.js",paths:[
        {
            id:1,
            name:'For you',
            url:'/',
            title:"Lastest Feeds"
        },
        {
            id:2,
            name:'Home',
            url:'/',
            title:"Back Home"
        }
    ]})
});
views.get('/register',(req,res)=>{
    res.render('signUp',{title:'register',js:'/js/main.js',classes:'closed',paths:[
        {
            id:1,
            name:'Home',
            url:'/',
            title:"Back Home"
        },
        {
            id:2,
            name:'For you',
            url:'/',
            title:"Lastest Feeds"
        },
        {
            id:3,
            name:'Polities',
            url:'/categories/polities',
            title:"Polities"
        },
        {
            id:4,
            name:'Login',
            url:'/login',
            class:'out',
            title:"Go to login page"
        }
    ]})
});
views.get('/verify',(req,res)=>{
    res.render('verify',{title:'verify',js:'/js/main.js',classes:'closed',paths:[
        {
            id:1,
            name:'Home',
            url:'/',
            title:"Back Home"
        },
        {
            id:2,
            name:'For you',
            url:'/',
            title:"Lastest Feeds"
        },
        {
            id:3,
            name:'Polities',
            url:'/categories/polities',
            title:"Polities"
        },
        {
            id:4,
            name:'Login',
            url:'/login',
            class:'out',
            title:"Go to login page"
        }
    ]})
});
views.get('/last',(req,res)=>{
    res.render('signUp2',{title:'Last step',js:'/js/main.js',classes:'closed',paths:[
        {
            id:1,
            name:'Home',
            url:'/',
            title:"Back Home"
        },
        {
            id:2,
            name:'For you',
            url:'/',
            title:"Lastest Feeds"
        },
        {
            id:3,
            name:'Polities',
            url:'/categories/polities',
            title:"Polities"
        },
        {
            id:4,
            name:'Login',
            url:'/login',
            class:'out',
            title:"Go to login page"
        }
    ]})
});
views.get('/login',(req,res)=>{
    res.render('login',{title:'Login',js:'/js/main.js',classes:'closed',paths:[
        {
            id:1,
            name:'Home',
            url:'/',
            title:"Back Home"
        },
        {
            id:2,
            name:'For you',
            url:'/',
            title:"Lastest Feeds"
        },
        {
            id:3,
            name:'Polities',
            url:'/categories/polities',
            title:"Polities"
        },
        {
            id:4,
            name:'Sign Up',
            url:'/register',
            class:'out',
            title:"Go to sign up page"
        }
    ]})
});
views.get('/blogs/:id',blog);
//api routes
views.use('/api',require('./API'));

//rendering not found page
views.use((req,res)=>{
    res.status(404).render('notfound',{title:'Not found',js:'/js/main.js',classes:'closed',paths:[
        {
            id:1,
            name:'Home',
            url:'/',
            title:"Back Home"
        },
        {
            id:2,
            name:'For you',
            url:'/',
            title:"Lastest Feeds"
        },
        {
            id:3,
            name:'Polities',
            url:'/categories/polities',
            title:"Polities"
        }
    ]})
})

module.exports=views
