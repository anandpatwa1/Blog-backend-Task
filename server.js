const express = require('express')
const { connectDB } = require('./config/db')
const { errorHandler } = require("./middlewere/errorMiddlewere")
const app = express()
require('dotenv').config()
const color = require('colors')

const PORT = process.env.PORT || 5000

connectDB()

// Body Parser 
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/api/user', require('./routes/userRoutes'))

app.get('/', (req, res) => {
    res.send('Welcome to animes Blog')
})

app.use(errorHandler)

app.listen(PORT, () => {
    console.log('Your PORT is runnung at ' + PORT);
})