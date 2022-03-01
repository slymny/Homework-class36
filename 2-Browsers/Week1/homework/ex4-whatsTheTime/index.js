'use strict';
/*------------------------------------------------------------------------------
Full description at: https://github.com/HackYourFuture/Homework/tree/main/2-Browsers/Week1#exercise-4-whats-the-time

1. Inside the `index.js`, complete the `addCurrentTime` to add the current time 
  to the webpage. Make sure it's written in the HH:MM:SS notation (hour, minute,
  second). Use `setInterval()` to make sure the time stays current.
2. Have the function execute when it's loading in the browser.
------------------------------------------------------------------------------*/
const timeBox = document.createElement('div');
document.body.appendChild(timeBox);
timeBox.style.backgroundColor = '#f4f4f4';
timeBox.style.width = '150px';
timeBox.style.textAlign = 'center';
timeBox.style.fontSize = '30px';

function addCurrentTime() {
  setInterval(() => {
    const today = new Date();
    const currentTime = today.toLocaleTimeString();
    timeBox.textContent = currentTime;
    console.log(currentTime);
  }, 1000);
}

window.addEventListener('DOMContentLoaded', addCurrentTime);
