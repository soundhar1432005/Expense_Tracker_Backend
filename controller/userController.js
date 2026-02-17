//const { use } = require("react");
const userModel=require("../models/User")

exports.getUser=async(req,res)=>{
    try {
        const user=await userModel.find()
        res.json(user)
    } catch (error) {
        console.error(error);
        res.status(500).json({error:"Server Error"})       
    }
}


exports.postUser=async(req,res)=>{
    const {type,title,amount}=req.body;
    try {
        const newUser=new userModel({type,title,amount})
        await newUser.save()
        res.status(201).json(newUser)

    } catch (error) {
        console.error(error);
        res.status(500).json({error:"Server Error"})
    }
}

exports.deleteUser=async(req,res)=>{
    const id=req.params.id;

    const deleted=await userModel.findByIdAndDelete(id);
    if(!deleted){
        return res.status(404).json({message:"Person not found"})
    }
    res.status(204).json({message:"Person deleted"})
}


exports.updateUser=async(req,res)=>{
    const {type,title,amount}=req.body;
    const id=req.params.id;


    try {
        const updatedUser=await userModel.findByIdAndUpdate(id,{type,title,amount},{new:true});
        if(!updatedUser){
            return res.status(404).json({message:"Person not found"})
        }
        res.json(updatedUser)
    } catch (error) {
        console.error(error);
        res.status(500).json({error:"Server Error"})
    }
}