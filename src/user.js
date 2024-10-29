class User {
    constructor(username, password) {
        this.username = username;
        this.password = password;
    }
}

const users = [];

function findUser(username) {
    return users.find(user => user.username === username);
}

function addUser(user) {
    users.push(user);
}

module.exports = { User, findUser, addUser, users };