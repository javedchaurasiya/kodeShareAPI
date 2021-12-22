const express=require('express')
const app=express()
const path=require('path')
require('dotenv').config()
const ejs=require('ejs')
const cors=require('cors')

require('./config/db')

const PORT=process.env.PORT||3000

const corsoptions={
    origin:process.env.ALLOWED_CLIENTS.split(',')
}

app.use(cors(corsoptions))

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
app.use('/download',require('./routes/download'))
app.use('/editor',require('./routes/editor'))

app.listen(PORT,()=>
{
    console.log(`listening to port ${PORT}`);
})