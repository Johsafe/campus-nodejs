const brain =require('brain.js');
const data=require('../db/data.json');
const request = require('request');
const network= new brain.recurrent.LSTM();
const fs = require('fs');

const trainingData=data.map(item=>({
    input: item.signs,
    output: item.sickness
}));
network.train(trainingData,{
    iterations:100,
});

const Ask=async(req,res)=>{
    try {
        const {prompt}=req.body;
        const output=network.run(prompt);

        //google search the output
        let options = {
              'method': 'POST',
              'url': 'https://google.serper.dev/search',
              'headers': {
                'X-API-KEY': '15afe59cd3f32c28b37219ee2d073b7348626de7',
                'Content-Type': 'application/json'
              },
            body: JSON.stringify({
                "q": prompt,
                "gl": "us",
                "hl": "en",
                "autocorrect": true
            })
            
        };
        request(options, (error, response) => {
            if (error) {
                res.status(404).send({msg:"No Internet"})
            }else{
                res.status(200).send({
                    msg:output,
                    ans:response.body
                });
            }
        });
                // res.status(200).send({
                //     msg:output,
                //     body:require('../search.json')
                // });
    } catch (error) {
        res.status(400).send({
            error:error.message,
            msg:'Try again!',
        })
    }
}

module.exports={
    Ask,
}
