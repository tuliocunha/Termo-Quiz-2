document.addEventListener('DOMContentLoaded', function () {
    // IndexedDB setup
    const dbName = "ThermoQuizDB";
    let db;

    const request = indexedDB.open(dbName, 1);

    request.onupgradeneeded = function(event) {
        db = event.target.result;

        // Create object stores
        const questionsStore = db.createObjectStore("questions", { keyPath: "id" });
        questionsStore.createIndex("unit", "unit", { unique: false });
        questionsStore.createIndex("topic", "topic", { unique: false });
        questionsStore.createIndex("difficulty_level", "difficulty_level", { unique: false });
        questionsStore.createIndex("tags", "tags", { unique: false });

        const usersStore = db.createObjectStore("users", { keyPath: "id" });
        usersStore.createIndex("email", "email", { unique: true });
        usersStore.createIndex("nickname", "nickname", { unique: false });

        const scoresStore = db.createObjectStore("scores", { keyPath: "id" });
        scoresStore.createIndex("user_id", "user_id", { unique: false });
        scoresStore.createIndex("date_played", "date_played", { unique: false });

        const badgesStore = db.createObjectStore("badges", { keyPath: "id" });
        badgesStore.createIndex("name", "name", { unique: false });
    };

    request.onsuccess = function(event) {
        db = event.target.result;
        console.log("IndexedDB initialized successfully");
    };

    request.onerror = function(event) {
        console.error("IndexedDB error: " + event.target.errorCode);
    };

    // Existing quiz functionality
    const quizContainer = document.getElementById('quiz-container');

    // Example quiz data
    const quizData = [
        {
            id: 1,
            question: 'Qual componente é responsável por comprimir o refrigerante?',
            options: ['Condensador', 'Evaporador', 'Compressor', 'Válvula de Expansão'],
            correct: 'Compressor',
            unit: 'Unit1',
            topic: 'Topic1',
            difficulty_level: 'easy',
            tags: ['tag1']
        },
        {
            id: 2,
            question: 'Qual é a função do evaporador?',
            options: ['Absorver calor do ambiente', 'Condensar o refrigerante', 'Expandir o refrigerante', 'Comprimir o refrigerante'],
            correct: 'Absorver calor do ambiente',
            unit: 'Unit2',
            topic: 'Topic2',
            difficulty_level: 'medium',
            tags: ['tag2']
        },
        {
            id: 3,
            question: 'Onde o refrigerante se expande e esfria?',
            options: ['Condensador', 'Evaporador', 'Compressor', 'Válvula de Expansão'],
            correct: 'Válvula de Expansão',
            unit: 'Unit3',
            topic: 'Topic3',
            difficulty_level: 'hard',
            tags: ['tag3']
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
