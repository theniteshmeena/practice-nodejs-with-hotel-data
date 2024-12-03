const express = require('express');
const app = express();
const db = require('./db');

const bodyParser = require('body-parser');
app.use(bodyParser.json());

const Person = require('./models/Person');
const MenuItem = require('./models/MenuItem');

app.get('/', function(req, res){
    res.send('Welcome to my hotel..... How can i help you ?');
})

app.post('/person', async (req,res)=>{
    try{
        const data = req.body; // assuming the request body contains the person data

        //create a new person document using mongoose model
        const newPerson = new Person(data);
        
        //save the new person data to the database
        const response = await newPerson.save();
        console.log("Data Saved");
        res.status(200).json(response);
    } catch(error) {
        console.log(error);
        res.status(500).json({error : "Internal Server Error"})
    }
});

app.post('/menu', async (req, res)=>{
    try{
        const data = req.body;

        const newMenuItem = new MenuItem(data);

        const response = await newMenuItem.save();
        console.log("Data Saved in Menu",response);
        res.status(200).json(response)
        
    } catch(error){
        console.log(error);
        res.status(500).json({error : "Internal Server Error"})
    }
});

app.get('/person', async (req,res)=>{
    try{
        const data = await Person.find();
        console.log('Data Fetched');
        res.status(200).json(data);
    } catch(error){
        console.log();
        
        res.status(500).json({error : 'Internal Server Error'})
    }
});

app.get('/menu', async (req,res)=>{
    try{
        const data = await MenuItem.find();
        console.log('Data fetched');
        res.status(200).json(data);
        
    } catch(error){
        console.log(error);
        res.status(500).json({error : 'Internal Server Error'});
    }
});

app.get('/person/:workType', async (req,res)=>{
    try{
        const workType = req.params.workType;
        if(workType == 'chef' || workType == 'manager' || workType == 'waiter'){
            const response = await Person.find({work: workType});
            res.status(200).json(response)
        } else {
            res.status(404).json({error : 'Invalid Work Type'});
        }
    } catch(error) {
        console.log(error);
        res.status(500).json({error : 'Internal Server Error'})
    }
})

app.listen(3000, ()=>{
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