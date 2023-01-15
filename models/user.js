const mongoose = require('mongoose');
const constants = require('./constants');


//here we are defining the code to create schema

const UserSchema = mongoose.Schema({ //with the help of mongoose.Schema({})
    fullName: {        // property key 
        type: String, //type of property
        require: true
    },
    email: {
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true
    },
    verified: {
        type: Boolean,
        default: false
    },
    language: {
        type: Array,
        default: []
    }
}, { timestamps: true });
module.exports = mongoose.model(constants.user, UserSchema) // exporting the schema with mongoose.model('propety','value')

