const userService = require('../services/userservice');
// const cartService = require('../services/cartService');
const jwtProvider = require('../config/jwtProvider');
const bcrypt = require('bcrypt');

const register = async(req,res)=>{
        try{
                const user = await userService.createUser(req.body);
                const jwt =  jwtProvider.generateToken(user._id);
                return res.status(200).send({jwt,message:"register Success"});
        }catch(err){
                return res.status(500).send({error:err.message});
        }
}
const login = async(req,res)=>{
        const {email,password} = req.body;
        try{
                const user = await userService.findUserByEmail(email);
                if(!user){
                return res.status(404).send({message:"User not found with Email",email});
                }
                const isPasswordValid = await bcrypt.compare(password,user.password);
                if(!isPasswordValid){
                        return res.status(401).send({message:"InValid Password ...",email});
                 }
                 const jwt = jwtProvider.generateToken(user._id)
                return res.status(200).send({jwt,message:"login Success"});
        }catch(err){
                return res.status(500).send({error:err.message});
        }
}

module.exports = {register,login};