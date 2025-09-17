const mongoose=require("mongoose")
require("dotenv").config();
//in mongoose- we have function called mongoose.connect
//the url is on mongodb new connection url./ dbname
//async-await operation is for processing db getting data within some seconds,
const mongourl=process.env.mongourl
const connectDB=async()=>{
    try {
       await mongoose.connect(mongourl)
       console.log("DB Connected");
    } catch (error) {
        console.error("MongoDB Connection Error",error);


    }
}
module.exports=connectDB;