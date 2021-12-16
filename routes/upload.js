const router=require('express').Router();
require('dotenv').config()
const {v4:uuid4}=require("uuid")
const Code=require('../models/code')

router.post('/',async (req,res)=>
{
    const {uname,qname,src_code,language}=req.body
    console.log(`${uname}, ${qname}, ${src_code}, ${language}`);
    if(!uname||!qname||!src_code)return res.status(422).send('Missing Data')
    const code=new Code({
        uname:uname,
        qname:qname,
        uuid:uuid4(),
        src_code:src_code,
        language:language
    })
    const response=await code.save()
    console.log(response);
    return res.json({download:`${process.env.APP_BASE_URL}/download/${response.uuid}`,
                     editor: `${process.env.APP_BASE_URL}/editor/${response.uuid}`})
})


module.exports=router