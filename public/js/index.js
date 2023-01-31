//get diagnosed button
const getDiagnosed=document.querySelector('#get-diagnosed');
getDiagnosed.addEventListener('click',()=>{
    window.location.href='/laboratory'
});
const getDiagnosed2=document.querySelector('#get-diagnosed2');
getDiagnosed2.addEventListener('click',()=>{
    window.location.href='/laboratory'
});

//opens menu list
const openMenu=document.querySelector('.menu');
openMenu.addEventListener('click',()=>{
    document.querySelector('.menu-list-bg').style.display='block'
});
//close menu list
const closeMenu= document.querySelector('.menu-list-bg');
closeMenu.addEventListener('click',()=>{
    document.querySelector('.menu-list-bg').style.display='none'
});

//goes to landing page
const toLandingPage=document.querySelector('.logo') 
toLandingPage.addEventListener('click',()=>{
    window.location.href='/'
})

const tags=[
    {
        id:1,
        tag:['Headache','Fatigue','Back pain','Stomachache']
    },
    {
        id:2,
        tag:['Vomiting','Neck pain','Irritability','Sleepiness']
    },
    {
        id:3,
        tag:['Weight loss','Blurred vision','Back pain','Stomachache']
    },
    {
        id:4,
        tag:['Skin rash','Swelling','Joint pain','Depressed']
    },
    {
        id:5,
        tag:['Fever','Diarrhea','Muscle aches','Coughing']
    },
    {
        id:6,
        tag:['Shortness of breath','abdominal pain','Chest pain','Change in appetite']
    }
]

const tagSection=document.querySelector('.tag-section');
tags.map(tag=>{
    let i='';
    i=`
    <div class="column" key=${tag.id}>
        <div class="tag">
           ${tag.tag[0]}
        </div>
        <div class="tag">
            ${tag.tag[1]}
        </div>
        <div class="tag">
            ${tag.tag[2]}
        </div>
        <div class="tag">
            ${tag.tag[3]}
        </div>
    </div>
    `
    tagSection.innerHTML+=i;
})

const questions=[
    {
        id:1,
        question:'Difference between symptoms and signs of illnesses?'
    }
]
const tagQuestion=document.querySelector('.tag-question');
questions.map(tag=>{
    let i='';
    i=`
    <div class='tag' key=${tag.id}>
        ${tag.question}
    </div>
    `
    tagQuestion.innerHTML+=i;
});


//get chacked form
document.querySelector('.form-btn').innerText='Get Checked';
const getCheckedForm=document.querySelector('.form-get-checked');
getCheckedForm.addEventListener('submit',async(e)=>{
    e.preventDefault();
    const objective=document.querySelector('.objective');
    const objectiveContent=document.querySelector('.objective-content');
    const objectiveAnswer=document.querySelector('.objective-answer');
    const objectiveContentAnswer=document.querySelector('.objective-content-answer');
    try {
        document.querySelector('.form-btn').disabled=true;
        document.querySelector('.form-btn').innerHTML="<i>Submitting...</i>";
        const url='/api'
        const response=await fetch(url,{
            method:'POST',
            headers:{
                "content-type":'application/json'
            },
            body:JSON.stringify({
                prompt:getCheckedForm.getChecked.value
            })
        })
        document.querySelector('.form-btn').innerText='Get Checked';
        document.querySelector('.form-btn').disabled=false;
        const parseRes=await response.json();
        if(parseRes.error){
        objective.style.display='block'
        objectiveContent.innerHTML=`
            <div class='text-error'>
                <p style="color:red;">Error: ${parseRes.msg}</p>
            </div>
            `
        //close objective tab after 7sec
        setTimeout(()=>{
            objective.style.display='none'
        },7000)
        }else{
            let data=JSON.parse(parseRes.ans);
            objectiveAnswer.style.display='block'
            objectiveContentAnswer.innerHTML=`
            <div class='text'>
            <span style="color: green;">Results for ${getCheckedForm.getChecked.value}</span><br/>
                ${data.organic.map(item=>(
                    `
                    <div key=${item.position}>
                        <p>${item.title}</p>
                        <p>${item.snippet}</p>
                        <a href=${item.link} target='_blank' rel='noreferrer'>View more...</a><br/>
                        <br/>
                    </div>
                    `
                ))}
            </div>
            `
        }

    } catch (error) {
        document.querySelector('.form-btn').innerText='Get Checked';
        document.querySelector('.form-btn').disabled=false;
        objective.style.display='block'
        objectiveContent.innerHTML=`
        <b>
            <span style="color: red;">No Internet</span>
        </b>
        `
        //close objective tab after 7sec
        setTimeout(()=>{
            objective.style.display='none'
        },7000)
    }
})



//open objective tab
const objective=document.querySelector('.objective');
const objectiveAnswer=document.querySelector('.objective-answer');
const objectiveContent=document.querySelector('.objective-content');
const openObjective=document.querySelector('.open-objective');
const closeObjectiveAnswer=document.querySelector('.close-objective-answer');
openObjective.addEventListener('click',()=>{
    objective.style.display='block'
    objectiveContent.innerHTML=`
    <b>
        Ensuring <span style="color: green;">Healthy Lives</span> and promoting the <span style="color: green;">well-being</span>
        for all at all ages is essential to <span style="color: green;">sustainable development</span>
    </b>
    `
})
const openObjective1=document.querySelector('.open-objective1');
openObjective1.addEventListener('click',()=>{
    objective.style.display='block'
    objectiveContent.innerHTML=`
    <b>
        <span style="color: green;">Healthy</span> Living.
    </b>
    `
})
const openObjective2=document.querySelector('.open-objective2');
openObjective2.addEventListener('click',()=>{
    objective.style.display='block'
    objectiveContent.innerHTML=`
    <b>
        <span style="color: green;">Healthy</span> Eating.
    </b>
    `
})
//close objective tab
objective.addEventListener('click',()=>{
    objective.style.display='none'
})
//close objectiveAnswer tab
closeObjectiveAnswer.addEventListener('click',()=>{
    objectiveAnswer.style.display='none'
})
//close objective tab after 5min
setTimeout(()=>{
    objective.style.display='none'
    objectiveAnswer.style.display='none'
},300000)

