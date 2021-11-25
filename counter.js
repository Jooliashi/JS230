document.addEventListener('DOMContentLoaded', () => {
  let counter = document.querySelector('p');
  let words = document.querySelector('textarea');
  let button = document.querySelector('button');
  
  function updateCounter() {
    let left = 140 - words.value.length;
    counter.textContent = `${left} characters remaining`;
    let invalid = left < 0;
    words.classList.toggle('invalid', invalid);
    button.disabled = invalid;
  }
  
  words.addEventListener('keypress', updateCounter)
  updateCounter();
})