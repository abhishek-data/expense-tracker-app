const User = require('../models/user')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const secretKey = process.env.JWT_SECRET

exports.signup = async (req, res, next) => {
    try {
        const { fullname, email, password } = req.body
        const emailMatch = await User.findOne({ where: { email } })
        if (emailMatch) {
            return res.status(409).json({ message: 'A account is already exits with this email.' })
        }
        bcrypt.hash(password, 10, async (err, hash) => {
            await User.create({ fullname, email, password: hash })
            res.status(201).json({ message: 'You have sucessfully signed-up' })

        })

    } catch (err) {
        res.status(500).json({ error: 'Internal server error' })
    }
}

exports.generateAcessToken = (id, name, ispremiumUser) => {
    return jwt.sign({userId:id, name:name, ispremiumUser:ispremiumUser}, 'secretKey')
}

exports.login = async (req, res, next) => {
    try {
        const { email, password } = req.body
        const user = await User.findOne({ where: { email } })
        if (!user) {
            return res.status(401).json({ error: 'Invalid credentials' })
        }
        const passwordMatch = await bcrypt.compare(password, user.password)
        if (!passwordMatch) {
            return res.status(401).json({ error: 'Invalid credentials' })
        }
        const token = jwt.sign({ userId: user.id, email: user.email, ispremiumUser: user.ispremiumuser }, secretKey, { expiresIn: '1h' });

        res.status(200).json({ message: 'You have sucessfully logged-in', token })
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Internal server error' })
    }
}

