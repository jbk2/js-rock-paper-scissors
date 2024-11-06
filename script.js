document.addEventListener('DOMContentLoaded', () => {

  const choices = ['rock', 'paper', 'scissors'];
  let humanScore = 0;
  let computerScore = 0;
  let humanChoice, computerChoice;
  const humanChoiceCell = document.getElementById('human-choice');
  const humanScoreEl = document.getElementById('human-score');
  const computerChoiceCell = document.getElementById('computer-choice');
  const computerScoreEl = document.getElementById('computer-score');
  const instructions = document.getElementById('instructions');


  function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  function getRandom() {
    return Math.floor(Math.random() * choices.length);
  };

  async function getComputerChoice() {
    await delay(800);
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

  // function playRound() {
  //   let humanChoice = getHumanChoice();
  //   let computerChoice = getComputerChoice();
  //   let result = roundOutcome(humanChoice, computerChoice);
  //   console.log(result);
  //   return result;
  // }

  function updateHtml(element, text) {
    element.innerHTML = text;
  }

  // function playGame() {
  //   for(let i = 1; i < 6; i++) {
  //     playRound()
  //   }
  //   console.log(`human score is- ${humanScore}, computer score is ${computerScore}`);
  // }

  const buttons = document.querySelectorAll('.btn');

  function playRound() {
    buttons.forEach(button => {
      button.addEventListener('click', async (event) => {
        humanChoice = event.currentTarget.id;
        updateHtml(humanChoiceCell,`${humanChoice}`)
        // update instructions
        updateHtml(instructions, 'now the computer will make a choice');
        computerChoice = await getComputerChoice();
        updateHtml(computerChoiceCell, `${computerChoice}`);
        updateHtml(instructions, `computer chose ${computerChoice}, you chose ${humanChoice}`);
        roundResult = roundOutcome(humanChoice, computerChoice);
        await delay(500);
        
        
        updateHtml(instructions, roundResult);
        updateHtml(humanScoreEl, humanScore);
        updateHtml(computerScoreEl, computerScore);
        await delay(900);
        updateHtml(instructions, "Your turn - click your choice");
        updateHtml(humanChoiceCell, "");
        updateHtml(computerChoiceCell, "");
      })
    });
  };

  playRound();

});