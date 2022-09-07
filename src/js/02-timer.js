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

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    Notiflix.Notify.success(
      `Все супер таймер запущено, таймер зупиниться в  ${selectedDates}`
    );
  },
  onOpen() {
    Notiflix.Notify.info('Будь ласка, виберіть дату');
  },
  minDate: 'today',
};
flatpickr(refs.inputElem, options);
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

// console.log(convertMs(2000)); {days: 0, hours: 0, minutes: 0, seconds: 2}
// console.log(convertMs(140000)); {days: 0, hours: 0, minutes: 2, seconds: 20}
// console.log(convertMs(24140000)); {days: 0, hours: 6 minutes: 42, seconds: 20}
function addLeadingZero(value) {
  return value.toString().padStart(2, '0');
}
// refs.startElem.addEventListener('click', () => {
//   Notiflix.Notify.success('Все добре');

//   Notiflix.Notify.failure('Все дуже погано');

//   Notiflix.Notify.warning('Уважно передивись код');

//   Notiflix.Notify.info('Інформація');
// });
