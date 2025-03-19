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
        }
    } else {
        console.log('error')
    }
}

module.exports = logInCtrl