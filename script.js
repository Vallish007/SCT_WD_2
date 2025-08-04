let startTime = 0;
let elapsedTime = 0;
let timerInterval = null;
let isRunning = false;

const timeDisplay = document.getElementById("time ");
const lapsContainer = document.getElementById("laps");
const clickSound = document.getElementById("clickSound");

function formatTime(ms) {
  const hrs = String(Math.floor(ms / 3600000)).padStart(2, "0");
  const mins = String(Math.floor((ms % 3600000) / 60000)).padStart(2, "0");
  const secs = String(Math.floor((ms % 60000) / 1000)).padStart(2, "0");
  const hund = String(Math.floor((ms % 1000) / 10)).padStart(2, "0");
  return `${hrs}:${mins}:${secs}.${hund}`;
}

function startStopwatch() {
  if (!isRunning) {
    clickSound.play();
    startTime = Date.now() - elapsedTime;
    timerInterval = setInterval(() => {
      elapsedTime = Date.now() - startTime;
      timeDisplay.textContent = formatTime(elapsedTime);
    }, 10);
    isRunning = true;
  }
}

function pauseStopwatch() {
  if (isRunning) {
    clickSound.play();
    clearInterval(timerInterval);
    isRunning = false;
  }
}

function resetStopwatch() {
  clickSound.play();
  clearInterval(timerInterval);
  isRunning = false;
  elapsedTime = 0;
  timeDisplay.textContent = "00:00:00.00";
  lapsContainer.innerHTML = '<p class="no-laps">No laps recorded yet .</p>';
}

function recordLap() {
  if (!isRunning) return;
  clickSound.play();
  const lapTime = formatTime(elapsedTime);
  const lapElements = lapsContainer.querySelectorAll("p:not(.no-laps)");
  const lapNum = lapElements.length + 1;

  const lapElement = document.createElement("p");
  lapElement.textContent = `Lap ${lapNum}: ${lapTime}`;

  if (lapsContainer.querySelector(".no-laps")) {
    lapsContainer.innerHTML = "";
  }

  lapsContainer.prepend(lapElement);
}

function toggleTheme() {
  document.body.classList.toggle("light");
}
