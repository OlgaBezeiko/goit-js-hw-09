
  // Підключення бібліотеки Notiflix
  const notiflix = require('notiflix');

  function createPromise(position, delay) {
    const shouldResolve = Math.random() > 0.3;
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (shouldResolve) {
          resolve({ position, delay });
        } else {
          reject({ position, delay });
        }
      }, delay);
    });
  }

  document.querySelector('.form').addEventListener('submit', function (event) {
    event.preventDefault();
    const delayInput = document.querySelector('input[name="delay"]');
    const stepInput = document.querySelector('input[name="step"]');
    const amountInput = document.querySelector('input[name="amount"]');
    const delay = parseInt(delayInput.value);
    const step = parseInt(stepInput.value);
    const amount = parseInt(amountInput.value);

    let currentDelay = delay;
    let currentStep = step;

    for (let i = 1; i <= amount; i++) {
      createPromise(i, currentDelay)
        .then(({ position, delay }) => {
          notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
        })
        .catch(({ position, delay }) => {
          notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
        });

      currentDelay += currentStep;
    }

    delayInput.value = '';
    stepInput.value = '';
    amountInput.value = '';
  })