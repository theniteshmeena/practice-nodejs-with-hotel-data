const express = require('express');
const app = express();
const db = require('../db');
const router = express.Router();
const Person = require('../models/Person');

const bodyParser = require('body-parser');
app.use(bodyParser.json());

router.post('/', async (req,res)=>{
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



router.get('/', async (req,res)=>{
    try{
        const data = await Person.find();
        console.log('Data Fetched');
        res.status(200).json(data);
    } catch(error){
        console.log();
        
        res.status(500).json({error : 'Internal Server Error'})
    }
});


router.get('/:workType', async (req,res)=>{
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
        res.status(500).json({error : 'Internal Server Error'});
    }
});


router.put('/:id', async (req,res)=>{
    try{
        const personId = req.params.id; //Extract the id from the URL Parameter 
        const updatedPersonData = req.body; //Updated the data for the person

        const response = await Person.findByIdAndUpdate(personId,updatedPersonData,{
            new: true, //Return the updated document
            runValidators: true // Run Mongoose Validation
        });
        if(!response){
            return res.status(404).json({error : 'Person not found'});
        }
        console.log("Data Updated for Person");
        res.status(200).json(response);
    }catch{
        console.log(error);
        res.status(500).json({error : 'Internal Server Error'})
    }
});

router.delete('/:id',async (req,res)=>{
    try{
        const personId = req.params.id; //Extract the id from the URL Parameter 
        const response = await Person.findByIdAndDelete(personId);
        if(!response){
            return res.status(404).json({error : "Person Not Found"});
        }
        console.log("Data Deleted");
        res.status(200).json({message : "Person Data Deleted Successfully"});
    }catch{
        console.log(error);
        res.status(500).json({error : 'Internal Server Error'});
    }
});

module.exports = router;