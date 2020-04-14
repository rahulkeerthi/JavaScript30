const timerButtons = document.querySelectorAll(".timer__button");
const form = document.querySelector("#custom");
const timeLeft = document.querySelector(".display__time-left");
const endTime = document.querySelector(".display__end-time");
let timer;

const displayTimer = (time) => {
	timeLeft.innerText = "";
	let mins = Math.floor(time / 60);
	let secs = time % 60;
	let leadingZero = time % 60 < 10 ? "0" : "";
	timeLeft.innerText = `${mins}:${leadingZero}${secs}`;
};

function setTimer(e) {
  event.preventDefault();
	if (timer) {
		clearInterval(timer);
	}
	let time = this.dataset.time || e.target.firstElementChild.value * 60;
	displayTimer(time);
	timer = setInterval(() => {
		time > 0 ? time-- : clearInterval(this);
		displayTimer(time);
	}, 1000);
}

function setEndTime(e) {
	event.preventDefault();
	const timeInMs =
		this.dataset.time * 1000 || e.target.firstElementChild.value * 60000;
	const timeNowInMs = Date.now();
	const timeToStop = new Date(timeNowInMs + timeInMs);
	endTime.innerText = `Be back at ${timeToStop.toLocaleTimeString('en-US').substr(0, 4)}${(timeToStop.getHours() >= 12) ? "PM" : "AM"}`;
}

timerButtons.forEach((button) => {
	button.addEventListener("click", setTimer);
	button.addEventListener("click", setEndTime);
});

form.addEventListener("submit", setTimer);
form.addEventListener("submit", setEndTime);
