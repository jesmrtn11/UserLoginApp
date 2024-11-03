// src/tests/User.spec.js
const User = require('../models/User');

describe('User Model', () => {
  
  describe('Username Validation', () => {
    it('should throw an error for an empty username', () => {
      expect(() => new User('', 'ValidPass123')).toThrow(
        'Username must be between 3 and 20 characters and can only contain letters, numbers, and underscores.'
      );
    });

    it('should throw an error for a short username', () => {
      expect(() => new User('us', 'ValidPass123')).toThrow(
        'Username must be between 3 and 20 characters and can only contain letters, numbers, and underscores.'
      );
    });

    it('should throw an error for an invalid username with special characters', () => {
      expect(() => new User('invalid!user', 'ValidPass123')).toThrow(
        'Username must be between 3 and 20 characters and can only contain letters, numbers, and underscores.'
      );
    });
    
    it('should create a user with a valid username', () => {
      const user = new User('validUser', 'ValidPass123');
      expect(user.username).toBe('validUser');
    });
  });

  describe('Password Validation', () => {
    it('should throw an error for an empty password', async () => {
      await expect(async () => {
        await User.create('validUser', '');
      }).rejects.toThrow(
        'Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, and one number.'
      );
    });

    it('should throw an error for a short password', async () => {
      await expect(async () => {
        await User.create('validUser', 'short');
      }).rejects.toThrow(
        'Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, and one number.'
      );
    });

    it('should throw an error for a password without uppercase letters', async () => {
      await expect(async () => {
        await User.create('validUser', 'password123');
      }).rejects.toThrow(
        'Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, and one number.'
      );
    });

    it('should throw an error for a password without numbers', async () => {
      await expect(async () => {
        await User.create('validUser', 'Password');
      }).rejects.toThrow(
        'Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, and one number.'
      );
    });
  });

  describe('Password Hashing and Comparison', () => {
    it('should hash the password when creating a user', async () => {
      const user = await User.create('validUser', 'ValidPass123');
      expect(user.password).not.toBe('ValidPass123');
    });

    it('should return true when comparing the correct password', async () => {
      const user = await User.create('validUser', 'ValidPass123');
      const isMatch = await user.comparePassword('ValidPass123');
      expect(isMatch).toBe(true);
    });

    it('should return false when comparing an incorrect password', async () => {
      const user = await User.create('validUser', 'ValidPass123');
      const isMatch = await user.comparePassword('WrongPass123');
      expect(isMatch).toBe(false);
    });
  });
});