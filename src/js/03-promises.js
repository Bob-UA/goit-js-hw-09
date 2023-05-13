
import Notiflix from 'notiflix';

const form = document.querySelector("form");


function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const shouldResolve = Math.random() > 0.3;
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay)
  });
}


function handleSubmit(e) {
  e.preventDefault();
  
  let delay = +e.target.delay.value;
  const step = +e.target.step.value;
  const amount = e.target.amount.value;

  for (let i = 1; i <= amount; i++) {
    createPromise(i, delay)
      .then(({ position, delay }) => {
        Notiflix.Notify.success(
          `✅ Fulfilled promise ${position} in ${delay}ms`
        );
      })
      .catch(({ position, delay }) => {
        Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
      });
    delay += step;
  }
  e.currentTarget.reset();
};



form.addEventListener('submit', handleSubmit);