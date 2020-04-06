const playButton = document.querySelectorAll('.player__button');
const sliders = document.querySelectorAll('.player__slider');
const progressBar = document.querySelector('.progress');
const progressBarLength = window.getComputedStyle(progressBar).flexBasis.split("%")[0]
const progressFilled = document.querySelector('.progress__filled');
const video = document.querySelector('.viewer');
const mouseIsDown = false

const updateProgress = () => {
  const videoLength = video.duration;
  progressFilled.style.flexBasis = ((video.currentTime / videoLength) * progressBarLength) + "%"
}

const playControl = (e) => {
  if (!e.target.dataset.skip) {
    if (video.paused) {
      video.play();
      e.target.innerHTML = "&#9613;&#9613;"
    } else {
      video.pause();
      e.target.innerHTML = "►"
    }
  } else {
    video.currentTime += Number(e.target.dataset.skip)
  }
};

const adjust = (e) => {
  if (e.target.name === "volume") {
    video.volume = e.target.value;
  } else {
    video.playbackRate = e.target.value;
  }
}

const seekPosition = (e) => {
  const videoLength = video.duration;
  video.currentTime = (e.offsetX / progressBar.offsetWidth) * videoLength;
  updateProgress;
}

video.addEventListener('click', playControl);
playButton.forEach((button) => button.addEventListener('click', playControl));
sliders.forEach((slider) => slider.addEventListener('click', adjust));
setInterval(updateProgress, 100)
progressBar.addEventListener('click', seekPosition);
