import { JWT_TOKEN } from "./config";
const jwt=require('jsonwebtoken');

export const authMiddleware=(req,res,next)=>{
    const authHeader=req.headers.authorization;
    if(!authHeader || !authHeader.startsWith('Bearer')){
        res.status(411).json({});
    }
    const token=authHeader.split(' ')[1];

    try {
        const decoded=jwt.verify(token,JWT_TOKEN);
        if(decoded.userId){
        req.userId=decoded.userId;
        next();}
    } catch (error) {
        return res.status(403).json({})
    }
}