var holes = document.querySelectorAll('.hole');
var scoreBoard = document.querySelector('.score');
var moles = document.querySelectorAll('.mole');
var startButton = document.getElementById('startButton');
var lastHole;
var timeUp = false;
var score = 0;
var timeLeft = 20;
var gameRunning = false;
var backgroundMusic = document.getElementById('backgroundMusic'); 
var user_name = document.getElementById('user_name');

function randomTime(min, max) {
  return Math.round(Math.random() * (max - min) + min);
}

function randomHole(holes) {
  const idx = Math.floor(Math.random() * holes.length);
  const hole = holes[idx];
  
  if (hole === lastHole) {
    return randomHole(holes);
  }
  
  lastHole = hole;
  return hole;
}

function poop() {
  const time = randomTime(200, 1000);
  const hole = randomHole(holes);
  hole.classList.add('up');
  setTimeout(() => {
    hole.classList.remove('up');
    if (!timeUp) poop();
  }, time);
}

function updateTimerDisplay() {
  const timeValue = document.querySelector('.time-value');
  timeValue.textContent = timeLeft;
}

function showGameOverModal() {
  const modal = document.getElementById('gameOverModal');
  const finalScoreSpan = document.getElementById('finalScore');
  const playAgainButton = document.getElementById('playAgainButton');
  
  finalScoreSpan.textContent = score;
  modal.style.display = 'block';
  user_name.textContent = localStorage.getItem('name');
  
  playAgainButton.addEventListener('click', () => {
    modal.style.display = 'none';
    timeLeft = 20;
    score = 0;
    updateTimerDisplay();
    scoreBoard.textContent = score;
    startGame();
  });
}

function startGame() {
  if (gameRunning) return;
  gameRunning = true;
  scoreBoard.textContent = 0;
  timeUp = false;
  score = 0;
  timeLeft = 20;
  updateTimerDisplay();
  poop();
  playBackgroundMusic(); 
  
  const timerInterval = setInterval(() => {
    timeLeft--;
    updateTimerDisplay();
    
    if (timeLeft <= 0) {
      clearInterval(timerInterval);
      timeUp = true;
      gameRunning = false;
      showGameOverModal();
    }
  }, 1000);
}

function bonk(e) {
  if (!e.isTrusted || timeUp) return;
  score++;
  scoreBoard.textContent = score;
  const mole = this.querySelector('.mole');
  mole.classList.add('up');
  setTimeout(() => {
    mole.classList.remove('up');
  }, 500);
}

moles.forEach(mole => mole.addEventListener('click', bonk));

startButton.addEventListener('click', () => {
  if (!gameRunning) {
    startButton.disabled = true;
    startGame();
  }
});


function playBackgroundMusic() {
  backgroundMusic.play();
}

window.onload = playBackgroundMusic;