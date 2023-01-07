const express = require('express');
const JWT = require('jsonwebtoken');
const mongoose = require('mongoose');


const app = express()
const AuthRoute = require('./routes/auth')
app.use(express.json())
app.use('/auth', AuthRoute)
app.get('/ping', (req, res) => {
    res.send("🏀 pong.")
})
mongoose.connect('mongodb://127.0.0.1:27017/reusic')
    .then(() => {
        app.listen(5000, () => {
            console.log('listing at  5000');
        })
    }).catch((err) => {
        console.log("MONGO err=> ", err);
    })
