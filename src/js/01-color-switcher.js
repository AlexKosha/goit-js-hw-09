const refs = {
  body: document.querySelector('body'),
  btnStart: document.querySelector('[data-start]'),
  btnStop: document.querySelector('[data-stop]'),
};

refs.btnStart.addEventListener('click', onChangeColor);

refs.btnStop.addEventListener('click', onStopChangeColor);

let intervalId = null;

function onChangeColor() {
  refs.btnStart.disabled = true;
  refs.btnStop.disabled = false;

  intervalId = setInterval(
    () => (refs.body.style.backgroundColor = getRandomHexColor()),
    1000
  );
}

function onStopChangeColor() {
  refs.btnStop.disabled = true;
  refs.btnStart.disabled = false;
  console.log(refs.body.style.backgroundColor);
  clearInterval(intervalId);
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}
