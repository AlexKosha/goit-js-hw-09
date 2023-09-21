import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

const refs = {
  input: document.getElementById('datetime-picker'),
  btnStart: document.querySelector('[data-start]'),
  daysValue: document.querySelector('[data-days]'),
  hoursValue: document.querySelector('[data-hours]'),
  minutesValue: document.querySelector('[ data-minutes]'),
  secondsValue: document.querySelector('[data-seconds]'),
};

let currentTime = new Date();
let intervalId = null;
let isActive = false;
refs.btnStart.disabled = true;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] <= currentTime) {
      alert('Please choose a date in the future');
      return;
    }
    refs.btnStart.disabled = false;
    console.log(selectedDates[0]);
  },
};

flatpickr(refs.input, options);

refs.btnStart.addEventListener('click', onCountingBtn);

function onCountingBtn() {
  if (isActive) {
    return;
  }

  // console.log(1);

  isActive = true;
  const dateInput = refs.input.value;
  const targetDate = new Date(dateInput);

  intervalId = setInterval(() => {
    currentTime = Date.now();
    const timeDifference = targetDate - currentTime;

    if (timeDifference <= 0) {
      clearInterval(intervalId);
      return;
    }
    const timer = convertMs(timeDifference);
    updateTimerDisplay(timer.days, timer.hours, timer.minutes, timer.seconds);
  }, 1000);
}

function convertMs(ms) {
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

function updateTimerDisplay(days, hours, minutes, seconds) {
  refs.daysValue.textContent = addLeadingZero(days);
  refs.hoursValue.textContent = addLeadingZero(hours);
  refs.minutesValue.textContent = addLeadingZero(minutes);
  refs.secondsValue.textContent = addLeadingZero(seconds);
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}
