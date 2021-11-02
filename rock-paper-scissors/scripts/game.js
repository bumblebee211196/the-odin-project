const BULBASAUR = "Bulbasaur";
const CHARMANDER = "Charmander";
const SQUIRTLE = "Squirtle";
const ELEMENTS = [BULBASAUR, CHARMANDER , SQUIRTLE]
const ROUNDS = 5;
const BATTLE = "battle";

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
    message = `"${player}" defeats "${computer}". You won the round!.`;
  } else if (result === -1) {
    computerScore++;
    message = `"${computer}" defeats "${player}". You lost the round!.`;
  } else {
    message = `It's a tie.`;
  }
  console.log(message);
  document.getElementById("message2").innerHTML = message;
  document.getElementById("playerScore").innerHTML = playerScore;
  document.getElementById("computerScore").innerHTML = computerScore;
  if (playerScore == ROUNDS) {
    document.getElementById("message2").innerHTML = "Player wins the battle!.";
    playerScore = computerScore = 0;
    resetGame(BATTLE);
  } else if (computerScore == ROUNDS) {
    document.getElementById("message2").innerHTML = "Computer wins the battle!.";
    playerScore = computerScore = 0;
    resetGame(BATTLE);
  }
  console.log(playerScore, computerScore);
}

function resetGame(message) {
  document.getElementById("message1").innerHTML = "";
  document.getElementById("playerScore").innerHTML = 0;
  document.getElementById("computerScore").innerHTML = 0;
  if (message === undefined) {
    document.getElementById("message2").innerHTML = "";
  }
}

const bulbasaur = document.querySelector(".grass");
const charmander = document.querySelector(".fire");
const squirtle = document.querySelector(".water");
const battleAgain = document.querySelector(".battle-again");

bulbasaur.addEventListener("click", () => game(BULBASAUR));
charmander.addEventListener("click", () => game(CHARMANDER));
squirtle.addEventListener("click", () => game(SQUIRTLE));
battleAgain.addEventListener("click", () => resetGame());
