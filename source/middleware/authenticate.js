const jwtProvider = require('../config/jwtProvider')
const userService = require('../services/userservice')
const authenticate = async(req,res,next)=>{
        try {
                const token = req.headers.authorization?.split(" ")[1];
                console.log(token)
                if(!token){
                        return res.status(404).send({error:"token not found...."})
                }
                const userId = jwtProvider.getUserIdFromToken(token);
                const user  = userService.findUserByid(userId);
                req.user = user;
                next();
        } catch (error) {
                return res.status(500).send({error:error.message})
        }
}

module.exports = authenticate;