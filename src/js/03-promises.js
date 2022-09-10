import Notiflix from 'notiflix';
const formElem = document.querySelector('.form');
formElem.addEventListener('submit', e => {
  e.preventDefault();
  let delay = Number(formElem.delay.value);
  const amount = Number(formElem.amount.value);
  const step = Number(formElem.step.value);

  for (let i = 1; i <= amount; i += 1) {
    createPromise(i, delay)
      .then(result => Notiflix.Notify.success(result))
      .catch(error => Notiflix.Notify.failure(error));

    delay += step;
    let delays;
  }
});
function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    setTimeout(() => {
      if (shouldResolve) {
        resolve(`✅ Fulfilled promise ${position} in ${delay}ms`);
      }
      reject(`❌ Rejected promise ${position} in ${delay}ms`);
    }, delay);
  });
}
