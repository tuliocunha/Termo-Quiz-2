import { dbManager } from './database.js';

document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');
    
    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        
        try {
            const user = await dbManager.getUserByEmail(email);
            
            if (!user) {
                showError('User not found');
                return;
            }
            
            // In a real application, you should use proper password hashing
            if (user.password !== password) {
                showError('Invalid password');
                return;
            }
            
            // Store user session
            chrome.storage.local.set({ 
                currentUser: {
                    id: user.id,
                    email: user.email,
                    username: user.username
                }
            }, () => {
                window.location.href = 'dashboard.html';
            });
            
        } catch (error) {
            showError('Login failed: ' + error.message);
        }
    });
    
    function showError(message) {
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.textContent = message;
        
        const container = document.querySelector('.login-form');
        container.insertBefore(errorDiv, loginForm);
        
        setTimeout(() => errorDiv.remove(), 3000);
    }
});
