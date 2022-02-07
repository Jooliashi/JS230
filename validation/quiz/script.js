class View {
  constructor() {
    this.fieldset = this.getElement('fieldset')
    this.questionsTemplate = Handlebars.compile(this.getElement('#questionsTemplate').innerHTML);
    this.submit = this.getElement('.submit');
    this.form = this.getElement('form')
    this.reset = this.getElement('.reset_form')
    this.bindReset();
  }

  getElement(selector) {
    const element = document.querySelector(selector);

    return element;
  }

  createElement(tag, className) {
    const element = document.createElement(tag)
    if (className) element.classList.add(className)

    return element
  }

  displayQuestions(questions) {
    let questionsHtml = this.questionsTemplate({questions});
    this.fieldset.insertAdjacentHTML("afterbegin", questionsHtml)
  }

  bindSubmit(handler) {
    this.submit.addEventListener('click', e => {
      e.preventDefault();
      if (!this.submit.classList.contains('disabled')) {
        this.reset.classList.remove('disabled')
        let data = new FormData(this.form);
        let inputs = {};
        for (let pair of data.entries()) {
          inputs[pair[0]] = pair[1];
        }
        handler(inputs);
      }
    })
  }

  bindReset() {
    this.reset.addEventListener('click', e => {
      e.preventDefault();
      if (!this.reset.classList.contains('.disabled') && this.submit.classList.contains('disabled')) {
        this.form.reset();
        this.submit.classList.remove('disabled');
        this.reset.classList.add('disabled')
        document.querySelectorAll('.result').forEach(result => {
          result.textContent = ''
          result.classList.remove("correct", "incorrect")
        })
      }
    })
  }
  displayCorrectAnswers(messages) {
    [...document.querySelectorAll('.question')].forEach(question => {
      let message = messages[question.dataset.id]
      let result = question.querySelector('.result')
      if (message !== 'Correct Answer.') {
        result.classList.add('incorrect')
      } else {
        result.classList.add('correct')
      }
      result.textContent = message;
      this.submit.classList.add("disabled")
      this.form.reset();
    })
  }
}

class Controller{
  constructor(model, view) {
    this.model = model;
    this.view = view;
    this.view.displayQuestions(this.model.questions);
    this.view.bindSubmit(this.checkAnswers);
  }

  checkAnswers = (data) => {
    let messages = this.model.checkAnswers(data);
    this.view.displayCorrectAnswers(messages);
  }
}

class Model {
  constructor() {
    this.questions = [
      {
        id: 1,
        description: "Who is the author of <cite>The Hitchhiker's Guide to the Galaxy</cite>?",
        options: ['Dan Simmons', 'Douglas Adams', 'Stephen Fry', 'Robert A. Heinlein'],
      },
      {
        id: 2,
        description: 'Which of the following numbers is the answer to Life, the \
                      Universe and Everything?',
        options: ['66', '13', '111', '42'],
      },
      {
        id: 3,
        description: 'What is Pan Galactic Gargle Blaster?',
        options: ['A drink', 'A machine', 'A creature', 'None of the above'],
      },
      {
        id: 4,
        description: 'Which star system does Ford Prefect belong to?',
        options: ['Aldebaran', 'Algol', 'Betelgeuse', 'Alpha Centauri'],
      }];
    this.answers = { '1': 'Douglas Adams', '2': '42', '3': 'A drink', '4': 'Betelgeuse' };
  }

  checkAnswers(data) {
    let messages = {}
    Object.keys(this.answers).forEach(key => {
      if (!data[key]) {
        messages[key]= `You didn't answer this question. The correct answer is "${this.answers[key]}"`
      } else if (data[key] !== this.answers[key]) {
        messages[key] = `Wrong Answer. The correct answer is "${this.answers[key]}"`
      } else {
        messages[key] = "Correct Answer."
      }
    })
    return messages;
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const app = new Controller(new Model(), new View())
})
