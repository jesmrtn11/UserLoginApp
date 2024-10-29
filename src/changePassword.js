const { findUser } = require('./user');

function changePassword(username, oldPassword, newPassword) {
    const user = findUser(username);
    if (!user) {
        return { success: false, message: 'User not found.' };
    }
    if (user.password !== oldPassword) {
        return { success: false, message: 'Old password is incorrect.' };
    }
    if (oldPassword === newPassword) {
        return { success: false, message: 'New password must be different from the old password.' };
    }

    // Password strength check
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/;
    if (!passwordRegex.test(newPassword)) {
        return { success: false, message: 'New password does not meet the security requirements.' };
    }

    user.password = newPassword; // In a real application, hash the new password
    return { success: true, message: 'Password changed successfully.' };
}

module.exports = changePassword;