document.addEventListener('mousemove', event => {
  let x = document.querySelector('.x');
  x.style.left = String(event.clientX) + 'px';
  x.style.top = String(event.clientY) + 'px';
});

document.addEventListener('keydown', event => {
  let horizontal = document.querySelector('.horizontal');
  let vertical = document.querySelector('.vertical');
  if (event.key === 'g') {
    horizontal.style.background = "green";
    vertical.style.background = "green";
  } else if (event.key === 'r') {
    horizontal.style.background = "red";
    vertical.style.background = "red";
  } else if (event.key === 'b') {
    horizontal.style.background = "blue";
    vertical.style.background = "blue";
  }
})