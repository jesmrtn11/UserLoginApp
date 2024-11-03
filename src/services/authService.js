const fs = require('fs');
const bcrypt = require('bcrypt');
const User = require('../models/User');
const path = require('path');

const usersFilePath = path.join(__dirname, '../data/users.json');

// Helper function to load users from JSON file
function loadUsers() {
    const data = fs.readFileSync(usersFilePath, 'utf-8');
    return JSON.parse(data);
}

// Helper function to save users to JSON file
function saveUsers(users) {
    fs.writeFileSync(usersFilePath, JSON.stringify(users, null, 2));
}

// Helper function to find a user by username
function findUser(username) {
    const users = loadUsers();
    return users.find(user => user.username === username);
}

// Login function
function login(username, password) {
    const user = findUser(username);
    if (user && bcrypt.compareSync(password, user.password)) {
        return true;
    }
    throw new Error('Invalid username or password.');
}

// Create new user function
async function createUser(username, password) {
    const users = loadUsers();
  
    // Add validation for username and password as needed
    if (findUser(username)) {
        throw new Error('Username already exists.');
    }
  
    const newUser = await User.create(username, password); // Ensure this creates and hashes the password
    users.push(newUser);
    saveUsers(users);
    return newUser;
}

// Change password function
function changePassword(username, oldPassword, newPassword) {
    const users = loadUsers();
    const user = findUser(username);
  
    if (!user || !bcrypt.compareSync(oldPassword, user.password)) {
        throw new Error('User not found or old password is incorrect.');
    }
  
    // Validate new password
    if (!/^.*(?=.{8,})(?=.*[a-zA-Z])(?=.*\d)(?=.*[A-Z]).*$/.test(newPassword)) {
        throw new Error('New password does not meet security requirements.');
    }

    user.password = bcrypt.hashSync(newPassword, 10);
    saveUsers(users);
    return true;
}

module.exports = { login, createUser, changePassword, loadUsers };