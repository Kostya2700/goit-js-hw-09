import Notiflix from 'notiflix';
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
const refs = {
  inputElem: document.querySelector('input#datetime-picker'),
  startElem: document.querySelector('button[data-start]'),
  daysElem: document.querySelector('span[data-days]'),
  hoursElem: document.querySelector('span[data-hours]'),
  minutesElem: document.querySelector('span[data-minutes]'),
  secondsElem: document.querySelector('span[data-seconds]'),
};
let goalDate;
let timerId = null;
refs.startElem.disabled = true;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (timerId) {
      Notiflix.Notify.warning('будь ласка, оновіть сторінку');
      return;
    }
    if (Date.now() > selectedDates[0]) {
      Notiflix.Notify.failure(
        'ще не придумали машину часу, вибіріть дату в майбутньому'
      );
      return;
    }
    console.log(selectedDates[0]);
    goalDate = selectedDates[0];
  },
  onChange(selectedDates) {
    if (Date.now() > selectedDates[0]) {
      const day = Date.now();
      refs.startElem.disabled = true;

      Notiflix.Notify.failure(
        'ще не придумали машину часу, вибіріть дату в майбутньому'
      );
    } else if (Date.now() < selectedDates[0]) {
      refs.startElem.disabled = false;
    }
  },
};
flatpickr(refs.inputElem, options);

refs.startElem.addEventListener('click', () => {
  startTimer();
  refs.startElem.disabled = true;
});

function startTimer() {
  Notiflix.Notify.success('відлік почався');
  timerId = setInterval(() => {
    const difTime = goalDate - Date.now();
    const { days, hours, minutes, seconds } = convertMs(difTime);
    refs.daysElem.textContent = addLeadingZero(days);
    refs.hoursElem.textContent = addLeadingZero(hours);
    refs.minutesElem.textContent = addLeadingZero(minutes);
    refs.secondsElem.textContent = addLeadingZero(seconds);

    if (days === 0 && hours === 0 && minutes === 0 && seconds === 0) {
      clearInterval(timerId);
      refs.startElem.disabled = false;
      Notiflix.Notify.info('час сі скінчив');
      timerId = null;
    }
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

// // console.log(convertMs(2000)); {days: 0, hours: 0, minutes: 0, seconds: 2}
// // console.log(convertMs(140000)); {days: 0, hours: 0, minutes: 2, seconds: 20}
// // console.log(convertMs(24140000)); {days: 0, hours: 6 minutes: 42, seconds: 20}
function addLeadingZero(value) {
  return value.toString().padStart(2, '0');
}
