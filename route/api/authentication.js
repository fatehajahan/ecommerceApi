const express = require("express")
const registrationCtrl = require("../../controllers/registrationCtrl")
const { otpCtrl, resendOtpCtrl } = require("../../controllers/otpCtrl")
const logInCtrl = require("../../controllers/logInCtrl")
const route = express.Router()

route.post("/registration", registrationCtrl)
route.post("/otpVerify", otpCtrl)
route.post("/resendOtp", resendOtpCtrl)
route.post("/login", logInCtrl)

module.exports = route