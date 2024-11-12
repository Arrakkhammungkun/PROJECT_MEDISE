const express = require('express');
const mongoose = require('mongoose');

const router = express.Router();

// สร้าง Schema สำหรับ Appointment
const appointmentSchema = new mongoose.Schema({
    appointmentTime: {
        type: String,
        
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', 
        required: true,
    },
    doctorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Doctor', 
        required: true,
    },
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
    },
    birthdate: {              
        type: Date,
        required: true
    },
    gender: {                
        type: String,
        enum: ['ชาย', 'หญิง'],
        required: true
    },
    profileImage: {
        type: String,
        default: ''
    }
});

const Appointment = mongoose.model('Appointment', appointmentSchema);

// API Endpoint สำหรับสร้างการนัดหมาย
router.post('/appointments', async (req, res) => {
    const { appointmentTime, userId, doctorId, firstname, lastname, email, birthdate, gender, profileImage } = req.body;
    try {
        const newAppointment = new Appointment({
            appointmentTime,
            userId,
            doctorId,
            firstname,
            lastname,
            email,
            birthdate,
            gender,
            profileImage,
        });
        await newAppointment.save();
        res.status(201).json({ message: 'Appointment created', appointment: newAppointment });
    } catch (error) {
        res.status(400).json({ message: 'Error creating appointment', error });
    }
});
router.get('/doctor/:doctorId', async (req, res) => {
    try {
      const doctorId = req.params.doctorId; 
      const appointments = await Appointment.find({ doctorId }); 
  
      if (appointments.length === 0) {
        return res.status(404).json({ message: 'No appointments found for this doctor' });
      }
  
      res.status(200).json(appointments); 
    } catch (error) {
      res.status(500).json({ message: 'Error retrieving appointments', error });
    }
  });



router.delete('/deleteByUserID', async (req, res) => {
    try {
        console.log('Received request to delete user:', req.body.userId);
      const userId = req.body.userId; 
      const appointment = await Appointment.deleteMany({ userId: userId });
        
      
      if (!appointment) {
        return res.status(404).json({ message: 'No appointment found for this user to delete' });
      }
  
      res.status(200).json({ message: `Appointment for user ${userId} has been deleted` }); // ส่งข้อความกลับไปที่ frontend
    } catch (error) {
      res.status(500).json({ message: 'Error deleting appointment', error });
    }
  });
  
  
module.exports = router;
