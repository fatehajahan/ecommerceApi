const express = require("express")
const route = express.Router()

const authRout = require("./authentication")

route.use("/authentication", authRout)

module.exports = route