const express = require('express')
const middleware = require("./user.middleware")
const controller = require("./user.controller")
const cookieParser = require("cookie-parser")



const userRouter = express.Router()

userRouter.use(cookieParser())

userRouter.post("/signup", middleware.validateUser, async (req,res)=>{
    try {
        const response = await controller.createUser({ first_name: req.body.first_name, last_name:req.body.last_name, 
            email:req.body.email, password:req.body.password, phone_number:req.body.password, gender:req.body.gender, country:req.body.country })
        if(response.code === 200){
            res.redirect("/login")
        }else{
            res.redirect("/existingUser")
            
        } 
    } catch (error) {
        console.error(error)
        return{ status: 500, message: "Internal server error"}
    }    

})

userRouter.post("/login", middleware.validateLogInfo, async(req,res)=>{
    const response = await controller.login({email:req.body.email, password:req.body.password})
    if(response.code === 200){
        res.cookie("jwt", response.token, {maxAge:60 * 60 * 1000})
        res.redirect("/dashboard")
    }else if(response.code === 404){      //user does not exist
        res.redirect("/userNotFound")
    }else{
        res.redirect("/invalidInfo")     // username or password is incorrect
    }
})


module.exports = userRouter