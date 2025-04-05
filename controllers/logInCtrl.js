const emailValidation = require("../helpers/emailValidation")
const userSchema = require("../models/userSchema")
const bcrypt = require('bcrypt')

async function logInCtrl(req, res) {
    const { email, password } = req.body
    if (!email || !password) {
        return res.json({ error: 'email & password is required' })
    }
    if (!emailValidation(email)) {
        return res.json({ error: 'email is not valid' })
    }

    const exsistingUser = await userSchema.find({ email })
    if (exsistingUser.length > 0) {
        if (!exsistingUser[0].isVarified) {
            return res.json({ error: 'email is not verified' })
        } else {
            bcrypt.compare(password, exsistingUser[0].password, function (err, result) {
                if (result) {
                    return res.json({ messgae: 'login success' })
                } else {
                    return res.json({ error: 'password is incorrect' })
                }
            })
            // console.log(req.session)

            req.session.isAuth = true
            req.session.user = {
                id: exsistingUser[0]._id,
                email: exsistingUser[0].email,
                firstName: exsistingUser[0].firstName,
            }
        }
    } else {
        console.log('error')
    }
}

function logout(req, res) {
    req.session.destroy(function (err) {
        if (err) {
            return res.status(404).json({ error: 'error is logout' })
        }
    })
    res.clearCookie("connect.sid")
    res.status(200).json({ message: 'logout successfully done' })
}

function dashBoard(req, res) {
    res.status(200).json({ message: 'welcome to dashboard' })
}

module.exports = { logInCtrl, dashBoard, logout }