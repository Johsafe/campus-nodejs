const mongoose=require('mongoose');
const  schema=mongoose.Schema;

const userSchema=new schema({
    firstName:{
        type:String,
        require:true
    },
    lastName:{
        type:String,
        require:true
    },
    university:{
        type:String,
        require:true
    },
    email:{
        type:String,
        require:true,
        unique:true
    },
    password:{
        type:String,
        require:true
    }
},{
    timestamps:true
})

const userModel=mongoose.model('user',userSchema);
module.exports=userModel;