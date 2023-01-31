const express=require('express');
const cors=require('cors');
require('dotenv').config();

//intializing server
const app=express();

//middlewares
app.use(cors({}));
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static('public'));

//setting view engines
app.set('view engine','ejs');

//ejs routes
app.use(require('./routes/view'));

const port=process.env.PORT||5000;
//listening to server
app.listen(port,()=>{
    console.log(`Server running on Port ${port}`)
})