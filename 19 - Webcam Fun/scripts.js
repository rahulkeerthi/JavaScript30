const video = document.querySelector('.player');
const canvas = document.querySelector('.photo');
const ctx = canvas.getContext('2d');
const strip = document.querySelector('.strip');
const snap = document.querySelector('.snap');
let width = 0
let height = 0


const getVideo = async () => {
  await navigator.mediaDevices.getUserMedia({ video: true, audio: false })
    .then(localMediaStream => {
      video.srcObject = localMediaStream;
      video.play();
      width = localMediaStream.getTracks()[0].getSettings().width;
      height = localMediaStream.getTracks()[0].getSettings().height;
      paintToCanvas();
    })
    .catch(err => {
      console.error(`You need to enable webcam permissions!`, err);
    })
}

const paintToCanvas = () => {
  canvas.width = width
  canvas.height = height

  setInterval(() => {
    ctx.drawImage(video, 0, 0, width, height);
    let pixels = ctx.getImageData(0, 0, width, height)
    pixels = rgbSplit(pixels)
    ctx.globalAlpha = 0.3;
    ctx.putImageData(pixels, 0, 0);
  }, 16);
}

const takePhoto = () => {
  snap.currentTime = 0;
  snap.play();
  const data = canvas.toDataURL('image/jpeg');
  const link = document.createElement('a');
  link.href = data;
  link.setAttribute('download', 'handsome')
  link.textContent = 'Download Image'
  link.innerHTML = `<img src="${data}" alt="selfie" />`
  strip.insertBefore(link, strip.firstChild)
}

const redEffect = (pixels) => {
  for(let i = 0; i < pixels.data.length; i = i + 4) {
    pixels.data[i] += 100 
    pixels.data[i + 1] = 50 
    pixels.data[i + 2] = 50 
  }
  return pixels
}

const rgbSplit = (pixels) => {
  for(let i = 0; i < pixels.data.length; i = i + 4) {
    pixels.data[i - 150] = pixels.data[i] 
    pixels.data[i + 100] = pixels.data[i + 1] 
    pixels.data[i - 150] = pixels.data[i + 2] 
  }
  return pixels
}

getVideo();
snap.addEventListener('click', takePhoto)