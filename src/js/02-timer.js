import flatpickr from 'flatpickr';
import Notiflix from 'notiflix';
import 'flatpickr/dist/flatpickr.min.css';

const startBtn = document.querySelector('[data-start]');
startBtn.disabled = true;
let timerStatus = "";


refs = {
  days: document.querySelector('[data-days]'),
  hours: document.querySelector('[data-hours]'),
  minutes: document.querySelector('[data-minutes]'),
  seconds: document.querySelector('[data-seconds]'),
}


const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (timerStatus) {
      return
    }
    if (selectedDates[0].getTime() < Date.now()) {
      Notiflix.Notify.failure('Please choose a date in the future');
      return; 
    }
    startBtn.disabled = false;
    localStorage.setItem('selectedTime', selectedDates[0].getTime());
    timerStatus = 1;
  
  },
};

function timer() {
      const chosenTime = JSON.parse(localStorage.getItem('selectedTime'));
  setInterval(() => {
    const currentTime = (Date.now());
    const deltaTime = chosenTime - currentTime;

    if (deltaTime <= 0) {
      return;
    };

    const { days, hours, minutes, seconds } = convertMs(deltaTime);

    refs.days.textContent = addLeadingZero(JSON.stringify(days));
    
    refs.hours.textContent = addLeadingZero(JSON.stringify(hours));;
    
    refs.minutes.textContent = addLeadingZero(JSON.stringify(minutes));;
    
    refs.seconds.textContent = addLeadingZero(JSON.stringify(seconds));;
    
  }, 1000)
  startBtn.disabled = true;
}

function addLeadingZero(value) {
  return value.padStart(2, "0");
};

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

startBtn.addEventListener('click', timer);


flatpickr('#datetime-picker', options);