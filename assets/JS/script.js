// Game state variables
let userScore = 0;
let compScore = 0;
let gameOver = false;
let currentDuration = null;
let countdown;
const winningScore = 5;

// DOM Elements
const userScoreSpan = document.getElementById("user-score");
const compScoreSpan = document.getElementById("computer-score");
const resultP = document.querySelector(".result > p");
const timerDisplay = document.getElementById('timer');
const choices = ['r', 'p', 'c', 'l', 's'];
const choiceDivs = choices.map(choice => document.getElementById(choice));

// Initialize the game
function initializeGame() {
    const difficultyButtons = ['easy', 'medium', 'hard'];
    const difficultyTimes = [4, 3, 2];

    difficultyButtons.forEach((id, index) => {
        document.getElementById(id).addEventListener('click', () => startTimer(difficultyTimes[index]));
    });

    choiceDivs.forEach(div => div.addEventListener('click', () => handleChoice(div.id)));

    setupRulesModal();
    getUserName();
}

// Setup rules modal
function setupRulesModal() {
    const rulesBtn = document.getElementById('rulesBtn');
    const rulesModal = document.getElementById('rulesModal');
    const closeBtn = document.querySelector('.closeBtn');

    rulesBtn.addEventListener('click', () => rulesModal.style.display = 'block');
    closeBtn.addEventListener('click', () => rulesModal.style.display = 'none');
    window.addEventListener('click', (e) => {
        if (e.target == rulesModal) {
            rulesModal.style.display = 'none';
        }
    });
}

// Get user name
function getUserName() {
    let userName;
    do {
        userName = prompt("Enter your name (at least 3 characters):");
        if (userName === null) {
            alert("You canceled the input. Please try again.");
        } else if (userName.trim().length < 3) {
            alert("Invalid name. Please enter a name with at least 3 characters.");
        }
    } while (!userName || userName.trim().length < 3);

    document.getElementById('user-label').innerText = userName.trim();
}

// Start the timer
function startTimer(seconds) {
    clearInterval(countdown);
    currentDuration = seconds;
    resultP.textContent = '';
    updateTimerDisplay(seconds);

    const endTime = Date.now() + seconds * 1000;

    countdown = setInterval(() => {
        const secondsLeft = Math.round((endTime - Date.now()) / 1000);

        if (secondsLeft <= 0) {
            clearInterval(countdown);
            handleTimeout();
        } else {
            updateTimerDisplay(secondsLeft);
        }
    }, 1000);
}

// Update timer display
function updateTimerDisplay(seconds) {
    timerDisplay.textContent = `Time remaining: ${seconds}s`;
}

// Handle timeout
function handleTimeout() {
    compScore++;
    updateScores();
    resultP.textContent = 'Time is up! Computer wins the round.';
    timerDisplay.textContent = '';
    checkWinner();
}

// Handle user choice
function handleChoice(userChoice) {
    if (gameOver || !currentDuration) return;

    clearInterval(countdown);
    const computerChoice = getComputerChoice();
    const result = getResult(userChoice, computerChoice);
    updateGame(result, userChoice, computerChoice);
    startTimer(currentDuration);
}

// Get computer choice
function getComputerChoice() {
    return choices[Math.floor(Math.random() * choices.length)];
}

// Get result of the round
function getResult(userChoice, computerChoice) {
    const outcomes = {
        rr: 'draw', pp: 'draw', cc: 'draw', ll: 'draw', ss: 'draw',
        rc: 'win', rl: 'win', pr: 'win', ps: 'win', cp: 'win',
        cl: 'win', ls: 'win', lp: 'win', sr: 'win', sc: 'win',
        rp: 'lose', rs: 'lose', pc: 'lose', pl: 'lose', cr: 'lose',
        cs: 'lose', lr: 'lose', lc: 'lose', sp: 'lose', sl: 'lose'
    };
    return outcomes[userChoice + computerChoice];
}

// Update game state
function updateGame(result, userChoice, computerChoice) {
    if (result === 'win') {
        userScore++;
        resultP.innerHTML = `${coverLetter(userChoice)} beats ${coverLetter(computerChoice)}. You WON!!!`;
    } else if (result === 'lose') {
        compScore++;
        resultP.innerHTML = `${coverLetter(userChoice)} loses to ${coverLetter(computerChoice)}. You LOST!`;
    } else {
        resultP.innerHTML = `${coverLetter(userChoice)} equals ${coverLetter(computerChoice)}. It's a DRAW!`;
    }
    updateScores();
    checkWinner();
}

// Update scores
function updateScores() {
    userScoreSpan.innerHTML = userScore;
    compScoreSpan.innerHTML = compScore;
}

// Check for a winner
function checkWinner() {
    if (userScore === winningScore || compScore === winningScore) {
        gameOver = true;
        const winner = userScore === winningScore ? document.getElementById('user-label').innerText : 'Computer';
        showWinnerAlert(winner);
    }
}

// Show winner alert
function showWinnerAlert(winner) {
    setTimeout(() => {
        alert(`${winner} wins the game!\n\nFinal Score:\n${document.getElementById('user-label').innerText}: ${userScore}\nComputer: ${compScore}`);
        if (confirm('Do you want to play again?')) {
            resetGame();
        }
    }, 100);
}

// Reset the game
function resetGame() {
    userScore = 0;
    compScore = 0;
    gameOver = false;
    updateScores();
    resultP.innerHTML = '';
    clearInterval(countdown);
    timerDisplay.textContent = '';
    currentDuration = null;
}

// Convert choice to full word
function coverLetter(letter) {
    const words = {r: "Rock", p: "Paper", c: "Scissors", l: "Lizard", s: "Spock"};
    return words[letter];
}

// Initialize the game when the DOM is loaded
document.addEventListener("DOMContentLoaded", initializeGame);