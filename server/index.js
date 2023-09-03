const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const userRoute = require("./routes/userRoute")
const messageRoute = require("./routes/messagesRoute")

const app = express();
require("dotenv").config();

app.use(cors())
app.use(express.json())
app.use("/api/auth",userRoute)
app.use("/api/messages", messageRoute)

mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(()=>{
    console.log(`Connected to MongoDB successfully`)
}).catch((err) => {
    console.log(err.me)
})

const server = app.listen(process.env.PORT,() =>{
    console.log(`Server started on PORT ${process.env.PORT}`)
})
