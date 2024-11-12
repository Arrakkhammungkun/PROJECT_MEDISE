var mongoose =require('mongoose');
var Schema =mongoose.Schema;

var studentSchema =new Schema({
    firstname:{
        type:String,
        required: true
    },
    lastname:{
        type:String,
        required: true
    },
    email:{
        type:String,
        required: true,
        unique: true
    },
    password:{
        type:String,
        required: true
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
    address: { 
        type: String,
        default: ''
    },
    profileImage: {
        type: String,
        default: ''
    },
    role: {
        type: String,
        default: 'user'
    },
});
module.exports=mongoose.model('student',studentSchema)