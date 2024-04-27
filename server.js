const express = require("express");
const mysql = require("mysql");
const session = require("express-session");
const bcrypt = require("bcryptjs");
const { check, validationResult } = require("express-validator");
const path = require("path");

const app = express();

app.set("view engine", "ejs")
app.use(express.static("lms"))
app.listen(3000)
app.use(express.static(__dirname))
app.use(express.json())

// Create MySQL connection
const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "jeanmarieglenn4!",
    database: "learning_management"
});

// Connect to MySQL
connection.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL: ' + err.stack);
        return;
    }
    console.log('Connected to MySQL as id ' + connection.threadId);
});

// Set up session middleware
app.use(session({
    secret: 'your_secret_key', // Set your secret key here
    resave: false,
    saveUninitialized: true
}));

// Set view engine and static directory
app.set("view engine", "ejs");
app.use(express.static("lms"));

// Middleware to parse JSON request bodies
app.use(express.json());

// Define User object
const User = {
    tableName: 'users', 
    createUser: function(newUser, callback) {
        connection.query('INSERT INTO ' + this.tableName + ' SET ?', newUser, callback);
    },  
    getUserByEmail: function(email, callback) {
        connection.query('SELECT * FROM ' + this.tableName + ' WHERE email = ?', email, callback);
    },
    getUserByUsername: function(username, callback) {
        connection.query('SELECT * FROM ' + this.tableName + ' WHERE username = ?', username, callback);
    }
};

// Registration route
app.post('/register', [
    // Validation checks...
], async (req, res) => {
    // Check for validation errors...
});

// Login route
app.post('/login', (req, res) => {
    // Login logic...
});

// Logout route
app.post('/logout', (req, res) => {
    // Logout logic...
});

// Dashboard route
app.get('/dashboard', (req, res) => {
    // Dashboard logic...
});

// Route to retrieve course content
app.get('/course/:id', (req, res) => {
    // Course content logic...
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
