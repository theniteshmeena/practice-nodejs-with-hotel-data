const mongoose = require('mongoose');

//defines the person schema 
const personSchema = new mongoose.Schema({
    name : {
        type: String,
        required: true,
    },
    age : {
        type: Number,
    },
    work : {
        type: String,
        required: true,
        enum: ['chef', 'waiter', 'manager']
    },
    mobile : {
        type: String,
        required: true,
    },
    email : {
        type: String,
        required: true,
        unique: true
    },
    salary : {
        type: Number,
        required: true,
    },
    address : {
        type: String,
    }
});

// create person model
const Person = mongoose.model('Person', personSchema);

module.exports = Person;