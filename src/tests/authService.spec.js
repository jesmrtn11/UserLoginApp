// src/tests/authService.spec.js
const fs = require('fs');
const path = require('path');
const bcrypt = require('bcrypt');
const { login, createUser, changePassword  } = require('../services/authService');

// Set up a test file path for users
const usersFilePath = path.join(__dirname, '../data/users.json');

// Utility function to reset the users.json file before each test
function resetUsers() {
    fs.writeFileSync(usersFilePath, JSON.stringify([]));
}

function getUsersFromFile() {
  const data = fs.readFileSync(usersFilePath, 'utf-8');
  return JSON.parse(data);
}

// This block runs before each test
beforeEach(() => {
    resetUsers(); // Clear user data before each test
});

describe('AuthService', () => {
    describe('createUser', () => {
        it('should create a new user with valid username and password', async () => {
            const username = 'testUser';
            const password = 'Test1234';
            const user = await createUser(username, password);

            expect(user.username).toBe(username);
            expect(user.password).not.toBe(password); // Password should be hashed
            const isPasswordValid = await bcrypt.compare(password, user.password);
            expect(isPasswordValid).toBe(true); // Check if the hashed password is valid
        });

        it('should throw an error for invalid username', async () => {
            const invalidUsername = 'us'; // Too short

            await expect(createUser(invalidUsername, 'Test1234')).rejects.toThrow(
                'Username must be between 3 and 20 characters and can only contain letters, numbers, and underscores.'
            );
        });

        it('should throw an error for invalid password', async () => {
            const username = 'validUser';

            await expect(createUser(username, 'short')).rejects.toThrow(
                'Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, and one number.'
            );
        });

        it('should throw an error when trying to create a user with an existing username', async () => {
            const username = 'existingUser';
            const password = 'Test1234';

            await createUser(username, password); // Create the user first
            await expect(createUser(username, password)).rejects.toThrow(
                'Username already exists.'
            );
        });
    });

    describe('login', () => {
        it('should login successfully with correct credentials', async () => {
            const username = 'testUser';
            const password = 'Test1234';
            await createUser(username, password); // Create the user

            const result = login(username, password);
            expect(result).toBe(true);
        });

        it('should throw an error for invalid username or password', () => {
          expect(() => login('wrongUser', 'Test1234')).toThrow(
              'Invalid username or password.'
          );
          createUser('testUser', 'Test1234');
      
          expect(() => login('testUser', 'wrongPassword')).toThrow(
              'Invalid username or password.'
          );
      });
      
      
    });

    describe('changePassword', () => {
      it('should change the password successfully', async () => {
        const username = 'testUser';
        const oldPassword = 'Test1234';
        const newPassword = 'NewPass1234';
    
        await createUser(username, oldPassword); // Create the user
        const changeResult = changePassword(username, oldPassword, newPassword);
        expect(changeResult).toBe(true);
      });
    
    

      it('should throw an error when old password is incorrect', async () => {
        const username = 'testUser';
        const password = 'Test1234';
        await createUser(username, password); // Create the user
        console.log('Users after user creation:', getUsersFromFile()); // Log users after creation

        await expect(() => changePassword(username, 'wrongOldPassword', 'NewPass1234')).toThrow(
            'User not found or old password is incorrect.'
        );
    });

    it('should throw an error for invalid new password', async () => {
        const username = 'testUser';
        const oldPassword = 'Test1234';
        await createUser(username, oldPassword); // Create the user
        console.log('Users after user creation:', getUsersFromFile()); // Log users after creation

        await expect(() => changePassword(username, oldPassword, 'short')).toThrow(
            'New password does not meet security requirements.'
        );
    });

    });
});
