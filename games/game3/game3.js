// Game Variables
let correctAnswer;
let timer;
let difficulty = "easy";

// Difficulty Levels
const difficultyLevels = {
    easy: { maxNumber: 10, timeLimit: 10 },
    medium: { maxNumber: 20, timeLimit: 8 },
    hard: { maxNumber: 50, timeLimit: 5 }
};

// Generate Random Number
function getRandomNumber(max) {
    return Math.floor(Math.random() * max) + 1;
}

// Generate New Question
function generateQuestion() {
    const level = difficultyLevels[difficulty];
    const num1 = getRandomNumber(level.maxNumber);
    const num2 = getRandomNumber(level.maxNumber);
    const operations = ["+", "-", "*"];
    const operation = operations[Math.floor(Math.random() * operations.length)];

    switch (operation) {
        case "+":
            correctAnswer = num1 + num2;
            break;
        case "-":
            correctAnswer = num1 - num2;
            break;
        case "*":
            correctAnswer = num1 * num2;
            break;
    }

    document.getElementById("question").innerText = `${num1} ${operation} ${num2}`;
    resetTimer(level.timeLimit);
}

// Check User Answer
function checkAnswer() {
    const userAnswer = parseInt(document.getElementById("answer").value);

    if (userAnswer === correctAnswer) {
        document.getElementById("result").innerText = "🎉 Correct! Good job!";
        document.getElementById("restart-btn").classList.remove("hidden");
        clearInterval(timer);
    } else {
        document.getElementById("result").innerText = "❌ Wrong. Try again!";
    }
}

// Restart Game
function restartGame() {
    document.getElementById("result").innerText = "";
    document.getElementById("restart-btn").classList.add("hidden");
    document.getElementById("answer").value = "";
    generateQuestion();
}

// Timer Function
function resetTimer(timeLimit) {
    clearInterval(timer);
    let timeLeft = timeLimit;
    timer = setInterval(() => {
        if (timeLeft <= 0) {
            clearInterval(timer);
            document.getElementById("result").innerText = "⏰ Time's up! Try again!";
            document.getElementById("restart-btn").classList.remove("hidden");
        } else {
            document.getElementById("result").innerText = `⏳ Time left: ${timeLeft}s`;
        }
        timeLeft--;
    }, 1000);
}

// Event Listeners
document.getElementById("submit-btn").addEventListener("click", checkAnswer);
document.getElementById("restart-btn").addEventListener("click", restartGame);
document.getElementById("difficulty").addEventListener("change", (e) => {
    difficulty = e.target.value;
    restartGame();
});

// Initial Game Load
generateQuestion();

