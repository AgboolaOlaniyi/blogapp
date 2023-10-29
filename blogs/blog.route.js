const express = require('express')
const controller = require("./blog.controller")
const cookieParser = require("cookie-parser")
const auth = require("../authentication/auth")



const blogRouter = express.Router()
blogRouter.use(cookieParser())

blogRouter.post("/create",  auth.userEnsureLogin, async (req, res) => {
    const wordcount = req.body.body.split(" ").length
    const reading_time = wordcount / 200
    const response = await controller.createBlog({
        title: req.body.title,
        description: req.body.description,
        author: req.body.author,
        body: req.body.body,
        state: "draft",
        read_count: "0",
        tag: req.body.tag,
        reading_time: `${reading_time} min`,
        user_id: res.locals.user._id,
        drafted_time: new Date()
    })
        
    if (response.code === 200) {
        res.redirect("/dashboard")
    } else {
        res.redirect("/invalid_info")
    }
})


blogRouter.get("/:id",  auth.userEnsureLogin, controller.getSpecificBlog)
blogRouter.delete("/:id", controller.deleteBlog)
blogRouter.put("/:id", controller.updateBlog)
blogRouter.get("/", auth.userEnsureLogin, controller.getAllBlog)
blogRouter.put("/id:", controller.updateState)
blogRouter.get(" ",  controller.getBlogbyAuthorTagTittle)
blogRouter.get("/id:", controller.getBlogById)


module.exports = blogRouter