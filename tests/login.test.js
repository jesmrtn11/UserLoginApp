const login = require('../src/login');
const { findUser } = require('../src/user');

jest.mock('../src/user');

describe('Login Function Tests', () => {
    let users;

    beforeEach(() => {
        jest.clearAllMocks();
        
        users = [
            { username: 'testUser', password: 'TestPass1' },
        ];
    });

    test('Login with correct username and password', () => {
        findUser.mockReturnValue(users[0]);

        const result = login('testUser', 'TestPass1');
        expect(result).toEqual({ success: true, message: 'Login successful.' });
    });

    test('Login fails with incorrect password', () => {
        findUser.mockReturnValue(users[0]);

        const result = login('testUser', 'WrongPass');
        expect(result).toEqual({ success: false, message: 'Incorrect password.' });
    });

    test('Login fails when user does not exist', () => {
        findUser.mockReturnValue(null);

        const result = login('nonExistentUser', 'SomePass');
        expect(result).toEqual({ success: false, message: 'User not found.' });
    });

    test('Login fails with empty username', () => {
        findUser.mockReturnValue(null);
        const result = login('', 'TestPass1');
        expect(result).toEqual({ success: false, message: 'User not found.' });
    });

    test('Login fails with empty password', () => {
        findUser.mockReturnValue(users[0]);
        const result = login('testUser', '');
        expect(result).toEqual({ success: false, message: 'Incorrect password.' });
    });
});
