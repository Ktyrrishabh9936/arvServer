const User = require('../models/userModels');
const jwtProvider = require('../config/jwtProvider');
const bcrypt = require('bcrypt')
const createUser = async(userData)=>{
        try{
                let {firstName,lastName,email,password} = userData;
                const isUserExist = await User.findOne({email});
                if(isUserExist){
                        throw new Error("User already Exist with email :",email);
                }
                password = await bcrypt.hash(password,8);
                const user = await User.create({firstName,lastName,email,password});
                console.log(user)
                return user;
        }catch(err){
                throw new Error(err.message)
        }
}

const findUserByid = async(userId)=>{
        try{
                const user = await User.findById(userId);
                if(!user){
                        throw new Error("User not found with Id :",userId);
                }
                return user;
        }catch(err){
                throw new Error(err.message);
        }
}
const findUserByEmail = async(email)=>{
        try{
                const user = await User.findOne({email});
                if(!user){
                        throw new Error("User not found with email :",email);
                }
                return user;
        }catch(err){
                throw new Error(err.message);
        }
}

const getUserProfileByToken = async(token)=>{
        try{
                const userId = jwtProvider.getUserIdFromToken(token);
                const user = await findUserByid(userId);
                if(!user){
                        throw new Error("User not found with id :",userId);
                }
                return user;
        }catch(err){
                throw new Error(err.message);
        }
}
const getAllUsers = async()=>{
        try{
                const user = await User.find();
                return user;
        }catch(err){
                throw new Error(err.message);
        }
}
module.exports = {createUser,findUserByid,findUserByEmail,getUserProfileByToken,getAllUsers};