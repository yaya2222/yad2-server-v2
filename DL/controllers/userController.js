const UserModel = require("../models/UserModel");

const create=(newUser)=> UserModel.create(newUser)

const read=(filter={})=> UserModel.find(filter)

const readById=(id)=>UserModel.findById(id)

const readByEmail=(email)=>UserModel.findOne({ email });

const deleteById=(id)=>UserModel.findByIdAndUpdate(id,{isActive:false},{new:true})

const updateById=(id,newData)=>UserModel.findByIdAndUpdate(id,newData,{new:true})

module.exports={create ,read,readById,deleteById,updateById,readByEmail}

