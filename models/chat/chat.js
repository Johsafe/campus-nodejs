const mongoose=require('mongoose');
const chatSchema=mongoose.Schema({
    firstName:{
        type:String,
        require:true
    },
    lastName:{
        type:String,
        require:true
    },
    photo:{
        type:String,
        require:true
    },
    email:{
        type:String,
        require:true,
    },
    message:{
        type:String,
        require:true
    },
    date:{
        type:String,
        require:true
    },
    time:{
        type:String,
        require:true
    }
},{
    timestamps:true
})
const chatModel=mongoose.model('chat',chatSchema)
module.exports=chatModel