
function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0')}`;
  }
  
  document.addEventListener("DOMContentLoaded", function() {
    const startButton = document.querySelector('[data-start]');
    const stopButton = document.querySelector('[data-stop]');
    let intervalId;
  
    function startChangingColor() {
      startButton.disabled = true;
      stopButton.disabled = false;
  
      intervalId = setInterval(function() {
        document.body.style.backgroundColor = getRandomHexColor();
      }, 1000);
    }
  
    function stopChangingColor() {
      startButton.disabled = false;
      stopButton.disabled = true;
  
      clearInterval(intervalId);
    }
  
    startButton.addEventListener("click", startChangingColor);
    stopButton.addEventListener("click", stopChangingColor);
  });
  