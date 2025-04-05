const express = require("express")
const registrationCtrl = require("../../controllers/registrationCtrl")
const { otpCtrl, resendOtpCtrl } = require("../../controllers/otpCtrl")
const { logInCtrl, dashBoard, logout, } = require("../../controllers/logInCtrl")
const authMiddleware = require("../../middleware/authMiddleware")
const route = express.Router()

route.post("/registration", registrationCtrl)
route.post("/otpVerify", otpCtrl)
route.post("/resendOtp", resendOtpCtrl)
route.post("/login", logInCtrl)
route.post("/logout", logout)

//all gets
route.get("/dashboard", authMiddleware, dashBoard)

module.exports = route