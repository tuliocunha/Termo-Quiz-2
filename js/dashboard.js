document.addEventListener('DOMContentLoaded', async function() {
    try {
        // Fetch user data
        const response = await fetch('/api/user');
        if (!response.ok) throw new Error('Network response was not ok');
        
        const data = await response.json();
        document.getElementById('username').textContent = data.username;

        // Display quiz history
        const quizHistory = data.quizHistory.map(quiz => `<div>${quiz}</div>`).join('');
        document.getElementById('quizHistory').innerHTML = quizHistory;
    } catch (error) {
        console.error('Fetch error: ', error);
        document.getElementById('quizHistory').innerHTML = '<div>Failed to load quiz history</div>';
    }
});
