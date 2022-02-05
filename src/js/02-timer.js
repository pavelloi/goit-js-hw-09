import flatpickr from "flatpickr";
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const dateInput = document.querySelector("#datetime-picker")
const startBtn = document.querySelector("button[data-start]")
const timerValue = document.querySelectorAll(".value")
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
    onClose(selectedDates) {
        if (selectedDates[0] < Date.now()) {
            Notiflix.Report.failure(`Please choose a date in the future`);
            startBtn.setAttribute("disabled", "disabled");
        } else {
            startBtn.removeAttribute("disabled", "disabled");
            refTime = selectedDates[0] - Date.now();
        }
    console.log(selectedDates[0]);
  },
};

let timerId = null;
let refTime = null;

startBtn.setAttribute("disabled", "disabled");

flatpickr(dateInput, options);

startBtn.addEventListener("click", startToCountdown);

function startToCountdown() {
    timerId = setInterval(() => {
        if (refTime >= 1000) {
            refTime -= 1000;
            convertMs(refTime);
        } else {
            clearInterval(timerId);
        }
    }, 1000);

    startBtn.setAttribute("disabled", "disabled");
}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = addLeadingZeroForDays(Math.floor(ms / day));
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  const seconds = addLeadingZero(Math.floor((((ms % day) % hour) % minute) / second));
    // не совсем понял комментарий по-поводу конкретно помещать минуты в минуты и тд. 
    // timerValue[2].textContent = addLeadingZero(minutes);
    // типа чтобы тут было ...textContent = minutes, то есть минуты = минуты без вызова функции???
    // я перенёс вызов функций наверх. Но опять же, может я неправильно понял.
    timerValue[0].textContent = days;
    timerValue[1].textContent = hours;
    timerValue[2].textContent = minutes;
    timerValue[3].textContent = seconds;

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
    return String(value).padStart(2, "0");
}

function addLeadingZeroForDays(value) {
    return String(value).padStart(3, "0");
}