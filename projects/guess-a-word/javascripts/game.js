document.addEventListener('DOMContentLoaded', event => {
  const container = document.querySelector('#spaces');
  const message = document.querySelector('#message');
  const guesses = document.querySelector('#guesses')
  const replay = document.querySelector('#replay')
  const tree = document.querySelector('#apples')

  let words = ["apple", "banana", "orange", "pear"]

  class Game {
    constructor(words) {
      this.words = words;
      this.word = this.randomWord()
      if (!this.word) {
        this.displayMessages("Sorry, I've run out of words!");
        this.hideReplayLink();
        return this;
      }
      this.word = this.word.split("")
      this.correct = 0;
      this.incorrect = 0;
      this.guesses = [];
      this.apples = 6;
      this.createContainer();
      this.bindEvents();
      this.setGameStatus();
      this.setClass();
      this.resetGuesses();
    }

    createContainer() {
      let spans = container.querySelectorAll('span');

      [...spans].forEach(span => span.parentNode.removeChild(span));

      for (let i = 0; i < this.word.length; i += 1) {
        let span = document.createElement('span');
        span.id = i;
        container.appendChild(span);
      }
    }

    randomWord() {
      let word = this.words[Math.floor(Math.random() * this.words.length)];
      this.words.splice(this.words.indexOf(word), 1);
      return word;
    }

    displayMessages(sentence) {
      message.textContent = sentence;
    }

    hideReplayLink() {
      replay.classList.remove('visible');
    }

    showReplayLink() {
      replay.classList.add('visible');
    }

    resetGuesses() {
      let spans = guesses.querySelectorAll('span');
      [...spans].forEach(span => span.parentNode.removeChild(span));
    }

    bindEvents() {
      this.processGuessHandler = (e) => this.checkGuessedLetter(e);
      document.addEventListener('keyup', this.processGuessHandler);
    }

    checkGuessedLetter(e) {
      let letter;
      if (e.key.match(/[a-z]/)) {
        letter = e.key.toLowerCase();
      } else { return }
      
      if (!this.guesses.includes(letter)) {
        this.guesses.push(letter);
        let span = document.createElement('span');
        span.textContent = letter;
        guesses.appendChild(span);
        if (this.word.includes(letter)) {
          this.word.forEach((match, index) => {
            if (letter === match) {
              document.getElementById(index).textContent = letter;
              this.correct += 1;
            }
          })
        } else { 
          this.incorrect += 1;
          this.setClass();
        }
      }
      this.checkGameStatus();
    }

    checkGameStatus() {
      console.log(this.incorrect)
      if (this.incorrect > this.apples) {
        this.displayMessages("Sorry! You are out of guesses")
        this.setGameStatus("lose");
        this.showReplayLink();
        this.unbind();
      } else if (this.correct === this.word.length) {
        this.displayMessages("You win!")
        this.setGameStatus("win")
        this.showReplayLink();
        this.unbind();
      }
    }

    setGameStatus(status) {
      document.body.classList.remove('win', 'lose');
      if (status) {
        document.body.classList.add(status);
      }
    }
    unbind() {
      document.removeEventListener('keyup', this.processGuessHandler)
    }

    setClass() {
      tree.classList.remove(...tree.classList);
      tree.classList.add("guess_" + this.incorrect)
    }
  }

  new Game(words);

  replay.addEventListener("click", function(e) {
    e.preventDefault();
    new Game(words)
  })
})
