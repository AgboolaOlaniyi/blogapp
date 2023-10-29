const jwt = require("jsonwebtoken");
require("dotenv").config()

 const userEnsureLogin = async (req, res, next) => {

    try {
        const token = req.cookies.jwt
        if (!token) {
            return res.redirect("/login")

        }
        const decoded = await jwt.verify(token, process.env.JWT_SECRET)
        res.locals.user = decoded
    
        next()

    } catch (err) {
        console.log(err.message)
        return res.send(err.message)

 
    }
}


const authenticateUser = async (req,res,next)=>{
    try{
      const bearerToken = req.headers.authorization
      if(!bearerToken){
        return res.status(401).json({
          message:"Token required"
        })
      }
      const token = bearerToken.split(" ")[1]
      const decoded = await jwt.verify(token, process.env.JWT_SECRET)
      const foundUser = await userModel.findOne({email:decoded.email})
      if(!foundUser){
        return res.status(401).json({
          message:"You are not authenticated"
        })
      }
      next()
    }catch(error){
        return res.status(401).json({
        error:error.message
      })
    }
  }

  module.exports = {
    userEnsureLogin, authenticateUser
  }