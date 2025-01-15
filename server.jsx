const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const dotenv = require('dotenv')

dotenv.config()

//App config
const app = express()
const port = process.env.PORT || 8000

const connectionUrl = process.env.MONGO_URI

//Middleware (convert data into Json)

app.use(express.json())
app.use(cors())

//DB Config
mongoose
.connect(connectionUrl)
.then(()=>{
    app.listen(port, ()=>console.log(`Running on port: ${port}`))
})
.catch((error)=>{
    console.log(error);
    
})

//API Endpoints
