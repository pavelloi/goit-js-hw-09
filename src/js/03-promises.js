import Notiflix from 'notiflix';

const FORM = document.querySelector(".form");
const startPromiseBtn = document.querySelector("button[type='submit']");

let promiseValue = {};

startPromiseBtn.addEventListener("click", promiseToSubmit);
FORM.addEventListener("input", receiveFormData)

function receiveFormData(event) {
  promiseValue[event.target.name] = event.target.value;
  console.log(promiseValue);
};

function promiseToSubmit(event) {
  event.preventDefault();

  let DELAY = Number(promiseValue.delay);
  let delayStep = Number(promiseValue.step);
  let delayQuantity = Number(promiseValue.amount);

  for (let i = 1; i <= delayQuantity; i += 1) {
    if (i > 1) {
      DELAY += delayStep;
    }
  }
  createPromise(i, DELAY)
  .then(item => {
    Notify.success(`✅ Fulfilled promise ${item.position} in ${item.delay}ms`);
  })
  .catch(item => {
    Notify.failure(`❌ Rejected promise ${item.position} in ${item.delay}ms`);
  });
}

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay }) ;
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}