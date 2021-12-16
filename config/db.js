const mongoose=require('mongoose')
require('dotenv').config()

mongoose.connect(process.env.MONGO_CONNECTION_URL,{
    useNewUrlParser:true,
    useUnifiedTopology:true
    // useCreateIndex:true
}).then(()=>{
    console.log("connected db")
}).catch((err)=>{
    console.log("connection error db")
})