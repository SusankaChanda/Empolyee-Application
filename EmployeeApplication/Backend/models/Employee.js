const mongoose = require('mongoose');

// Define the Employee schema
const employeeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        maxlength: 30
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    phoneNumber: {
        type: String,
        required: true,
        minlength: 10,
        maxlength: 10
    },
    gender: {
        type: String,
        enum: ['Male', 'Female', 'Others'],
        required: true
    },
    designation: {
        type: String,
        required: true
    },
    selectedSkills: {
        type: [String],
        required: true
    },
    image: {
        type: String, 
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

// Create the Employee model
const Employee = mongoose.model('Employee', employeeSchema);

module.exports = Employee;
