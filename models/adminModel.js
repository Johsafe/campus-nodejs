const mongoose=require('mongoose');
const  schema=mongoose.Schema;

const adminSchema=new schema({
    firstName:{
        type:String,
        require:true
    },
    lastName:{
        type:String,
        require:true
    },
    email:{
        type:String,
        require:true,
        unique:true
    }
},{
    timestamps:true
})

const adminModel=mongoose.model('admin',adminSchema);
module.exports=adminModel;