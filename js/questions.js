// questions.js
document.addEventListener('DOMContentLoaded', function() {
    let currentQuestionIndex = 0;
    const quizId = new URLSearchParams(window.location.search).get('quizId');

    function loadQuestion() {
        fetch(`/api/quiz/${quizId}/question/${currentQuestionIndex}`)
        .then(response => response.json())
        .then(data => {
            document.getElementById('question').textContent = data.text_question;
            const answers = data.answers.map(answer => `<div>${answer}</div>`).join('');
            document.getElementById('answers').innerHTML = answers;
        });
    }

    document.getElementById('nextQuestion').addEventListener('click', function() {
        currentQuestionIndex++;
        loadQuestion();
    });

    loadQuestion();
});
