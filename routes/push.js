const router=require('express').Router()
require('dotenv').config()
const axios=require('axios')
const base64=require('base-64')
const fs=require('fs')

const path=require('path')

router.post('/',async (req,res)=>
{
    // console.log('req made');
    try {
        var {qname,language,src_code,username,repo,token,message}=req.body
        // console.log(`${uname}, ${qname}, ${src_code}, ${language}`);
        if(!qname||!src_code||!username||!token||!repo)return res.status(422).json({error:"Missing data"})

        if(!language)language=txt;
        if(!message)message="kodeShare Commit"
        const uname=`${Date.now()}-${(Math.random() * 1E16)}`
        var filename=qname+'_'+uname+'.'+language;
        var filepath=path.join(__dirname,'../uploads')+'/'+filename;
        fs.writeFileSync(filepath,src_code)

        let file=fs.readFileSync(filepath).toString()
        let content=base64.encode(file)
        // console.log(content);

        const url=`https://api.github.com/repos/${username}/${repo}/contents/${filename}`

        var data=JSON.stringify({
            "message":message,
            "content":`${content}`
        })

        var config={
            method:'put',
            url:url,
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            data: data
        }
        const response=await axios(config)
        return res.json({success:true})
    } catch (error) {
        // console.log(error);
        return res.status(422).json({error:error})
    }
})


module.exports=router