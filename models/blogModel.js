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
    email:{
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
    category:{
        type:String,
    },
    date:{
        type:String,
        require:true
    }
},{
    timestamps:true
})

const blogModel=mongoose.model("blog",blogSchema)
module.exports=blogModel;