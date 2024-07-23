let userScore = 0;
let compScore = 0;
let userScoreSpan = document.getElementById("user-score");
let compScoreSpan = document.getElementById("computer-score");
let resultP = document.querySelector(".result > p");
let rockDiv = document.getElementById("r");
let paperDiv = document.getElementById("p");
let scissoresDiv = document.getElementById("c");
let lizardDiv = document.getElementById("l");
let spockDiv = document.getElementById("s");





// Get user name
function getUserName(){
    let userName;
    do {
        userName = prompt("Enter your name (at least 3 characters):");
        if (userName === null){
            alert("You canceled the input. Please try again.");
        } else if (userName.trim().length < 3){
            alert("Invalid name. Please enter a name with at least 3 characters.");
        }
    } while (!userName || userName.trim().length < 3);

    document.getElementById('user-label').innerText = userName.trim();
}


let countdown;
let currentDuration;
        
    document.getElementById('easy').addEventListener('click', function() {
        startTimer(4);
    });

    document.getElementById('medium').addEventListener('click', function() {
        startTimer(3);
    });

    document.getElementById('hard').addEventListener('click', function() {
        startTimer(2);
    });

    function startTimer(seconds) {
        clearInterval(countdown);
        currentDuration = seconds;
        document.querySelector(".result > p").textContent = '';
        document.getElementById('timer').textContent = `Time remaining: ${seconds}s`;

        const endTime = Date.now() + seconds * 1000;

        countdown = setInterval(function() {
            const secondsLeft = Math.round((endTime - Date.now()) / 1000);

            if (secondsLeft <= 0) {
                clearInterval(countdown);
                compScore++;
                userScoreSpan.innerHTML = userScore;
                compScoreSpan.innerHTML = compScore;
                document.querySelector(".result > p").textContent = 'Time is up! Computer wins the game.';
                document.getElementById('timer').textContent = '';
            } else {
                document.getElementById('timer').textContent = `Time remaining: ${secondsLeft}s`;
            }
        }, 1000);
    }

rockDiv.addEventListener('click', resetTimer);
paperDiv.addEventListener('click', resetTimer);
scissoresDiv.addEventListener('click', resetTimer);
lizardDiv.addEventListener('click', resetTimer);
spockDiv.addEventListener('click', resetTimer);

function resetTimer(){
    if(currentDuration){
        startTimer(currentDuration);
    }
}



// Get DOM Elements
let modal = document.querySelector('#rulesModal');
let modalBtn = document.querySelector('#rulesBtn');
let closeBtn = document.querySelector('.closeBtn');

modalBtn.addEventListener('click', openModal);
closeBtn.addEventListener('click', closeModal);
window.addEventListener('click', outsideClick);


// function for open rules 
function openModal() {
  modal.style.display = 'block';
}

// function to close rules
function closeModal() {
  modal.style.display = 'none';
}

// function close rules If click outside
function outsideClick(e) {
  if (e.target == modal) {
    modal.style.display = 'none';
  }
}



/**
 * The function is for computer to make random choise from array objects] 
 */
function getComputerChoice() {
    let choices = ['r', 'p', 'c', 'l', 's'];
    let randomNumber = Math.floor(Math.random() * 5);
    return choices[randomNumber];
}

/**
 * Function to Show full name of objects in the game to display the game 
 * "R" for Rock
 * "p" for Paper
 * "c" for Scissors
 * "l" for Lizard
 * "s" for Spock 
 */
function coverLetter(letter) {
    if (letter === "r") return "Rock";
    if (letter === "p") return "Paper";
    if (letter === "c") return "Scissors";
    if (letter === "l") return "Lizard";
    if (letter === "s") return "Spock";
}

/**
 * Function for increas the score when user wins
 * showing messege of user choice pick beast computer random choice
 */

function win(userChoice, computerChoice) {
    userScore++;
    userScoreSpan.innerHTML = userScore;
    compScoreSpan.innerHTML = compScore;
    resultP.innerHTML = `${coverLetter(userChoice)} beats ${coverLetter(computerChoice)} You WON!!!`;
}

/**
 * Function for increas the score when computer wins
 * showing messege of user choice looses to computer random choice
 */
function lose(userChoice, computerChoice) {
    compScore++;
    userScoreSpan.innerHTML = userScore;
    compScoreSpan.innerHTML = compScore;
    resultP.innerHTML = `${coverLetter(userChoice)} loses to ${coverLetter(computerChoice)} You LOST!`;
}

/**
 * Function for increas the score when user win
 * showing messege of user choice and computer random choice are equals 
 * the score stays this same
 */
function draw(userChoice, computerChoice) {
    resultP.innerHTML = `${coverLetter(userChoice)} Equals ${coverLetter(computerChoice)} Its a draw!`;
}

/**
 * Function is main engine for game 
 * This is game rules for user or computer to win, lose or draw 
 * the leters are reflection of rock, paper, scissors, lizard, spok explaind above.
 */
function game(userChoice) {
    const computerChoice = getComputerChoice();
    switch (userChoice + computerChoice) {
        case "rc":
        case "rl":
        case "ps":
        case "pr":
        case "cp":
        case "cl":
        case "ls":
        case "lp":
        case "sc":
        case "sr":
            win(userChoice, computerChoice);
            break;
        case "rp":
        case "rs":
        case "pc":
        case "pl":
        case "cr":
        case "cs":
        case "lr":
        case "lc":
        case "sp":
        case "sl":
            lose(userChoice, computerChoice);
            break;
        case "rr":
        case "pp":
        case "cc":
        case "ll":
        case "ss":
            draw(userChoice, computerChoice);
            break;
    }
}

/**
 * Function main is for to run game 
 */
function main() {

    rockDiv.addEventListener('click', function () {
        game("r");
    });
    paperDiv.addEventListener('click', function () {
        game("p");
    });
    scissoresDiv.addEventListener('click', function () {
        game("c");
    });
    lizardDiv.addEventListener('click', function () {
        game("l");
    });
    spockDiv.addEventListener('click', function () {
        game("s");
    });
}

document.addEventListener("DOMContentLoaded", (event) => {
    main();
});
