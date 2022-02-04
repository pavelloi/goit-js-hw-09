const startBtn = document.querySelector("button[data-start]");
const stopBtn = document.querySelector("button[data-stop]");

const onStartClick = () => {
    timerId = setInterval(() => {
        document.body.style.backgroundColor = getRandomHexColor();
    }, 1000);
    startBtn.setAttribute("disabled", "disabled")
};

const onStopClick = () => {
    clearInterval(timerId);
    startBtn.removeAttribute("disabled", "disabled");
};

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
};

startBtn.addEventListener("click", onStartClick);
stopBtn.addEventListener("click", onStopClick);