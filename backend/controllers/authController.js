const User = require('../models/user')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const nodemailer = require('nodemailer');
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
    return jwt.sign({ userId: id, name: name, ispremiumUser: ispremiumUser }, 'secretKey')
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

exports.forgotPassword = async (req, res, next) => {
    const userEmail = req.body.email; // Assuming you have the email from the request body

    // Create a transporter using your email service credentials
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'sonusingh.web.dev@gmail.com', // Replace with your Gmail email address
            pass: 'qvfqpfrdauqwagqy' // Replace with your Gmail password or app-specific password
        }
    });

    // Generate a random temporary password or a token for reset
    const temporaryPassword = generateTemporaryPassword(); // Implement this function

    // Define email content and template
    const mailOptions = {
        from: 'sonusingh.web.dev@gmail.com', // Replace with your Gmail email address
        to: userEmail,
        subject: 'Password Reset',
        html: `
            <p>Hello,</p>
            <p>You have requested to reset your password. Your temporary password is: ${temporaryPassword}</p>
            <p>Please use this temporary password to log in and update your password.</p>
            <p>If you didn't request this, please ignore this email.</p>
          `
    };

    try {
        // Send the email
        await transporter.sendMail(mailOptions);
        res.status(200).json({ message: 'Password reset email sent successfully.' });
    } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}



// Function to generate a temporary password or token
function generateTemporaryPassword() {
    // Implement your logic to generate a temporary password or token
    // For example, you can use a library like 'crypto' to generate a random token
    const crypto = require('crypto');
    return crypto.randomBytes(8).toString('hex');
}




