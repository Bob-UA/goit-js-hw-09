const startBtn = document.querySelector('[data-start]');
const stopBtn = document.querySelector('[data-stop]');
stopBtn.disabled = true;
let intervalId = "";

function onHandleStartBtn() {
   intervalId = setInterval(() => {
          const color = getRandomHexColor(); 
          document.querySelector('body').style.backgroundColor = `${color}`;
      }, 1000);
      startBtn.disabled = true;
    stopBtn.disabled = false;
    return intervalId;
};

function onHandleStopBtn() {
    clearInterval(intervalId);
    startBtn.disabled = false;
    stopBtn.disabled = true;
};


function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}

startBtn.addEventListener("click", onHandleStartBtn)
stopBtn.addEventListener('click', onHandleStopBtn);