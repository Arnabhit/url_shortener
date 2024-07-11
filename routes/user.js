const express= require('express');

const {handleUserSignup}=require("../controllers/user");
const {handleUserSignin} =require("../controllers/user")
const router=express.Router();
router.post("/signup",handleUserSignup)
router.post("/login",handleUserSignin)
module.exports=router;
