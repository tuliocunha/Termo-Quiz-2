document.addEventListener('DOMContentLoaded', function () {
    const quizContainer = document.getElementById('quiz-container');

    // Example quiz data
    const quizData = [
        {
            question: 'Qual componente é responsável por comprimir o refrigerante?',
            options: ['Condensador', 'Evaporador', 'Compressor', 'Válvula de Expansão'],
            correct: 'Compressor'
        },
        {
            question: 'Qual é a função do evaporador?',
            options: ['Absorver calor do ambiente', 'Condensar o refrigerante', 'Expandir o refrigerante', 'Comprimir o refrigerante'],
            correct: 'Absorver calor do ambiente'
        },
        {
            question: 'Onde o refrigerante se expande e esfria?',
            options: ['Condensador', 'Evaporador', 'Compressor', 'Válvula de Expansão'],
            correct: 'Válvula de Expansão'
        }
    ];

    let currentQuestionIndex = 0;

    function loadQuestion() {
        if (currentQuestionIndex >= quizData.length) {
            quizContainer.innerHTML = '<h2>Você completou o quiz!</h2>';
            return;
        }

        const currentQuestion = quizData[currentQuestionIndex];
        quizContainer.innerHTML = `
            <h2>${currentQuestion.question}</h2>
            ${currentQuestion.options.map((option, index) => `
                <button onclick="submitAnswer('${option}')">${index + 1}. ${option}</button>
            `).join('')}
        `;
    }

    window.submitAnswer = function (selectedOption) {
        const currentQuestion = quizData[currentQuestionIndex];
        if (selectedOption === currentQuestion.correct) {
            alert('Correto!');
        } else {
            alert('Incorreto. A resposta correta é ' + currentQuestion.correct);
        }
        currentQuestionIndex++;
        loadQuestion();
    };

    loadQuestion();
});
