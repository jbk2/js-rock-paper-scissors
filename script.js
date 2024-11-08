document.addEventListener('DOMContentLoaded', () => {
  let humanScore = 0, computerScore = 0, roundNumber = 0, humanChoice, computerChoice, roundsInGame, winner;
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
  gameResult = document.getElementById('game-result');
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
    launchConfetti();
    roundsInGame = event.currentTarget.dataset['rounds'];
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

  function updateGameOutcome() {
    if (humanScore > computerScore) {
      updateHtml(gameResult, `Human Wins - ${humanScore}:${computerScore}`);
      launchConfetti();
    } else if (humanScore < computerScore) {
      updateHtml(gameResult, `Computer Wins - ${computerScore}:${humanScore}`);
      launchConfetti();
    } else {
      updateHtml(gameResult, "It's a draw");
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
      updateHtml(roundNumberEl, `${roundNumber}`);
      updateHtml(instructions, "Your turn - click your choice");
      await playRound();
    };

    updateGameOutcome();
    updateHtml(instructions, "Game over! Click the button to play again.");
    let playAgnBtn = document.createElement('button');
    playAgnBtn.id = "play-btn"
    playAgnBtn.textContent = "Play again"
    instructions.insertAdjacentElement('afterend', playAgnBtn)
    playAgnBtn.addEventListener('click', () => location.reload(true));
  };

  roundButtons.forEach((button) => {
    button.addEventListener('click', setRoundsPlayGame);
  });

  // document.startViewTransition(() => playGame());

  // Write game win logic and update
  // Write next game logic 
});

function launchConfetti() {
  const confettiContainer = document.querySelector('.confetti-container');
  confettiContainer.innerHTML = ''; // Clear previous confetti

  const confettiCount = 100;

  for (let i = 0; i < confettiCount; i++) {
    const confetti = document.createElement('div');
    confetti.classList.add('confetti-piece');
    
    // Random horizontal position and slight staggered delay
    confetti.style.left = `${Math.random() * 100}vw`;
    confetti.style.top = `${Math.random() * -120 - 30}vh`; // Start well above the viewport
    confetti.style.animationDelay = `${Math.random() * 0.5}s`;

    confettiContainer.appendChild(confetti);
  }
}
