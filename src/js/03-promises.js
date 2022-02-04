import Notiflix from 'notiflix';

const DELAY = document.querySelector("input[name = delay]");
const delayStep = document.querySelector("input[name = step]");
const delayQuantity = document.querySelector("input[name = amount]");
const startPromiseBtn = document.querySelector("button");

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  delayQuantity = position;
  position += 1;
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        resolve(`Fullfilled promise`);
      }
      reject('❌ Упс, у нас закончились продукты');
    }, delay);
  })
  
}

startPromiseBtn.addEventListener("click", createPromise);

// createPromise(2, 1500)
//   .then(({ position, delay }) => {
//     console.log(`✅ Fulfilled promise ${position} in ${delay}ms`);
//   })
//   .catch(({ position, delay }) => {
//     console.log(`❌ Rejected promise ${position} in ${delay}ms`);
//   });