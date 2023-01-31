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

const blogs=async(req,res)=>{
    res.render('index',{title:'For you',classes:'opened',paths:[
        {
            id:1,
            name:'For you',
            url:'/',
            title:"Lastest Feeds"
        },
        {
            id:2,
            name:'Home',
            url:'/home',
            title:"Back Home"
        }
    ]})
}

//gets a single blog
const blog=(req,res)=>{
    res.render('home',{title:'',classes:'closed',paths:[
        {
            id:1,
            name:'For you',
            url:'/',
            title:"Lastest Feeds"
        },
        {
            id:2,
            name:'Home',
            url:'/home',
            title:"Back Home"
        }
    ]})
}

module.exports={
    blogs,
    blog
}
