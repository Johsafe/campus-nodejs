// const brain =require('brain.js');
// const data=require('../db/data.json');
// const network= new brain.recurrent.LSTM();

// const trainingData=data.map(item=>({
//     input: item.signs,
//     output: item.sickness
// }));
// network.train(trainingData,{
//     iterations:100,
// });
const User=require('../models/userModel');
const Blog=require('../models/blogModel');
const Blogger=require('../models/Bloggers/blogger')
const Admin =require('../models/adminModel');
const bcrypt=require('bcryptjs');
const jwt=require('jsonwebtoken');
const nodemailer=require('nodemailer');
const mongoose=require('mongoose');
require('dotenv').config();

//gets all blogs
const blogs=async(req,res)=>{
    const news=await Blog.find({}).sort({createdAt:-1})
    res.render('index',{title:'For you',js:'/js/main.js',news,classes:'opened',paths:[
        {
            id:1,
            name:'Home',
            url:'/',
            title:"Back Home"
        },
        {
            id:2,
            name:'Login',
            class:'out',
            url:'/login',
            title:"Go to login page"
        },
        {
            id:3,
            name:'Sign up',
            url:'/register',
            class:'out',
            title:"Go to Sign up page"
        }
    ]})
}

//gets a single blog
const blog=async(req,res)=>{
    const {id}=req.params;
    const $new=await Blog.findById({_id:id})
    res.render('blog',{js:'/js/main.js',$new,classes:'closed',paths:[
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
        }
    ]})
}

//user verification
const verify=async(req,res)=>{
    try {
        const {email,code}=req.body;
        const userExist=await User.findOne({email});
        //check if user exist in the db
        if(userExist){
            res.send({error:"User Exist!"})
        }else{
            let mailTranporter=nodemailer.createTransport({
                service:'gmail',
                auth:{
                    user:process.env.TRANSPORTER,
                    pass:process.env.PASSWORD
                }
            });
            let details={
                from:process.env.TRANSPORTER,
                to:email,//receiver
                subject:`Campus Blogs: Verification Code`,
                text:`Your verification is ${code}`
            }
            mailTranporter.sendMail(details,(err)=>{
                if(err){
                    res.send({error:`Cannot sent verification code, try again!`});
                } else{
                    res.send({msg:'Email sent',email,link:'/verify',code});
                }
            })
        }
    } catch (error) {
        res.status(500).send({error:error.message})
    }
}

//verify code
const verifyCode=async(req,res)=>{
    try {
        const {code}=req.body
        if(code){
            res.send({msg:'proceed',link:'/last'})
        }else{
            res.status(201).send({error:"Code doesn't match the sent code!"})
        }
        
    } catch (error) {
        res.status(500).send({error:error.message})
    }
}

//user register
const register=async(req,res)=>{
    try {
        const {firstName,lastName,email,password,university}=req.body
        if(firstName&&lastName&&email&&password&&university){
            //hashing the password
            const salt=await bcrypt.genSalt(10);
            const hashedPassword=await bcrypt.hash(password,salt);
            //creating user account in db
            const newUser=await User.create({
                firstName,
                lastName,
                university,
                email,
                password:hashedPassword
            });
            if(newUser){
                res.status(200).send({
                    msg:`Welcome ${newUser.firstName} ${newUser.lastName}`,
                    _id:newUser.id,
                    firstName:newUser.firstName,
                    lastName:newUser.lastName,
                    university:newUser.university,
                    email:newUser.email,
                    token:generateUserToken(newUser.id)
                })
            }else{
                res.status(201).send({error:"Invalid user data!"})
            }
        }else{
            res.status(401).send({error:"Enter the required fields!"})
        }
    } catch (error) {
        res.status(500).send({error:error.message})
    }
}
//register admin
const registerAdmin =async(req,res)=>{
    try{
        const {firstName,lastName,email}=req.body;
        const findUser=await User.findOne({email})
        const findAdmin=await Admin.findOne({email})
        if(findUser&&!findAdmin){
            const createAdmin=await Admin.create({firstName,lastName,email})
            res.status(200).send({msg:'Admin created'})
        }else{
            res.status(404).send({error:'This user is not register!'})
        }
    }catch(err){
        res.status(500).send({error:err.message})
    }
}
//user login
const login=async(req,res)=>{
    try {
        const {email,password}=req.body
        if(email&&password){
           const findAdmin=await Admin.findOne({email})
           const findBlogger=await Blogger.findOne({email})
           if(findAdmin){
            const user=await User.findOne({email});
            if(user&&(await bcrypt.compare(password,user.password))){
                res.status(200).send({admin:`Welcome ${user.firstName} ${user.lastName}`,
                    _id:user.id,
                    firstName:user.firstName,
                    lastName:user.lastName,
                    university:user.university,
                    email:user.email, 
                    adminToken:generateAdminToken(findAdmin.id)
                })
            }else{
                res.status(400).send({error:'Invalid Credentials'})
            }
           }else if(findBlogger){
            const user=await User.findOne({email});
            if(user&&(await bcrypt.compare(password,user.password))){
                res.status(200).send({admin:`Welcome ${user.firstName} ${user.lastName}`,
                    _id:user.id,
                    firstName:user.firstName,
                    lastName:user.lastName,
                    university:user.university,
                    email:user.email, 
                    bloggerToken:generateBloggerToken(findBlogger.id)
                })
            }else{
                res.status(400).send({error:'Invalid Credentials'})
            }
           }else{
            const user=await User.findOne({email});
            if(user&&(await bcrypt.compare(password,user.password))){
                res.status(200).send({msg:`Welcome ${user.firstName} ${user.lastName}`,
                    _id:user.id,
                    firstName:user.firstName,
                    lastName:user.lastName,
                    university:user.university,
                    email:user.email, 
                    token:generateUserToken(user.id)
                })
            }else{
                res.status(400).send({error:'Invalid Credentials'})
            }
           }
        }else{
            res.status(401).send({error:"Enter the required fields!"})
        }
    } catch (error) {
        res.status(500).send({error:error.message})
    }
}

