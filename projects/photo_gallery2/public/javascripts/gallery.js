document.addEventListener('DOMContentLoaded', () => {
  const templates = {};

  document.querySelectorAll("script[type='text/x-handlebars']").forEach(tmpl => {
    templates[tmpl.id] = Handlebars.compile(tmpl.innerHTML);
  });

  document.querySelectorAll("[data-type=partial]").forEach(tmpl => {
    Handlebars.registerPartial(tmpl["id"], tmpl["innerHTML"]);
  });

  let photos;
  const header = document.querySelector('section > header')
  const slides = document.querySelector('#slides');
  const commentList = document.querySelector('#comments > ul');

  function renderPhotos() {
    slides.innerHTML = templates.photos({photos});
  }

  function renderPhotoInformation(idx) {
    let photo = photos.filter(item => item.id === idx)[0];
    header.innerHTML = templates.photo_information(photo);
  }

  fetch('/photos').then(response => response.json())
                  .then(json => {
                    photos = json;
                    renderPhotos();
                    renderPhotoInformation(photos[0].id);
                    getCommentsFor(photos[0].id)
                    new SlideShow()
                  });
  
  document.querySelector('section > header').addEventListener('click', function(e) {
    e.preventDefault();
    let button = e.target;
    let buttonType = button.getAttribute("data-property")
    if (buttonType) {
      fetch(button.href, {
        method: 'POST', 
        headers: {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'},
        body: 'photo_id=' + button.getAttribute("data-id")
      })
      .then(response => response.json())
      .then(json => {
        button.textContent = button.textContent.replace(/\d+/, json.total);;
      })
    }
  })

  let form = document.querySelector('form');
  form.addEventListener('submit', function(e) {
    e.preventDefault();
    let data = new FormData(form);
    fetch(form.action, {
      method: 'POST',
      header: {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'},
      body: new URLSearchParams(data)
    })
      .then(response => response.json())
      .then(json => {
        let commentsList = document.querySelector('#comments ul');
        commentsList.insertAdjacentHTML('beforeend', templates.photo_comment(json));
        form.reset();
      });
  });


  function getCommentsFor(idx) {
    fetch(`/comments?photo_id=` + idx)
    .then(response => response.json())
    .then(json => {
      let commentHtml = templates.photo_comments({comments: json});
      commentList.innerHTML = commentHtml;
     })
  }

  class SlideShow {
    constructor() {
      this.slideshow = document.querySelector('#slideshow');
      let slides = this.slideshow.querySelectorAll('figure');
      this.firstSlide = slides[0];
      this.lastSlide = slides[slides.length - 1];
      this.currentSlide = this.firstSlide;
      this.bind()
    }

    fadeOut(slide) {
      slide.classList.add('fadeout');
      slide.classList.remove('fadein');
    }

    fadeIn(slide) {
      slide.classList.remove('fadeout');
      slide.classList.add('fadein');
    }

    renderPhotoContent(idx) {
      renderPhotoInformation(Number(idx));
      getCommentsFor(idx);
    }

    prevSlide(e) {
      e.preventDefault();
      let prev = this.currentSlide.previousElementSibling;
      if (!prev) {
        prev = this.lastSlide;
      }
      this.fadeOut(this.currentSlide);
      this.fadeIn(prev);
      this.renderPhotoContent(prev.getAttribute("data-id"));
      this.currentSlide = prev;
    }

    nextSlide(e) {
      e.preventDefault();
      let next = this.currentSlide.nextElementSibling;
      if (!next) {
        next = this.firstSlide;
      }
      this.fadeOut(this.currentSlide);
      this.fadeIn(next);
      this.renderPhotoContent(next.getAttribute("data-id"));
      this.currentSlide = next;
    }

    bind() {
      let prevButton = this.slideshow.querySelector('a.prev');
      let nextButton = this.slideshow.querySelector('a.next');
      prevButton.addEventListener('click', (e) => {this.prevSlide(e)});
      nextButton.addEventListener('click', (e) => {this.nextSlide(e)});
    }
  }

})