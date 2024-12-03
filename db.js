const mongoose = require('mongoose');
require('dotenv').config();
// const mongoURL = process.env.MONGODB_URL;
const mongoURL = process.env.MONGODB_LOCAL_URL;
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