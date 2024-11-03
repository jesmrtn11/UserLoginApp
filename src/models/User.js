// src/models/User.js
const bcrypt = require('bcrypt');

class User {
    constructor(username, password = null) { // Accept hashed password optionally
        this.username = this.validateUsername(username); // Validate and set username
        this.password = password; // Set password (hashed or null)
      }
      
  // Static factory method to create a new user
  static async create(username, password) {
    const user = new User(username); // Create instance
    await user.setPassword(password); // Hash the password asynchronously
    return user; // Return the created user instance
  }

  // Method to validate username
  validateUsername(username) {
    const usernameRegex = /^[a-zA-Z0-9_]{3,20}$/; // Between 3 and 20 characters, letters, numbers, and underscores
    if (!usernameRegex.test(username)) {
      throw new Error('Username must be between 3 and 20 characters and can only contain letters, numbers, and underscores.');
    }
    return username; // Return valid username
  }

  // Method to set and hash the password
  async setPassword(password) {
    if (!this.validatePassword(password)) {
      throw new Error('Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, and one number.');
    }

    // Hash the password using bcrypt
    const saltRounds = 10; // Cost factor for bcrypt
    this.password = await bcrypt.hash(password, saltRounds); // Store hashed password
  }

  // Method to validate password
  validatePassword(password) {
    const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).{8,}$/; // At least 8 characters, 1 uppercase, 1 lowercase, and 1 digit
    return passwordRegex.test(password);
  }

  // Method to compare entered password with the stored hashed password
  async comparePassword(password) {
    return await bcrypt.compare(password, this.password);
  }
}

module.exports = User;