const express = require('express')
const userRoute = require("./users/user.route")
const bodyparser = require("body-parser")
const blogRoute = require("./blogs/blog.route")
const auth = require("./authentication/auth")
const cookieParser = require("cookie-parser")
const blogModel = require("./models/blog")




const app = express()

app.set("view engine", "ejs")
app.set("views", "views")

app.use(bodyparser.urlencoded({ extended: false }))

app.use(cookieParser())
app.use("/users", userRoute)
app.use("/blogs", auth.userEnsureLogin, blogRoute)
app.use("/public", express.static("Public"))





app.get("/", (req, res) => {
    res.status(200).render("home")
})

app.get("/signup", (req, res) => {
    res.status(200).render("signup")
})


app.get("/login", (req, res) => {
    res.status(200).render("login")
})

app.get("/home", (req, res) => {
    res.status(200).render("home")
})


app.get("/dashboard", auth.userEnsureLogin, async (req, res) => {
        const blogInfos = await blogModel.find({user_id:res.locals.user._id})
        res.status(200).render("dashboard", {
         user: res.locals.user, blogInfos, date: new Date()
        }) 
  
})


app.get("/create_blog", auth.userEnsureLogin, (req, res) => {
    res.status(200).render("create_blog")

    })

 app.get("/edit", auth.userEnsureLogin, (req, res) => {
        res.status(200).render("edit")
 })
app.get("/logout", (req, res) => {
    res.clearCookie("jwt")
    res.render("home")
})

// app.get("*", (req, res)=>{
//     res.status(404).render("pageNotFound")
// })

// app.use((err, req, res, next) => {
//     console.error(err.stack)
//     res.status(500).json({
//         data: null,
//         error: 'Server Error'
//     })
// })



module.exports = app