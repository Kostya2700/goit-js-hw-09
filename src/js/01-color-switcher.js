const startBtn = document.querySelector('button[data-start');
const stopBtn = document.querySelector('button[data-stop');
let timerId = null;
const bodyEl = document.querySelector('body');
stopBtn.setAttribute('disabled', true);
startBtn.addEventListener('click', () => {
  timerId = setInterval(() => {
    onBodyColor();
  }, 1000);
  stopBtn.removeAttribute('disabled');
  startBtn.setAttribute('disabled', true);
});

stopBtn.addEventListener('click', () => {
  clearInterval(timerId);
  startBtn.removeAttribute('disabled');
  stopBtn.setAttribute('disabled', true);
});
function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
const onBodyColor = () => {
  const colorRandom = getRandomHexColor();
  bodyEl.style.backgroundColor = colorRandom;
};
// startBtn.addEventListener('click', onBodyColor);
