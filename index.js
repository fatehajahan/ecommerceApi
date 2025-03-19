require('dotenv').config()
const express = require ("express");
const dbConnection = require("./database/dbConnection");
const  route  = require("./route");
const app = express();

const port = 3000;
dbConnection()

app.use(express.json()); 
app.use(route)

app.listen(port, ()=>{
    console.log("backend is running");
})