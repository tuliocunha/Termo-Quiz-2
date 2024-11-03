import { dbManager } from './database.js';

document.addEventListener('DOMContentLoaded', () => {
    const registerForm = document.getElementById('registerForm');
    const avatarGrid = document.getElementById('avatarGrid');
    let selectedAvatar = null;

    // Load avatars
    const avatarCount = 8; // Number of available avatars
    for (let i = 1; i <= avatarCount; i++) {
        const avatarOption = document.createElement('img');
        avatarOption.src = `../assets/avatar/avatar${i}.png`;
        avatarOption.classList.add('avatar-option');
        avatarOption.addEventListener('click', () => selectAvatar(avatarOption, i));
        avatarGrid.appendChild(avatarOption);
    }

    function selectAvatar(element, avatarId) {
        document.querySelectorAll('.avatar-option').forEach(avatar => {
            avatar.classList.remove('selected');
        });
        element.classList.add('selected');
        selectedAvatar = avatarId;
    }

    registerForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const username = document.getElementById('username').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const confirmPassword = document.getElementById('confirmPassword').value;
        const terms = document.getElementById('terms').checked;

        try {
            // Validation
            if (password !== confirmPassword) {
                throw new Error('Passwords do not match');
            }

            if (!selectedAvatar) {
                throw new Error('Please select an avatar');
            }

            if (!terms) {
                throw new Error('Please accept the terms and conditions');
            }

            // Check if email already exists
            const existingUser = await dbManager.getUserByEmail(email);
            if (existingUser) {
                throw new Error('Email already registered');
            }

            // Create user
            const userData = {
                username,
                email,
                password, // In a real app, hash this password
                avatar: selectedAvatar,
                points: 0,
                dateCreated: new Date().toISOString()
            };

            await dbManager.addUser(userData);
            
            // Redirect to login
            window.location.href = 'login.html';

        } catch (error) {
            showError(error.message);
        }
    });

    function showError(message) {
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.textContent = message;
        
        const container = document.querySelector('.register-form');
        container.insertBefore(errorDiv, registerForm);
        
        setTimeout(() => errorDiv.remove(), 3000);
    }
});
