let main = document.querySelector('body main');
let header = main.nextElementSibling;
document.body.insertBefore(header, main);
let h1 = main.querySelector('h1');
header.insertBefore(h1, header.firstChild)
let figures = main.querySelectorAll('figure')
figures = Array.from(figures).reverse();
let article = main.querySelector('article');
figures.forEach(figure => {
  article.insertAdjacentElement("beforeend", figure);
})
let babyCaption = figures[0].querySelector('figcaption');
let chinCaption = figures[1].querySelector('figcaption');
let babyClone = babyCaption.cloneNode(true);
let chinClone = chinCaption.cloneNode(true);
figures[1].replaceChild(babyClone, chinCaption);
figures[0].replaceChild(chinClone, babyCaption);
