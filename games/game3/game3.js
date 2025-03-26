let num1, num2, operator, correctAnswer;
let score = 0;
let timeLeft = 30;
let timerInterval;

function startGame() {
    generateQuestion();
    timerInterval = setInterval(updateTimer, 1000);
}

function generateQuestion() {
    num1 = Math.floor(Math.random() * 20);
    num2 = Math.floor(Math.random() * 20);

    const operators = ['+', '-', '*'];
    operator = operators[Math.floor(Math.random() * operators.length)];

    correctAnswer = eval(num1 + operator + num2);
    
    document.getElementById('question').innerText = `${num1} ${operator} ${num2} = ?`;
    document.getElementById('answer').value = '';
}

function checkAnswer() {
    const userAnswer = parseInt(document.getElementById('answer').value);

    if (userAnswer === correctAnswer) {
        score++;
        document.getElementById('feedback').innerText = "Correct!";
    } else {
        document.getElementById('feedback').innerText = "Wrong! Try next one.";
    }

    document.getElementById('score').innerText = `Score: ${score}`;
    generateQuestion();
}

function updateTimer() {
    timeLeft--;
    document.getElementById('timer').innerText = `Time Left: ${timeLeft}s`;

    if (timeLeft <= 0) {
        clearInterval(timerInterval);
        document.getElementById('question').innerText = "Time's Up!";
        document.getElementById('feedback').innerText = `Your final score: ${score}`;
        document.getElementById('answer').disabled = true;
    }
}

window.onload = startGame;
