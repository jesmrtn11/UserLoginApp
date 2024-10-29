const { User, findUser, addUser } = require('./user');

function register(username, password) {
    const user = findUser(username);
    if (user) {
        return { success: false, message: 'Username already exists.' };
    }
    
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/;
    if (!passwordRegex.test(password)) {
        return { success: false, message: 'Password must be at least 8 characters long, contain at least one uppercase letter and one number.' };
    }

    const newUser = new User(username, password);
    addUser(newUser);
    return { success: true, message: 'User registered successfully.' };
}

module.exports = register;