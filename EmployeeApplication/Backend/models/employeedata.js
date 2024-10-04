const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

// Define schema for login data
const employeeDataSchema = new mongoose.Schema({
  emp_img: {
    type: String,
  },
  emp_name: {
    type: String,
    required: true
  },
  emp_email:{
    type:String,
    required:true,
    unique:true
  },
  emp_mobile_number: {
    type: String,
    required: true,
    unique:true
  },
  emp_designation: {
    type: String,
    required: true
  },
  emp_gender: {
    type: String,
    required: true
  },
  emp_course: {
    type: String,
    required: true
  },
  emp_date: {
    type: Date,
    default: Date.now,
    required: true
  }
});

employeeDataSchema.plugin(AutoIncrement, { inc_field: 'emp_id' });

module.exports = mongoose.model('employeeDetails', employeeDataSchema);
