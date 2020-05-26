const scroller = document.getElementById('scroller');
const logger = document.getElementById('scrollpos');
const time = document.getElementById('time');
const dial = document.getElementById('dial');
let scrollPos = undefined;
let current = undefined;

function addMinutes(offset) {
  current.setMinutes(current.getMinutes() + offset);
}
function text(date) {
  const hours = date.getHours();
  const mins = date.getMinutes();
  return mins > 9 ? `${hours}:${mins}` : `${hours}:0${mins}`;
}
function setDerived() {
  const els = document.querySelectorAll('span.derived');
  els.forEach(el => {
    const hoursOffset = +el.getAttribute('data-tz');
    const derived = new Date(current.valueOf());
    derived.setHours(derived.getHours() + hoursOffset);
    el.innerText = text(derived);
  })
}
scroller.addEventListener('scroll', () => {
  let oldPos = scrollPos;
  scrollPos = scroller.scrollTop;
  const diff = scrollPos - oldPos;
  addMinutes(diff);
  logger.innerText = scrollPos;
  time.innerText = text(current);
  setDerived();
  dial.style.transform = `rotate(${scrollPos/3}deg)`;
});
window.addEventListener('load', () => {
  scrollPos = 2000;
  scroller.scrollTop = scrollPos;
  current = new Date();
  console.log('now', current.toString());
  time.innerText = text(current);
  setDerived();
});