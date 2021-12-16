const mongoose=require('mongoose')

const mySchema=new mongoose.Schema({
    uname:{
        type:String,
        required:true
    },
    qname:{
        type:String,
        required:true
    },
    src_code:{
        type:String,
        required:true
    },
    language:{
        type:String,
        required:false
    },
    uuid:{
        type:String,
        required:true
    }
},{timestamps:true})

module.exports=mongoose.model('Code',mySchema)

