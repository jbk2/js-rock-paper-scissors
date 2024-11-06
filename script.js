const choices = ['rock', 'paper', 'scissors'];
let humanScore = 0;
let computerScore = 0;

function getRandom() {
  return Math.floor(Math.random() * choices.length);
};

function getComputerChoice() {
  return choices[getRandom()];
}

function getHumanChoice() {
  choice = prompt("1 for rock, 2 for paper, 3 for scissors. What's your choice?")
  switch (choice) {
    case '1':
      return 'rock';
    case '2':
      return 'paper';
    case '3':
      return 'scissors';
  }
}

function roundOutcome(humanChoice, computerChoice) { 
  if (humanChoice === computerChoice) {
    return `Human played; ${humanChoice}, computer also played; ${computerChoice}, it was a draw, play again`
  };
  
  switch (humanChoice) {
    case 'rock':
      switch (computerChoice) {
        case 'paper':
          computerScore++;
          return "Computer Wins";
        case 'scissors':
          humanScore++;
          return "Human Wins";
      }
      break;
    case 'paper':
      switch (computerChoice) {
        case 'rock':
          humanScore++;
          return "Human Wins";
        case 'scissors':
          computerScore++;
          return "Computer Wins";
      }
      break;
    case 'scissors':
      switch (computerChoice) {
        case 'rock':
          computerScore++;
          return "Computer Wins";
        case 'paper':
          humanScore++;
          return "Human Wins";
      }
      break;
  }
};

function playRound() {
  let humanChoice = getHumanChoice();
  let computerChoice = getComputerChoice();
  let result = roundOutcome(humanChoice, computerChoice);
  console.log(result);
  return result;
}

function playGame() {
  for(let i = 1; i < 6; i++) {
    playRound()
  }
  console.log(`human score is- ${humanScore}, computer score is ${computerScore}`);
}

playGame();