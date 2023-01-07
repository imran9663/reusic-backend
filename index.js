const express = require('express');
const JWT = require('jsonwebtoken');

const app = express()

app.get('/ping', (req, res) => {
    res.send("🏀 pong")
})
app.listen(5000, () => {
    console.log('listing at  5000');
})