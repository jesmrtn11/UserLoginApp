# User Login App

This project is a Node.js application that provides basic user authentication functionality, including user creation, login, and password change features. It uses JSON as a mock database to store user data and bcrypt for password hashing. The project includes unit tests using Jest.

## Features

- **User Registration**: Create a new user with a unique username and a secure password.
- **User Login**: Authenticate a user using their username and password.
- **Password Change**: Change the password after verifying the current password.
- **Password Hashing**: Securely store passwords using bcrypt hashing.
- **Input Validation**: Validate usernames and passwords according to specified rules.

## Prerequisites

- **Node.js** v20.13.0 or later
- **bcrypt**: Password hashing library
- **Jest**: Testing framework

## Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/username/UserLoginApp.git


2. **Navigate to the project directory**:
   ```bash
cd UserLoginApp

3. **Install dependencies**:
   ```bash
   npm install

## Usage
This application provides an authentication module that can be integrated into other projects or run independently.

# Running the App 
The app uses a JSON file (users.json) in the src/data/ directory to store user data. You can interact with the authentication features through the provided functions in authService.js.

## Running Tests
```bash
    npx jest

## Tests
Tests are located in the `tests/` directory and include:

- User creation with validation
- Login functionality
- Password change with validation checks

### Authentication Logic

- **Username Requirements**: 3–20 characters, containing only letters, numbers, and underscores.
- **Password Requirements**: At least 8 characters, with one uppercase letter, one lowercase letter, and one number.