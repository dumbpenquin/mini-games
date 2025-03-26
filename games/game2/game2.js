// Card values and suits
const suits = ["♠️", "♥️", "♦️", "♣️"];
const values = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];

// Game variables
let playerCards = [];
let dealerCards = [];
let playerScore = 0;
let dealerScore = 0;
let isGameOver = false;

// DOM Elements
const dealerCardsDiv = document.getElementById("dealer-cards");
const playerCardsDiv = document.getElementById("player-cards");
const dealerScoreDisplay = document.getElementById("dealer-score");
const playerScoreDisplay = document.getElementById("player-score");
const resultDisplay = document.getElementById("result");
const btnHit = document.getElementById("btn-hit");
const btnStand = document.getElementById("btn-stand");
const btnRestart = document.getElementById("btn-restart");

// Start game
startGame();

// Initialize game
function startGame() {
    resetGame();
    // Deal initial cards
    playerCards = [getRandomCard(), getRandomCard()];
    dealerCards = [getRandomCard(), getRandomCard()];

    // Hide dealer's second card
    displayCards(playerCardsDiv, playerCards);
    displayCards(dealerCardsDiv, [dealerCards[0], "❓"]);

    updateScores();
}

// Get random card
function getRandomCard() {
    const suit = suits[Math.floor(Math.random() * suits.length)];
    const value = values[Math.floor(Math.random() * values.length)];
    return { suit, value };
}

// Display cards
function displayCards(element, cards) {
    element.innerHTML = "";
    cards.forEach(card => {
        const cardText = card === "❓" ? "❓" : `${card.suit}${card.value}`;
        const cardDiv = document.createElement("div");
        cardDiv.className = "card";
        cardDiv.innerText = cardText;
        element.appendChild(cardDiv);
    });
}

// Update scores
function updateScores(revealDealer = false) {
    playerScore = calculateScore(playerCards);
    dealerScore = calculateScore(dealerCards);

    playerScoreDisplay.innerText = `Score: ${playerScore}`;

    // Show dealer's score only after reveal
    if (revealDealer || isGameOver) {
        dealerScoreDisplay.innerText = `Score: ${dealerScore}`;
    } else {
        dealerScoreDisplay.innerText = "Score: ?";
    }

    // Check for Blackjack or Bust
    if (playerScore === 21) {
        endGame("Blackjack! You win! 🎉");
    } else if (playerScore > 21) {
        endGame("Bust! You lose! 😢");
    }
}

// Calculate score
function calculateScore(cards) {
    let score = 0;
    let aceCount = 0;

    cards.forEach(card => {
        if (card.value === "J" || card.value === "Q" || card.value === "K") {
            score += 10;
        } else if (card.value === "A") {
            aceCount += 1;
            score += 11;
        } else if (card !== "❓") {
            score += parseInt(card.value);
        }
    });

    // Handle Aces if score goes over 21
    while (score > 21 && aceCount > 0) {
        score -= 10;
        aceCount -= 1;
    }

    return score;
}

// Player hits
btnHit.addEventListener("click", () => {
    if (isGameOver) return;

    playerCards.push(getRandomCard());
    displayCards(playerCardsDiv, playerCards);
    updateScores();
});

// Player stands
btnStand.addEventListener("click", () => {
    if (isGameOver) return;

    revealDealerCard();

    while (dealerScore < 17) {
        dealerCards.push(getRandomCard());
        dealerScore = calculateScore(dealerCards);
    }

    checkWinner();
});

// Reveal dealer’s second card
function revealDealerCard() {
    displayCards(dealerCardsDiv, dealerCards);
    updateScores(true); // Reveal dealer's score after stand
}

// Check winner
function checkWinner() {
    if (dealerScore > 21) {
        endGame("Dealer busts! You win! 🎉");
    } else if (dealerScore > playerScore) {
        endGame("Dealer wins! 😢");
    } else if (dealerScore < playerScore) {
        endGame("You win! 🎉");
    } else {
        endGame("It’s a tie! 🤝");
    }
}

// End game
function endGame(message) {
    isGameOver = true;
    resultDisplay.innerText = message;
    resultDisplay.classList.remove("hidden");
    btnRestart.classList.remove("hidden");
    btnHit.disabled = true;
    btnStand.disabled = true;
}

// Restart game
btnRestart.addEventListener("click", () => {
    startGame();
    resultDisplay.classList.add("hidden");
    btnRestart.classList.add("hidden");
    btnHit.disabled = false;
    btnStand.disabled = false;
    isGameOver = false;
});

// Reset game
function resetGame() {
    playerCards = [];
    dealerCards = [];
    playerScore = 0;
    dealerScore = 0;
    isGameOver = false;
    dealerCardsDiv.innerHTML = "";
    playerCardsDiv.innerHTML = "";
    resultDisplay.innerText = "";
}
