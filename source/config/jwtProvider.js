const jwt = require('jsonwebtoken');
const SECRETKEY = "figfgfgdfugrgrneircfefiufnfeyrmix";
const generateToken=(userid)=>{
        const token = jwt.sign({userid},SECRETKEY,{expiresIn:'48h'})
        return token;
}
const getUserIdFromToken = (token)=>{
        const decodedToken = jwt.verify(token,SECRETKEY);
        return decodedToken.userid;
}
module.exports = {generateToken,getUserIdFromToken}