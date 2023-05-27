
  // Підключення бібліотеки Notiflix
  Notiflix = require('notiflix');

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

    const firstDelay = Number(this.elements.delay.value);
    const step = Number(this.elements.step.value);
    const amount = Number(this.elements.amount.value);

    let delay = firstDelay;

    for (let i = 1; i <= amount; i++) {
      createPromise(i, delay)
        .then(({ position, delay }) => {
          Notiflix.Notify.Success(`✅ Fulfilled promise ${position} in ${delay}ms`);
        })
        .catch(({ position, delay }) => {
          Notiflix.Notify.Failure(`❌ Rejected promise ${position} in ${delay}ms`);
        });

      delay += step;
    }
  });

