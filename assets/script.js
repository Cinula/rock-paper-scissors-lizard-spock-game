let userScore = 0;
let compScore = 0;
const userScoreSpan = document.getElementById("user-score");
const compScoreSpan = document.getElementById("computer-score");
const resultP = document.querySelector(".result > p");
const rockDiv = document.getElementById("r");
const paperDiv = document.getElementById("p");
const scissoresDiv = document.getElementById("c");
const lizardDiv = document.getElementById("l");
const spockDiv = document.getElementById("s");

function getComputerChoice() {
    const choices = ['r', 'p', 'c', 'l', 's'];
    const randomNumber = Math.floor(Math.random() * 5);
    return choices[randomNumber];
}
function coverLetter(letter) {
    if (letter === "r") return "Rock";
    if (letter === "p") return "Paper";
    if (letter === "c") return "Scissores";
    if (letter === "l") return "Lizard";
    if (letter === "s") return "Spock";
}

function win(userChoice, computerChoice) {
    userScore++;
    userScoreSpan.innerHTML = userScore;
    compScoreSpan.innerHTML = compScore;
    resultP.innerHTML = `${coverLetter(userChoice)} beats ${coverLetter(computerChoice)} You WON!!!`;
}
function lose(userChoice, computerChoice) {
    compScore++;
    userScoreSpan.innerHTML = userScore;
    compScoreSpan.innerHTML = compScore;
    resultP.innerHTML = `${coverLetter(userChoice)} loses to ${coverLetter(computerChoice)} You LOST!`;;
}
function draw(userChoice, computerChoice) {
    resultP.innerHTML = `${coverLetter(userChoice)} Equals ${coverLetter(computerChoice)} Its a draw!`;
}

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

function main() {

    rockDiv.addEventListener('click', function () {
        game("r");
    })
    paperDiv.addEventListener('click', function () {
        game("p");
    })
    scissoresDiv.addEventListener('click', function () {
        game("c");
    })
    lizardDiv.addEventListener('click', function () {
        game("l");
    })
    spockDiv.addEventListener('click', function () {
        game("s");
    })
}

main();