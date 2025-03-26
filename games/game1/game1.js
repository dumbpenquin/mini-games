const words = ["javascript", "hangman", "programming", "developer", "computer"];
let selectedWord = words[Math.floor(Math.random() * words.length)];
let guessedLetters = [];
let wrongLetters = [];
let maxAttempts = 6;

const wordDisplay = document.getElementById("word");
const wrongLettersDisplay = document.getElementById("wrong-letters");
const messageDisplay = document.getElementById("message");
const hangmanDrawing = document.getElementById("hangman-drawing");
const restartBtn = document.getElementById("restart-btn");

const hangmanStages = [
    `
      
      
      
      
      
______
`,
    `
      
      
      
      
     |
______
`,
    `
      
      
      
     O
     |
______
`,
    `
      
      
     O
    /|
     |
______
`,
    `
      
     O
    /|\\
     |
______
`,
    `
      
     O
    /|\\
     |
    / 
______
`,
    `
      
     O
    /|\\
     |
    / \\
______
`
];

function displayWord() {
    wordDisplay.innerHTML = selectedWord
        .split("")
        .map(letter => (guessedLetters.includes(letter) ? letter : "_"))
        .join(" ");
}

function updateHangman() {
    hangmanDrawing.innerText = hangmanStages[wrongLetters.length];
}

function guessLetter() {
    const input = document.getElementById("letter-input");
    const letter = input.value.toLowerCase();
    input.value = "";

    if (!letter.match(/[a-z]/) || letter.length !== 1) {
        messageDisplay.innerText = "Enter a valid letter!";
        return;
    }

    if (guessedLetters.includes(letter) || wrongLetters.includes(letter)) {
        messageDisplay.innerText = "You already guessed that letter!";
        return;
    }

    if (selectedWord.includes(letter)) {
        guessedLetters.push(letter);
    } else {
        wrongLetters.push(letter);
    }

    updateGame();
}

function updateGame() {
    displayWord();
    wrongLettersDisplay.innerText = wrongLetters.join(", ");
    updateHangman();
    messageDisplay.innerText = "";

    if (!wordDisplay.innerText.includes("_")) {
        messageDisplay.innerText = "Congratulations! You won!";
        restartBtn.style.display = "block";
    } else if (wrongLetters.length >= maxAttempts) {
        messageDisplay.innerText = "Game Over! The word was \"" + selectedWord + "\".";

        restartBtn.style.display = "block";
    }
}

function restartGame() {
    selectedWord = words[Math.floor(Math.random() * words.length)];
    guessedLetters = [];
    wrongLetters = [];
    restartBtn.style.display = "none";
    displayWord();
    updateHangman();
    wrongLettersDisplay.innerText = "";
    messageDisplay.innerText = "";
}

displayWord();
updateHangman();