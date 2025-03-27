// Game Variables
let correctAnswer;
let timer;
let currentScore = 0;
let highScore = localStorage.getItem("highScore") || 0;
let maxNumber = 10;  // Start with simple numbers
let timeLimit = 10;  // Start with 10 seconds

// Generate Random Number
function getRandomNumber(max) {
    return Math.floor(Math.random() * max) + 1;
}

// Generate New Question
function generateQuestion() {
    const num1 = getRandomNumber(maxNumber);
    const num2 = getRandomNumber(maxNumber);
    
    // More multiplication as difficulty increases
    const operations = currentScore < 5 ? ["+", "-"] : ["+", "-", "*"];
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
    resetTimer();
}

// Check User Answer
function checkAnswer() {
    const userAnswer = parseInt(document.getElementById("answer").value);

    if (userAnswer === correctAnswer) {
        currentScore++;
        increaseDifficulty();
        updateScores();
        document.getElementById("result").innerText = "🎉 Correct! Next question...";
        setTimeout(() => {
            document.getElementById("answer").value = "";
            generateQuestion();
        }, 1000);
    } else {
        gameOver();
    }
}

// Increase Difficulty Gradually
function increaseDifficulty() {
    if (currentScore % 3 === 0) {
        maxNumber += 10; // Increase number range every 3 correct answers
        if (timeLimit > 3) timeLimit--; // Reduce time limit
    }
}

// Update Score Display
function updateScores() {
    document.getElementById("current-score").innerText = `Current Score: ${currentScore}`;
    
    if (currentScore > highScore) {
        highScore = currentScore;
        localStorage.setItem("highScore", highScore);
    }

    document.getElementById("high-score").innerText = `High Score: ${highScore}`;
}

// Game Over Logic
function gameOver() {
    document.getElementById("result").innerText = `❌ Wrong! Game Over. Final Score: ${currentScore}`;
    document.getElementById("restart-btn").classList.remove("hidden");
    clearInterval(timer);
}

// Restart Game
function restartGame() {
    currentScore = 0;
    maxNumber = 10;
    timeLimit = 10;
    updateScores();
    document.getElementById("result").innerText = "";
    document.getElementById("restart-btn").classList.add("hidden");
    document.getElementById("answer").value = "";
    generateQuestion();
}

// Timer Function
function resetTimer() {
    clearInterval(timer);
    let timeLeft = timeLimit;
    timer = setInterval(() => {
        if (timeLeft <= 0) {
            clearInterval(timer);
            gameOver();
        } else {
            document.getElementById("result").innerText = `⏳ Time left: ${timeLeft}s`;
        }
        timeLeft--;
    }, 1000);
}

// Event Listeners
document.getElementById("submit-btn").addEventListener("click", checkAnswer);
document.getElementById("restart-btn").addEventListener("click", restartGame);

// Initial Game Load
document.getElementById("high-score").innerText = `High Score: ${highScore}`;
generateQuestion();

