const mongoose=require('mongoose');
const bloggerSchema=mongoose.Schema({
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
        require:true
    }
},{
    timestamps:true
})
const bloggerModel=mongoose.model('blogger',bloggerSchema)
module.exports=bloggerModel