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

const blogs=async(req,res)=>{
    res.render('index',{title:'For you',news,classes:'opened',paths:[
        {
            id:1,
            name:'Home',
            url:'/home',
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

//gets a single blog
const blog=(req,res)=>{
    const {id}=req.params
    res.render('blog',{title:'Blog',$new:news[id],classes:'closed',paths:[
        {
            id:1,
            name:'Home',
            url:'/home',
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

module.exports={
    blogs,
    blog
}
