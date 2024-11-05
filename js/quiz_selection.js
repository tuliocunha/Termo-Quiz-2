// quiz_selection.js
document.addEventListener('DOMContentLoaded', function() {
    // Fetch available quizzes
    fetch('/api/quizzes')
    .then(response => response.json())
    .then(data => {
        const quizList = data.map(quiz => `<div><a href="questions.html?quizId=${quiz.id}">${quiz.name}</a></div>`).join('');
        document.getElementById('quizList').innerHTML = quizList;
    });
});
