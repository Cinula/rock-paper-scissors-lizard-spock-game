let userScore = 0;
let compScore = 0;
const userScore_span = document.getElementById("user-score");
const compScore_span = document.getElementById("computer-score");
const scoreBoard_div = document.querySelector(".scores");
const result_p = document.querySelector(".result > p");
const rock_div = document.getElementById("r");
const paper_div = document.getElementById("p");
const scissores_div = document.getElementById("c");
const lizard_div = document.getElementById("l");
const spock_div = document.getElementById("s");

function getComputerChoice() {
    const choices = ['r', 'p', 'ss', 'l', 's'];
    const randomNumber = Math.floor(Math.random() * 5);
    return choices[randomNumber];
}
function coverToWorld(letter) {
    if (letter === "r") return "Rock";
    if (letter === "p") return "Paper";
    if (letter === "c") return "Scissores";
    if (letter === "l") return "Lizard";
    if (letter === "s") return "Spock";
}

function win(userChoice, computerChoice) {
    userScore++;
    userScore_span.innerHTML = userScore;
    compScore_span.innerHTML = compScore;
    result_p.innerHTML = `${coverToWorld(userChoice)} beats ${coverToWorld(computerChoice)} You win!!!`;
}
function lose(userChoice, computerChoice) {
    compScore++;
    userScore_span.innerHTML = userScore;
    compScore_span.innerHTML = compScore;
    result_p.innerHTML = `${coverToWorld(userChoice)} Loses to ${coverToWorld(computerChoice)} You Lost!`;;
}
function draw(userChoice, computerChoice) {
    result_p.innerHTML = `${coverToWorld(userChoice)} equals ${coverToWorld(computerChoice)} Its a draw!`;
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

    rock_div.addEventListener('click', function () {
        game("r");
    })
    paper_div.addEventListener('click', function () {
        game("p");
    })
    scissores_div.addEventListener('click', function () {
        game("c");
    })
    lizard_div.addEventListener('click', function () {
        game("l");
    })
    spock_div.addEventListener('click', function () {
        game("s");
    })
}

main();