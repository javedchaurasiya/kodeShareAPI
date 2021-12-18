const router=require('express').Router();
const Code=require('../models/code')
require('dotenv').config()

router.get('/:uuid',async (req,res)=>
{
    try {
        const response=await Code.findOne({uuid:req.params.uuid})
        if(!response)return res.status(404).render('errorpage')
        console.log(response);
        return res.render('editor',{src_code:response.src_code,qname:response.qname})
    } catch (error) {
        console.log(error);
        return res.status(404).render('errorpage')
    }
})

module.exports=router