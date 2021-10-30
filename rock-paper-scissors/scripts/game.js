const BULBASAUR = "Bulbasaur";
const CHARMANDER = "Charmander";
const SQUIRTLE = "Squirtle";
const ELEMENTS = [BULBASAUR, CHARMANDER , SQUIRTLE]
const ROUNDS = 5;

let playerScore = 0;
let computerScore = 0;

function getRandomElement() {
  return ELEMENTS[Math.floor(Math.random() * 3)];
}

function round(player, computer) {
  if ((player === CHARMANDER && computer === BULBASAUR) || (player === BULBASAUR && computer === SQUIRTLE) || (player === SQUIRTLE && computer === CHARMANDER)) {
    return 1;
  } else if ((computer === CHARMANDER && player === BULBASAUR) || (computer === BULBASAUR && player === SQUIRTLE) || (computer === SQUIRTLE && player === CHARMANDER)) {
    return -1;
  } else {
    return 0;
  }
}

function game(player) {
  let computer = getRandomElement();
  document.getElementById("message1").innerHTML = `You chose "${player}" and the Computer chose "${computer}"`;
  let message = "";
  let result = round(player, computer);
  if (result === 1) {
    playerScore++;
    message = `You won the round!. "${player}" defeats "${computer}"`;
  } else if (result === -1) {
    computerScore++;
    message = `You lost the round!. "${computer}" defeats "${player}"`;
  } else {
    message = `It's a tie.`;
  }
  console.log(message);
  document.getElementById("message2").innerHTML = message;
  document.getElementById("playerScore").innerHTML = playerScore;
  document.getElementById("computerScore").innerHTML = computerScore;
  if (playerScore == ROUNDS) {
    document.getElementById("message2").innerHTML = "You won the battle!.";
    playerScore = computerScore = 0;
    resetGame();
  } else if (computerScore == ROUNDS) {
    document.getElementById("message2").innerHTML = "You lost the battle!.";
    playerScore = computerScore = 0;
    resetGame();
  }
  console.log(playerScore, computerScore);
}

function resetGame() {
  document.getElementById("message1").innerHTML = "";
  // document.getElementById("message2").innerHTML = "";
  document.getElementById("playerScore").innerHTML = 0;
  document.getElementById("computerScore").innerHTML = 0;
}