const asynchandler = require("express-async-handler");
const jwt = require("jsonwebtoken")
const userBL = require("../BL/userBL");
const secret = process.env.SECRET

const validToken=asynchandler(async(req,res,next)=>{
    let token = req.headers.authorization
    if(!token) throw new Error("Missing token")
    token=token.split(" ")[1]
    const {id}=jwt.verify(token,secret)
    const user=await userBL.getDetailsAboutUserById(id)
    req.user=user
    next()
})

module.exports={validToken}