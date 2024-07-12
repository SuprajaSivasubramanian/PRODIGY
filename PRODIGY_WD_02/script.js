// script.js
let startTime, updatedTime, difference;
let interval;
let running = false;

const display = document.getElementById('display');
const startButton = document.getElementById('start');
const pauseButton = document.getElementById('pause');
const resetButton = document.getElementById('reset');
const lapButton = document.getElementById('lap');
const lapTimes = document.getElementById('lapTimes');

startButton.addEventListener('click', startStopwatch);
pauseButton.addEventListener('click', pauseStopwatch);
resetButton.addEventListener('click', resetStopwatch);
lapButton.addEventListener('click', recordLap);

function startStopwatch() {
    if (!running) {
        startTime = new Date().getTime() - (difference || 0);
        interval = setInterval(updateDisplay, 10);
        running = true;
    }
}

function pauseStopwatch() {
    if (running) {
        clearInterval(interval);
        difference = new Date().getTime() - startTime;
        running = false;
    }
}

function resetStopwatch() {
    clearInterval(interval);
    display.innerText = '00:00:00.00';
    difference = 0;
    running = false;
    lapTimes.innerHTML = '';
}

function updateDisplay() {
    updatedTime = new Date().getTime();
    difference = updatedTime - startTime;

    const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);
    const milliseconds = Math.floor((difference % 1000) / 10);

    display.innerText = `${pad(hours)}:${pad(minutes)}:${pad(seconds)}.${pad(milliseconds, 2)}`;
}

function pad(number, digits = 2) {
    return number.toString().padStart(digits, '0');
}

function recordLap() {
    if (running) {
        const lapItem = document.createElement('li');
        lapItem.innerText = display.innerText;
        lapTimes.appendChild(lapItem);
    }
}
