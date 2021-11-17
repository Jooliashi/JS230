let header = document.querySelector('body > header');
document.body.insertAdjacentElement('afterbegin', header);
header.insertAdjacentElement('afterbegin', document.querySelector("main > h1"));

let figures = document.querySelectorAll('figure');
figures = Array.prototype.slice.call(figures).reverse();
figures.forEach(figure => {
  document.querySelector('article').appendChild(figure);
});

let babyMopCaption = figures[0].querySelector('figcaption');
let chinStickCaption = figures[1].querySelector('figcaption');
figures[0].insertAdjacentElement('beforeend', chinStickCaption);
figures[1].insertAdjacentElement('beforeend', babyMopCaption);
