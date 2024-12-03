const mongoose = require('mongoose');

const mongoURL = 'mongodb://127.0.0.1:27017/hotels' //"Hotels" can be replaced by database name;

//set up mongoDB connection
mongoose.connect(mongoURL)

const db = mongoose.connection;

db.on('connected',()=>{
    console.log('connected to MongoDB');
});

db.on('error',(err)=>{
    console.log('MongoDB connection error',err);
});

db.on('disconnected',()=>{
    console.log('MongoDB disconnected');
});

module.exports = db;