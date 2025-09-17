const mongoose=require("mongoose")

const UserSchema=new mongoose.Schema({
    title:{type: String,required:true},
    amount:{type:Number},
    // college:{type: String,required:true}
})
module.exports=mongoose.model("User",UserSchema);
