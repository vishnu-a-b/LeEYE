const mongoose=require("mongoose")
mongoose.connect("mongodb://localhost:27017/leeye")
.then(()=>{
    console.log("mongodb connected");
})
.catch(()=>{
    console.log('mongodb connection failed');
})


const newSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    image:{
        type:String,
        required:true
    },
    address:{
        type:String,
        required:true
    }
})

const collection = mongoose.model("users",newSchema)

module.exports=collection
