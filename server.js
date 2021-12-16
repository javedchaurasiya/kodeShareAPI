const express=require('express')
const app=express()
const path=require('path')
require('dotenv').config()
const ejs=require('ejs')

require('./config/db')

const PORT=process.env.PORT||3000

app.use(express.json())
app.use(express.static(__dirname+'/public'))
app.set('views',path.join(__dirname,'/views'))
app.set('view engine','ejs')

//demo
app.get('/',(req,res)=>
{
    res.send('hello')
})

app.use('/api/upload',require('./routes/upload'))

app.listen(PORT,()=>
{
    console.log(`listening to port ${PORT}`);
})