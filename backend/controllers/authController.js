const User = require('../models/user')

exports.login = async (req, res, next) => {
    try {
       const {email, password} = req.body 
       const user = await User.findOne({where:{email}})
        if(!user) {
            return res.status(401).json({error: 'Invalid credentials'})
        }
       const passwordMatch = await User.findOne({where:{email}})
       if(!passwordMatch) {
        return res.status(401).json({error: 'Invalid credentials'})
        }
        res.status(200).json({message: 'Login sucessful'})
    }catch(err) {
        console.log(err);
        res.status(500).json({error: 'Internal server error'})
    }
}

exports.signup = async (req, res, next) => {
    try {
        const {fullname, email,password } = req.body
        const user = await User.create({
            fullname,
            email,
            password
        })
        res.status(201).json({message: 'You have sucessfully signed-up'})
    }catch(err) {
        console.log(err);
        res.status(500).json({error:'Internal server error'})
    }
}