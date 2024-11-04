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
  return choice;
}

function playRound(humanChoice, computerChoice) { 
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

console.log(getHumanChoice());