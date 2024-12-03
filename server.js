const express = require('express');
const app = express();
const db = require('./db');
require('dotenv').config();

const bodyParser = require('body-parser');
app.use(bodyParser.json());
const PORT = process.env.port || 3000;

const MenuItem = require('./models/MenuItem');

app.get('/', function(req, res){
    res.send('Welcome to my hotel..... How can i help you ?');
})

const personRoutes = require('./routes/personRoutes');
app.use('/person', personRoutes);

const menuRoutes = require('./routes/menuRoutes');
app.use('/menu', menuRoutes);

app.listen(PORT, ()=>{
    console.log("listening on port 3000");
    
});














// app.get('/chicken', (req, res)=>{
//     res.send('Welcome to my hotel..... We will surving you chicken');
// })

// app.get('/idli', (req, res)=>{
//     const customizedIdli = {
//         name : 'idli',
//         size : '10 cm diameter',
//         isSambharNeeded : true,
//         isChutney : false
//     }
//     res.send(customizedIdli);
// })

// app.post('/menu',(req,res)=>{
//     console.log("Datat is saved...........");
// })