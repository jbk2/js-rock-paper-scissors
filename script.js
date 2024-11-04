const choices = ['rock', 'paper', 'scissors'];
const humanScore = 0;
const computerScore = 0;

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
  switch (humanChoice) {
    case 'rock':
      switch (computerChoice) {
        case 'rock':
          return "draw";
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
        case 'paper':
          return "draw";
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
        case 'scissors':  
          return "draw";
      }
      break;
  }
};

console.log(getHumanChoice());