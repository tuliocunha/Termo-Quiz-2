// dashboard.js
document.addEventListener('DOMContentLoaded', function() {
    // Fetch user data
    fetch('/api/user')
    .then(response => response.json())
    .then(data => {
        document.getElementById('username').textContent = data.username;
        // Display quiz history
        const quizHistory = data.quizHistory.map(quiz => `<div>${quiz}</div>`).join('');
        document.getElementById('quizHistory').innerHTML = quizHistory;
    });
});