//register a blogger
const registerBlogger=async(req,res)=>{
    try{
        const {firstName,lastName,email}=req.body;
        const findUser=await User.findOne({email})
        const findAdmin=await Admin.findOne({email})
        const findBlogger=await Blogger.findOne({email})
        if(findUser&&!findAdmin&&!findBlogger){
            await Blogger.create({firstName,lastName,email})
            res.status(200).send({msg:'Blogger created'})
        }else if(findBlogger){
            res.status(201).send({error:'This blogger is already register!'})
        }else if(findAdmin){
            res.status(201).send({error:'You cannot add an admin as a blogger!'})
        }else{
            res.status(404).send({error:'This user is not register!'})
        }
    }catch(error){
        res.status(500).send({error:error.message})
    }
}

//User auth Middlerware
const protectUser=async(req,res,next)=>{
    let token
    if(req.headers.authorization&&req.headers.authorization.startsWith('Bearer')){
        try{
            //get token from headers
            token=req.headers.authorization.split(' ')[1]
            //verify token
            const decoded=jwt.verify(token,process.env.JWT_SECRET);
            //get user from the token
            req.user=await User.findById(decoded.id).select('password')
            next()
  
        }catch (error){
            res.status(401).send({error:'Not Authorised☠'})
        }
    }
    if(!token){
      res.status(401).send({error:'No Token Available☠'})
    }
  };

//admin auth Middlerware
const protectAdmin=async(req,res,next)=>{
    let token
    if(req.headers.authorization&&req.headers.authorization.startsWith('Bearer')){
        try{
            //get token from headers
            token=req.headers.authorization.split(' ')[1]
            //verify token
            jwt.verify(token,process.env.JWT_ADMIN_SECRET);
            next()
  
        }catch (error){
            res.status(401).send({error:'Not Authorised☠'})
        }
    }
    if(!token){
      res.status(401).send({error:'No Token Available☠'})
    }
  };

  //generate User token
  const generateUserToken=(id)=>{
    return jwt.sign({id},process.env.JWT_SECRET,{
        expiresIn:'309d'
    })
  };
  //generate admin token
  const generateAdminToken=(id)=>{
    return jwt.sign({id},process.env.JWT_ADMIN_SECRET,{
        expiresIn:'309d'
    })
  };
  //generate blogger token
  const generateBloggerToken=(id)=>{
    return jwt.sign({id},process.env.JWT_BLOGGER_SECRET,{
        expiresIn:'309d'
    })
  };

  const deleteUser=async(req,res)=>{
    try {
        const {userid}=req.params;
        if(!mongoose.Types.ObjectId.isValid(userid)){
            return res.status(404).json({error:'No such User'})
          } 
        const userDeleted=await User.findByIdAndDelete({_id:userid})
        if(userDeleted){
            res.json({msg:"Account delete successful",userDeleted})
        }else{
            res.json({error:"Cannot Delete account!"})
        }
    } catch (error) {
        res.status(500).json({error:'Cannot Delete account, try again!'})
    }    
  }
  //add blog to db
  const postBlog=async(req,res)=>{
    try {
        const {title,image,body,author,authorImage,date}=req.body;
        const createBlog=await Blog.create({title,image,body,author,authorImage,date})
        if(createBlog){
            res.status(200).send({msg:'Blog Posted',link:'/'})
        }else{
            res.send({error:'Cannot post blog!'})
        }
    } catch (error) {
        res.status(500).send({error:error.message})
    }
  }

  //api route for mobile (addition ...not need by the site)
  const getAllBlogs=async(req,res)=>{
      try{
          const blogs=await Blog.find({}).sort({createdAt:-1})
          res.send(blogs)
      }catch(error){
          res.status(500).send({error:error.message})
      }
  }
  const getBlog=async(req,res)=>{
    try{
        const {id}=req.params;
        const blog=await Blog.findById({_id:id})
        res.send(blog)
    }catch(error){
        res.status(500).send({error:error.message})
    }
  }
  const getUser=async(req,res)=>{
    try {
        const users=await User.find({})
        res.send(users)
    } catch (error) {
        res.status(500).send({error:error.message})
    }
  }


module.exports={
    register,
    verify,
    login,
    blogs,
    verifyCode,
    blog,
    deleteUser,
    protectUser,
    postBlog,
    getAllBlogs,
    getBlog,
    registerAdmin,
    protectAdmin,
    getUser,
    registerBlogger
}
