
import Notiflix from 'notiflix';

const form = document.querySelector("form");
const formData = {};


function createPromise(position, delay) {
  const promise = new Promise((resolve, rejected) => {
    const shouldResolve = Math.random() > 0.3;
    if (shouldResolve) {
      resolve(`✅ Fulfilled promise ${position} in ${delay}ms`)
    } else
    {
      rejected(`❌ Rejected promise ${position} in ${delay}ms`)
    }
  })
  promise.then(result => {
      Notiflix.Notify.success(result);
  },
    error => {
    Notiflix.Notify.failure(error);
    }
  );
};


function handleSubmit(e) {
  e.preventDefault();

  const getItems = JSON.parse(localStorage.getItem('formData'));
  let position = 1;
  
  setTimeout(() => {
    if (+getItems.amount<1) {
      return
    }

    createPromise(position, getItems.delay);
    if (getItems.amount <= 1) {
      return
    }

    const intervalId = setInterval(() => {
      position += 1;

      createPromise(position, getItems.step);

      if (+getItems.amount === position) {
        clearInterval(intervalId);
      }
    }, formData.step);
  }, formData.delay);
}

function onInputCreate(e) {
  formData[e.target.name] = e.target.value;

  localStorage.setItem('formData', JSON.stringify(formData));
};

form.addEventListener('submit', handleSubmit);
form.addEventListener('input', onInputCreate);