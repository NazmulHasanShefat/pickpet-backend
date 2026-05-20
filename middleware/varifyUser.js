const { createRemoteJWKSet, jwtVerify } = require("jose-cjs");

 const JWKS = createRemoteJWKSet(
    new URL("http://localhost:3000/api/auth/jwks")
 )
const verifyUser = async (req, res, next)=>{
    const authHeaders = req?.headers?.authorization;
    if(!authHeaders){
       return res.status(401).json({success: false, message: "unauthorized"})
    }
    const userToken = authHeaders.split(" ")[1]
    console.log(userToken);
    if(!userToken){
        return res.status(401).json({success: false, message: "unauthorized"})
    }
    try {
        const { payload } = await jwtVerify(userToken, JWKS);
        console.log(payload)
        next();
    } catch (error) {
         return res.status(401).json({success: false, message: error})
    }
}
module.exports = {verifyUser}