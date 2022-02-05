import { Notify } from 'notiflix/build/notiflix-notify-aio';

const FORM = document.querySelector(".form");
const startPromiseBtn = document.querySelector("button[type=submit]");

let promiseValue = {};

startPromiseBtn.addEventListener('click', promiseToSubmit);
FORM.addEventListener("input", receiveFormData)

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
    createPromise(i, DELAY)
      .then(card => {
        Notify.success(`✅ Fulfilled promise ${card.position} in ${card.delay}ms`);
      })
      .catch(card => {
        Notify.failure(`❌ Rejected promise ${card.position} in ${card.delay}ms`);
      });
  }
}

