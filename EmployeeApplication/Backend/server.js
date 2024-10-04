const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(cors());

const users = [
    { username: 'admin', password: 'password123' },
    { username: 'admin', password: 'pass123' }
];

// Login route
app.post('/login', (req, res) => {
    const { username, password } = req.body;

    // Simple validation
    const user = users.find(user => user.username === username && user.password === password);

    if (user) {
        res.status(200).json({ message: 'Login successful', user });
    } else {
        res.status(401).json({ message: 'Invalid username or password' });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
