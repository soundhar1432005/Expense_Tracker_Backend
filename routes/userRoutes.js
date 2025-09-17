const express =require("express")
const { getUser, postUser, deleteUser, updateUser } = require("../controller/userController")
const { model } = require("mongoose")
const router=express.Router()


router.get("/",getUser)
router.post("/",postUser)
router.delete("/:id",deleteUser)
router.put("/:id",updateUser)
module.exports=router;