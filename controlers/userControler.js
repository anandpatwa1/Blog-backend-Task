const jwt = require('jsonwebtoken')
const AnimeUser = require('../modals/userModels')
const bcrypt = require('bcryptjs')
const asyncHandler = require('express-async-handler')

const getUser = async (req, res) => {
    const getAllUser = await AnimeUser.find().select('-password')
    res.send(getAllUser)
}

const register = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body

    if (!name || !email || !password) {
        res.status(400)
        throw new Error('Please fill all details')
    }

    const userExist = await AnimeUser.findOne({ email: email })

    if (userExist) {
        res.status(400)
        throw new Error('User already exist')
    }

    //password hashing
    const salt = await bcrypt.genSalt(12)

    const hashedPassword = await bcrypt.hash(password, salt)

    // user create
    const user = await AnimeUser.create({
        name,
        email,
        password: hashedPassword,
    })

    if (user) {
        res.status(201)
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id)
        })
    } else {
        res.status(400)
        throw new Error("invalid user data")
    }

    res.send('user Register')

})

const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body
    if (!email || !password) {
        res.send('enter all field')
    }
    const userLogin = await AnimeUser.findOne({ email: email })

    if (userLogin && (await bcrypt.compare(password, userLogin.password))) {
        res.status(201).json({
            _id: userLogin._id,
            name: userLogin.name,
            email: userLogin.email,
            token: generateToken(userLogin._id)
        })
    } else {
        res.status(401)
        throw new Error("invalid credentials")
    }

})

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d'
    })
}


const getMe = (req, res) => {
    res.status(200)
    const user = {
        id: req.user._id,
        name: req.user.name,
        email: req.user.email
    }
    res.send(user)
}

module.exports = { register, loginUser, getUser, getMe }