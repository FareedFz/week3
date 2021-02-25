const express=require('express')
const fetch=require('node-fetch')
const redis=require('redis')
const PORT=process.env.PORT||5000
const Redis_port=process.env.Redis_port||6379
const client=redis.createClient(Redis_port)
const app=express();
app.listen(5000,()=>{
    console.log(`App Listening , ${PORT}`)
})
app.get('/search/:username',getsearch)

  async function getsearch(req,res,next)
    {
        try{
        console.log(req.params)
        const {username}=req.params;
        const response= await fetch(`https://api.github.com/users/${username}`)
        const data=await response.json()
        const follower=data.followers
        

        res.send(setResponse(username,follower))

    }catch(err){
        console.log(err.Message)
    }
}
   function setResponse(user,follower){
       
       return `${user} This guy has ${follower} in github`;
   }

