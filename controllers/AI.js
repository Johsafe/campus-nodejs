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
const news=require('../db/blogs.json');
const User=require('../models/userModel');
const bcrypt=require('bcryptjs');
const jwt=require('jsonwebtoken');
const mongoose=require('mongoose')
require('dotenv').config();

//gets all blogs
const blogs=async(req,res)=>{
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
const blog=(req,res)=>{
    const {id}=req.params
    res.render('blog',{title:'Blog',js:'/js/main.js',$new:news[id],classes:'closed',paths:[
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
const verify=async(req,res)=>{
    try {
        const {email}=req.body;
        const userExist=await User.findOne({email});
        //check if user exist in the db
        if(userExist){
            res.send({error:"User Exist!"})
        }else{
            res.send({
                msg:"/verify",
                email
            })
        }
    } catch (error) {
        res.status(500).send({error:error.message})
    }
}

const verifyCode=async(req,res)=>{
    try {
        const {code}=req.body
        if(code==='5656'){
            res.send({msg:'/last'})
        }else{
            res.status(201).send({error:"Code doesn't match the sent code!"})
        }
        
    } catch (error) {
        res.status(500).send({error:error.message})
    }
}


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

const login=async(req,res)=>{
    try {
        const {email,password}=req.body
        if(email&&password){
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
        }else{
            res.status(401).send({error:"Enter the required fields!"})
        }
    } catch (error) {
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

  //generate User token
  const generateUserToken=(id)=>{
    return jwt.sign({id},process.env.JWT_SECRET,{
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
module.exports={
    register,
    verify,
    login,
    blogs,
    verifyCode,
    blog,
    deleteUser,
    protectUser
}
