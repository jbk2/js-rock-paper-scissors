document.addEventListener('DOMContentLoaded', () => {
  let humanScore = 0, computerScore = 0, roundNumber = 0, humanChoice, computerChoice, roundsInGame;
  const choices = ['rock', 'paper', 'scissors'],
  humanChoiceCell = document.getElementById('human-choice'),
  humanScoreEl = document.getElementById('human-score'),
  computerChoiceCell = document.getElementById('computer-choice'),
  computerScoreEl = document.getElementById('computer-score'),
  instructions = document.getElementById('instructions'),
  dialogModal = document.querySelector('dialog');
  iconButtons = document.querySelectorAll('.icon-btn'),
  roundButtons = document.querySelectorAll('.round-btn');
  roundNumberEl = document.getElementById('round-number');
  gameResult = document.querySelector('dialog');
  console.log(dialogModal);
  
  function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
  
  function updateHtml(element, text) {
    element.innerHTML = text;
  }

  function getRandom() {
    return Math.floor(Math.random() * choices.length);
  };

  async function getComputerChoice() {
    await delay(800);
    return choices[getRandom()];
  }

  function setRoundsPlayGame(event) {
    roundsInGame = event.currentTarget.dataset['name'];
    dialogModal.close();
    playGame();
  };

  function roundOutcome(humanChoice, computerChoice) { 
    if (humanChoice === computerChoice) {
      return `Human played; ${humanChoice}, computer also played; ${computerChoice}, it was a draw, play again`
    };
    
    switch (humanChoice) {
      case 'rock':
        return computerChoice === 'paper' ? (computerScore++, "Computer Wins") : (humanScore++, "Human Wins");
      case 'paper':
        return computerChoice === 'scissors' ? (computerScore++, "Computer Wins") : (humanScore++, "Human Wins");
      case 'scissors':
        return computerChoice === 'rock' ? (computerScore++, "Computer Wins") : (humanScore++, "Human Wins");
    }
  };


  async function handleIconClick(event, resolve) {
    if ( roundNumber > roundsInGame) return;
    
    humanChoice = event.currentTarget.id;
    button = event.currentTarget;
    
    button.classList.add("animated");
    setTimeout(() => button.classList.remove("animated"), 200); 
    
    updateHtml(humanChoiceCell,`${humanChoice}`); updateHtml(instructions, 'now the computer will make a choice');
    computerChoice = await getComputerChoice();
    
    updateHtml(computerChoiceCell, `${computerChoice}`); updateHtml(instructions, `computer chose ${computerChoice}, you chose ${humanChoice}`);
    roundResult = roundOutcome(humanChoice, computerChoice);
    
    await delay(500);
    
    updateHtml(instructions, roundResult); updateHtml(humanScoreEl, humanScore); updateHtml(computerScoreEl, computerScore);
    await delay(900);
    
    updateHtml(instructions, "Your turn - click your choice"); updateHtml(humanChoiceCell, ""); updateHtml(computerChoiceCell, "");
    resolve();
  }

  // variable to hold icon-button click event listener, so that
  // it can be effectively identified and removed once click is handled.
  let playRoundResolver;
  
  function playRound() {
    return new Promise((resolve) => {
      playRoundResolver = (event) => {
        handleIconClick(event, resolve);
        iconButtons.forEach(button => button.removeEventListener('click', playRoundResolver));
      };
      // Add event listeners for this round
      iconButtons.forEach(button => button.addEventListener('click', playRoundResolver));
    });
  };

  async function playGame() {
    roundNumber = 0;
    while (roundNumber < roundsInGame) {
      roundNumber++;
      updateHtml(roundNumberEl, `Round# - ${roundNumber}`);
      await playRound();
      updateHtml(instructions, "Game over! Click a round button to play again.");
    };
  };

  roundButtons.forEach((button) => {
    button.addEventListener('click', setRoundsPlayGame);
  });

  // document.startViewTransition(() => playGame());

  // Write game win logic and update
  // Write next game logic 
});