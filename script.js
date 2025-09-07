let startTime = 0;
let elapsedTime = 0;
let timerInterval;
let laps = [];

const display = document.getElementById('display');
const startBtn = document.getElementById('start');
const pauseBtn = document.getElementById('pause');
const resetBtn = document.getElementById('reset');
const lapBtn = document.getElementById('lap');
const lapsList = document.getElementById('laps');

function formatTime(ms) {
  const date = new Date(ms);
  const min = String(date.getUTCMinutes()).padStart(2, '0');
  const sec = String(date.getUTCSeconds()).padStart(2, '0');
  const msStr = String(Math.floor(date.getUTCMilliseconds() / 10)).padStart(2, '0');
  return `${min}:${sec}.${msStr}`;
}

function updateDisplay() {
  display.textContent = formatTime(elapsedTime);
}

function startTimer() {
  if (!timerInterval) {
    startTime = Date.now() - elapsedTime;
    timerInterval = setInterval(() => {
      elapsedTime = Date.now() - startTime;
      updateDisplay();
    }, 10);
  }
}

function pauseTimer() {
  clearInterval(timerInterval);
  timerInterval = null;
}

function resetTimer() {
  pauseTimer();
  elapsedTime = 0;
  laps = [];
  updateDisplay();
  renderLaps();
}

function addLap() {
  if (elapsedTime > 0) {
    // Prevent duplicate consecutive laps
    if (laps.length === 0 || laps[laps.length - 1] !== elapsedTime) {
      laps.push(elapsedTime);
      renderLaps();
    }
  }
}

function renderLaps() {
  lapsList.innerHTML = '';
  laps.forEach((lap, i) => {
    const li = document.createElement('li');
    li.textContent = `Lap ${i + 1}: ${formatTime(lap)}`;
    lapsList.appendChild(li);
  });
}

// Event listeners
startBtn.addEventListener('click', startTimer);
pauseBtn.addEventListener('click', pauseTimer);
resetBtn.addEventListener('click', resetTimer);
lapBtn.addEventListener('click', addLap);

// Initialize display
updateDisplay();
