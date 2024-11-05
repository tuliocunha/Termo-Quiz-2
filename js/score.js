// score.js
document.addEventListener('DOMContentLoaded', function() {
    const quizId = new URLSearchParams(window.location.search).get('quizId');

    fetch(`/api/quiz/${quizId}/score`)
    .then(response => response.json())
    .then(data => {
        document.getElementById('score').textContent = data.score;
    });
});
