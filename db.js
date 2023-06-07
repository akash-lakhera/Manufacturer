const mongoose=require("mongoose");
require("dotenv").config(); //initialize environment variables
url=process.env.MONGO_URL
console.log("ligma"+url)
module.exports=mongoose.connect(url,{ useNewUrlParser: true , useUnifiedTopology: true })