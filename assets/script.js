const choice = ["Rock", "Paper", "Scissors", "Lizard", "Spock"];
const playerView = document.getElementById("player");
const comView = document.getElementById("com");
const resultsView = document.getElementById("results");
const playerScoreView = document.getElementById('playerScore');
const computerScoreView = document.getElementById('computerScore');
let playerScore = 0;
let computerScore = 0;
/**
 * Game function for computer to pick random number from choice list
 * for player choic
 * compering player choice and computer choise
 */
function game(playerChoice) {
    const computerChoice = choice[Math.floor(Math.random() * 5)];
    let results = "";

    if (playerChoice === computerChoice) {
        results = "It's a Draw!";
    } else {
        switch (playerChoice) {
            case "Rock":
                results = (computerChoice === "Scissors") ? "You Win!" : "You Lose!";
                results = (computerChoice === "Lizard") ? "You Win!" : "You Lose!";
                break;
            case "Paper":
                results = (computerChoice === "Rock") ? "You Win!" : "You Lose!";
                results = (computerChoice === "Spock") ? "You Win!" : "You Lose!";
                break;
            case "Scissors":
                results = (computerChoice === "Paper") ? "You Win!" : "You Lose!";
                results = (computerChoice === "Lizard") ? "You Win!" : "You Lose!";
                break;
            case "Lizard":
                results = (computerChoice === "Paper") ? "You Win!" : "You Lose!";
                results = (computerChoice === "Spock") ? "You Win!" : "You Lose!";
                break;
            case "Spock":
                results = (computerChoice === "Scissors") ? "You Win!" : "You Lose!";
                results = (computerChoice === "Rock") ? "You Win!" : "You Lose!";
                break;
        }
    }
    /**
     * Displaying Player choise and computer random choice on website 
     * Displaying score board for player and computer of winnings
     */
    playerView.textContent = `Player: ${playerChoice}`;
    comView.textContent = `Computer: ${computerChoice}`;
    resultsView.textContent = results;

    resultsView.classList.remove("greenText", "redText");

    switch (results) {
        case "You Win!":
            resultsView.classList.add("greenText");
            playerScore++;
            playerScoreView.textContent = playerScore;
            break;
        case "You Lose!":
            resultsView.classList.add("redText");
            computerScore++;
            computerScoreView.textContent = computerScore;
            break;
    }
}