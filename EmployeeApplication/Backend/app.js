const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const loginData = require('./models/loginData');
const Employee = require('./models/Employee')
const cors = require('cors');
const dotenv = require('dotenv');
const multer = require('multer');
const path = require('path');


dotenv.config();

const app = express();
const http = require('http').Server(app);

// Middleware to parse JSON
app.use(express.json());
app.use(cors());

// MongoDB connection URI
const uri = "mongodb+srv://susankachanda:7n3GPqNaZhpSgnBS@employee-dashboard-db.ufpaq.mongodb.net/?retryWrites=true&w=majority&appName=employee-dashboard-db";

// Connect to MongoDB
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected successfully'))
  .catch(err => console.error('MongoDB connection error:', err));

app.get("/", async (req, res) => {
  try {
    const loginResults = await loginData.find(); 
    res.json(loginResults);
  } catch (error) {
    console.error('Error retrieving login data:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});


app.post('/login', async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: 'Username and password are required' });
  }

  try {
    console.log('Searching for user:', username);
    const user = await loginData.findOne({ username });

    if (!user) {
      console.log('User not found');
      return res.status(401).json({ message: 'Invalid username or password' });
    }

    console.log('User found:', user);

    const isMatch = password === user.password

    if (!isMatch) {
      console.log('Password mismatch');
      return res.status(401).json({ message: 'Invalid username or password' });
    }
    else{
        return res.status(200).json({ message: 'valid username or password' });
        //res.status(200);
       // console.log("All Matched")
    }

    // Generate JWT token
    // const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    

  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// app.post('/create-new-employee', async (req, res) => {
//     try {
//         const { name, email, phoneNumber, gender, designation, selectedSkills, selectedFile } = req.body;

//         console.log('Request Body:', req.body);

//         await employeeData.create({
//             emp_img: selectedFile,
//             emp_name: name, 
//             emp_email: email, 
//             emp_mobile_number: phoneNumber, 
//             emp_designation: designation, 
//             emp_gender: gender, 
//             emp_course: selectedSkills,
//         })

//         return res.status(200).json({ message: 'Employee created successfully!' });
//     } catch (error) {
//         console.error('Error creating employee:', error);
//         res.status(500).json({ message: 'Error creating employee. Please try again.' });
//     }
// });



// Multer configuration for file uploads
const storage = multer.diskStorage({
  destination: './uploads/',
  filename: (req, file, cb) => {
      cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

// Endpoint to handle file upload
app.post('/upload', upload.single('file'), (req, res) => {
  if (!req.file) {
      return res.status(400).send('No file uploaded.');
  }
  res.json({ filePath: `/uploads/${req.file.filename}` });
});

// Serve static files
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// API Endpoint to create a new employee
app.post('/create-new-employee', async (req, res) => {
  try {
      const { name, email, phoneNumber, gender, designation, selectedSkills } = req.body;

      // Create new employee document
      const newEmployee = new Employee({
          name,
          email,
          phoneNumber,
          gender,
          designation,
          selectedSkills: selectedSkills?.split(','),
          image: "image.png" 
      });

      await newEmployee.save();
      res.status(200).json({ message: 'Employee created successfully!' });
      
  } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error creating employee. Please try again.' });
  }
});


http.listen(5000, function () {
  console.log("Server Running on port 5000...");
});



