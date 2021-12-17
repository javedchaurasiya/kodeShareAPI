const router=require('express').Router();
require('dotenv').config()
const Code=require('../models/code')
const fs=require('fs')
const path=require('path')

router.get('/:uuid',async (req,res)=>
{
    console.log('req made');
    try {
        const code=await Code.findOne({uuid:req.params.uuid})
        console.log(code);
        if(!code)return res.render('errorpage')
        
        var filename=code.qname+'_'+code.uname
        if(code.language)filename+='.'+code.language
        else filename+='.cpp'
        
        var filepath=path.join(__dirname,'../uploads')
        filepath+='/'+filename

        fs.writeFileSync(filepath,code.src_code)
        res.download(filepath)
        // return res.render('download_done')
        // fs.unlinkSync(filepath)
    } catch (error) {
        console.log(error);
        return res.render('errorpage')
    }
})

module.exports=router
