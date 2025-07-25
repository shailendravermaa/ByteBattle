const jwt = require("jsonwebtoken");
const User = require("../models/user");
const redisClient = require("../config/redis")
const dbConnect = require("../utils/dbConnect")
const userMiddleware = async (req,res,next)=>{

    try{
          await dbConnect();
        const {token} = req.cookies;
        if(!token)
            throw new Error("Token is not persent");

        const payload = jwt.verify(token,process.env.JWT_KEY);

        const {_id} = payload;

        if(!_id){
            throw new Error("Invalid token");
        }

        const result = await User.findById(_id);

        if(!result){
            throw new Error("User Doesn't Exist");
        }

        // Redis ke blockList mein persent toh nahi hai

        const IsBlocked = await redisClient.exists(`token:${token}`);

        if(IsBlocked)
            throw new Error("Invalid Token");

        req.result = result;


        next();
    }
    catch(err){
        console.error("REGISTER ERROR DETAILS:", {
    name: err.name,
    message: err.message,
    stack: err.stack,
    body: req.body  // Log the received payload
  });
  res.status(401).json({ error: err.message });
    }

}


module.exports = userMiddleware;
