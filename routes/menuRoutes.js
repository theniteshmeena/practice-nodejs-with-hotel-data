const express = require('express');
const app = express();
const db = require('../db');
const router = express.Router();
const MenuItem = require('../models/MenuItem');

const bodyParser = require('body-parser');
app.use(bodyParser.json());

router.get('/', async (req,res)=>{
    try{
        const data = await MenuItem.find();
        console.log('Data fetched');
        res.status(200).json(data);
        
    } catch(error){
        console.log(error);
        res.status(500).json({error : 'Internal Server Error'});
    }
});

router.post('/', async (req, res)=>{
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

router.put('/:id', async (req, res)=>{
    try{
        const menuId = req.params.id;
        const updatedMenuData = req.body;

        const response = await MenuItem.findByIdAndUpdate(menuId,updatedMenuData, {
            new: true,
            runValidators: true
        });
        if(!response){
            return res.status(404).json({error : 'Menu Dish Not Found'});
        }
        console.log("Data Updated in Menu");
        res.status(200).json(response);
    } catch(error){
        console.log(error);
        res.status(500).json({error : 'Internal Server Error'})
    }
});

router.delete('/:id', async (req, res)=>{
    try{
        const menuId = req.params.id;
        const response = await MenuItem.findByIdAndDelete(menuId);
        if(!response){
            return res.status(404).json({error : "Menu Not Found"});
        }
        console.log("Data Deleted");
        res.status(200).json({message : 'Menu Data Deleted Successfully'});
    } catch(error) {
        console.log(error);
        res.status(500).json({error : 'Internal Server Error'});
    }
});


module.exports = router;