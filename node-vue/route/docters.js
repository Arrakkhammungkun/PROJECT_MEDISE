const express = require('express');
const router =express.Router();
const mongoose = require('mongoose');



const doctorSchema = new mongoose.Schema({
    prefix:{
        type:String,
        required: true
    },
    firstName: {
        type:String,
        required: true
    },
    lastName: {
        type:String,
        required: true
    },
    specialization: {
        type:String,
        required: true
    },
    education: {
        type:String,
        required: true
    },
    hospital: {
        type:String,
        required: true
    },
    photo: {
        type:String,
        required: true

    }
  
});

  const Doctor = mongoose.model('Doctor', doctorSchema);



router.post('/doctors', async (req, res) => {
const { prefix,firstName, lastName, specialization, education, hospital, photo } = req.body;

try {
    const newDoctor = new Doctor({
    prefix,
    firstName,
    lastName,
    specialization,
    education,
    hospital,
    photo
    });

    await newDoctor.save();
    res.status(201).send({ message: 'Doctor saved successfully' });
} catch (error) {
    res.status(500).send({ error: 'Error saving doctor' });
}
});

router.get('/' ,async(req,res)=>{
    try{
        const doctors=await Doctor.find({});

    res.json(doctors) 
    }catch (err){
        res.status(500).send(err.message);
    }


});
router.get('/Appointment/:id' ,async(req,res)=>{
    try{
        const id =req.params.id;
        console.log(id)
        const doctors =await Doctor.findById(id).exec();
        if(doctors){
            res.status(200).json(doctors);
        }else{
            res.status(404).json({error: 'Doctor not found'})
        }
        
    }catch(err){    
        console.error('Error finding doctor by ID:', err);
        res.status(500).json({error: 'Internal server error'})
    }
});

module.exports=router;