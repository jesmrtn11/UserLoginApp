const readline = require('readline-sync');
const register = require('./register');
const login = require('./login');
const changePassword = require('./changePassword');

function main() {
    while (true) {
        console.log('\nMenu:');
        console.log('1. Register');
        console.log('2. Login');
        console.log('3. Change Password');
        console.log('4. Exit');

        const choice = readline.question('Choose an option (1-4): ');

        switch (choice) {
            case '1':
                const regUsername = readline.question('Enter username: ');
                const regPassword = readline.question('Enter password: ', { hideEchoBack: true });
                const regResult = register(regUsername, regPassword);
                console.log(regResult.message);
                break;

            case '2':
                const loginUsername = readline.question('Enter username: ');
                const loginPassword = readline.question('Enter password: ', { hideEchoBack: true });
                const loginResult = login(loginUsername, loginPassword);
                console.log(loginResult.message);
                break;

            case '3':
                const userForChange = readline.question('Enter username: ');
                const oldPassword = readline.question('Enter old password: ', { hideEchoBack: true });
                const newPassword = readline.question('Enter new password: ', { hideEchoBack: true });
                const changeResult = changePassword(userForChange, oldPassword, newPassword);
                console.log(changeResult.message);
                break;

            case '4':
                console.log('Exiting...');
                return;

            default:
                console.log('Invalid option, please try again.');
        }
    }
}

main();