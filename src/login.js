const { findUser } = require('./user');

function login(username, password) {
    const user = findUser(username);
    if (!user) {
        return { success: false, message: 'User not found.' };
    }
    if (user.password !== password) {
        return { success: false, message: 'Incorrect password.' };
    }
    return { success: true, message: 'Login successful.' };
}

module.exports = login;