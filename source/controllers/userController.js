const userService = require('../services/userservice');

const getUserProfile = async(req,res)=>{
        try{
                const jwt =  req.headers.authorization?.split(' ')[1];
                if(!jwt){
                        return res.status(404).send({message:"token not found"});
                }
                const user = await userService.getUserProfileByToken(jwt);
                return res.status(200).send(user);
        }catch(err){
                return res.status(500).send({error:err.message});
        }
}

const getAllUsers = async(req,res)=>{
        try{
                const user = await userService.getAllUsers();
                return res.status(200).send(user);
        }catch(err){
                return res.status(500).send({error:err.message});
        }
}

module.exports = {getUserProfile,getAllUsers}