const mongoose=require('mongoose')
const blogSchema=mongoose.Schema({
    title:{
        type:String,
        require:true,
        maxLength:300
    },
    image:{
        type:String,
        require:true
    },
    body:{
        type:String,
        require:true
    },
    author:{
        type:String,
        require:true
    },
    authorImage:{
        type:String,
        require:true
    },
    date:{

    }
},{
    timestamps:true
})

const blogModel=mongoose.model(blogSchema,"blog")
module.exports=blogModel;