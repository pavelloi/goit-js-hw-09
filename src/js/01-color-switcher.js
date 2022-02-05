const startBtn = document.querySelector("button[data-start]");
const stopBtn = document.querySelector("button[data-stop]");
let timerId = null;
stopBtn.setAttribute("disabled", "disabled")

const onStartClick = () => {
    timerId = setInterval(() => {
        document.body.style.backgroundColor = getRandomHexColor();
    }, 1000);
    
    startBtn.setAttribute("disabled", "disabled")
    stopBtn.removeAttribute("disabled", "disabled")
};

const onStopClick = () => {
    clearInterval(timerId);
    startBtn.removeAttribute("disabled", "disabled");
    stopBtn.setAttribute("disabled", "disabled")
};

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
};

startBtn.addEventListener("click", onStartClick);
stopBtn.addEventListener("click", onStopClick);