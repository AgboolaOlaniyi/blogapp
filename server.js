const app = require("./app")
const db = require("./config/mongoose")
require("dotenv").config()

db.connect()

const PORT = process.env.PORT



app.listen(PORT, ()=>{
    console.log(`app listening at http://localhost:${PORT}`)
})