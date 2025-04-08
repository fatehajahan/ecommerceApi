const emailValidation = require("../helpers/emailValidation")
const userSchema = require("../models/userSchema")
const bcrypt = require('bcrypt')

async function logInCtrl(req, res) {
    // console.log(req.session)
    const { email, password } = req.body
    if (!email || !password) {
        return res.json({ error: 'email & password is required' })
    }
    if (!emailValidation(email)) {
        return res.json({ error: 'email is not valid' })
    }

    const exsistingUser = await userSchema.find({ email })
    if (exsistingUser.length === 0) {
        return res.json({ error: 'email is not registered' })
    }
    if (exsistingUser[0].isVarified === false) {
        return res.json({ error: 'email is not verified' })
    }
    const isMatched = await bcrypt.compare(password, exsistingUser[0].password)
    if (isMatched) {
        // session is created here
        req.session.isAuth = true
        req.session.user = {
            id: exsistingUser[0]._id,
            email: exsistingUser[0].email,
            firstName: exsistingUser[0].firstName,
            role: exsistingUser[0].role
        }
        
        return res.status(200).json({ message: 'login success' })
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
    if(!req.session.isAuth) {
        return res.json({ error: 'unauthorized' })
    }
    if(req.session.user.role == 'admin') {
        return res.status(200).json({ message: `welcome to admin dashboard : ${req.session.user.firstName}` })
    } else {
        return res.status(200).json({ message: `welcome to user dashboard : ${req.session.user.firstName}` })
    }
}

module.exports = { logInCtrl, dashBoard, logout }