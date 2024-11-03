const readline = require('readline');
const { login, createUser, changePassword } = require('./services/authService');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function displayMenu() {
  console.log(`
    1. Create New User
    2. Login
    3. Change Password
    4. Exit
  `);
}

async function handleUserChoice(choice) {
  switch (choice) {
    case '1':
      rl.question('Enter username: ', username => {
        rl.question('Enter password: ', async password => {
          try {
            await createUser(username, password);
            console.log('User created successfully.');
          } catch (error) {
            console.log(error.message);
          }
          displayMenu();
        });
      });
      break;
    case '2':
      rl.question('Enter username: ', username => {
        rl.question('Enter password: ', password => {
          try {
            if (login(username, password)) {
              console.log('Login successful.');
            }
          } catch (error) {
            console.log(error.message);
          }
          displayMenu();
        });
      });
      break;
    case '3':
      rl.question('Enter username: ', username => {
        rl.question('Enter old password: ', oldPassword => {
          rl.question('Enter new password: ', newPassword => {
            try {
              if (changePassword(username, oldPassword, newPassword)) {
                console.log('Password changed successfully.');
              }
            } catch (error) {
              console.log(error.message);
            }
            displayMenu();
          });
        });
      });
      break;
    case '4':
      rl.close();
      break;
    default:
      console.log('Invalid choice. Please try again.');
      displayMenu();
      break;
  }
}

displayMenu();
rl.on('line', handleUserChoice);