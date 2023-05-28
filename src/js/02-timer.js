import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import Notiflix from "notiflix";

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const selectedDate = selectedDates[0];
    const currentDate = new Date();
    if (selectedDate < currentDate) {
      Notiflix.Report.failure('Error', 'Please choose a date in the future');
      return;
    }
    const startButton = document.querySelector('[data-start]');
    startButton.disabled = false;
  },
};

flatpickr('#datetime-picker', options);

const startButton = document.querySelector('[data-start]');
startButton.addEventListener('click', startTimer);

function startTimer() {
  const selectedDate = flatpickr.parseDate(document.querySelector('#datetime-picker').value, 'Y-m-d H:i');
  const currentDate = new Date();
  if (selectedDate <= currentDate) {
    Notiflix.Report.failure('Error', 'Please choose a date in the future');
    return;
  }

  const timerElements = {
    days: document.querySelector('[data-days]'),
    hours: document.querySelector('[data-hours]'),
    minutes: document.querySelector('[data-minutes]'),
    seconds: document.querySelector('[data-seconds]'),
  };

  startButton.disabled = true;

  const timerInterval = setInterval(() => {
    const timeLeft = selectedDate.getTime() - new Date().getTime();
    if (timeLeft <= 0) {
      clearInterval(timerInterval);
      Object.values(timerElements).forEach(element => {
        element.textContent = '00';
      });
      return;
    }

    const { days, hours, minutes, seconds } = convertMs(timeLeft);
    timerElements.days.textContent = addLeadingZero(days);
    timerElements.hours.textContent = addLeadingZero(hours);
    timerElements.minutes.textContent = addLeadingZero(minutes);
    timerElements.seconds.textContent = addLeadingZero(seconds);
  }, 1000);
}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return value.toString().padStart(2, '0');
}

