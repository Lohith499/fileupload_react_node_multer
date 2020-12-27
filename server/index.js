const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const route = require("./routes");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cors =require('cors');


const { parsed: config } = dotenv.config();
global.config = config;

app.use(cors());
app.use(bodyParser.json());



app.use("/", route);
mongoose.connect(config.DB_CONNECT, { useCreateIndex: true, useNewUrlParser: true, useUnifiedTopology: true }, (err) => {
    if (err){
        console.log("Unable to connect to MongoDB")
        throw new Error(err) 
    }
    else{
        console.log("Succesfully connected to MongoDB")
        app.listen(8001, (err) => {
            console.log("Server Started at 3000");
        })
    }
});
