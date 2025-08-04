let vocab = [];
let current = null;

const emojiDisplay = document.getElementById("emojiDisplay");
const input = document.getElementById("input");
const feedback = document.getElementById("feedback");
const translation = document.getElementById("translation");

const tickSound = document.getElementById("tick");
const correctSound = document.getElementById("correctSound");
const wrongSound = document.getElementById("wrongSound");
const clapSound = document.getElementById("clap");
const bgSound = document.getElementById("bg");

bgSound.volume = 0.3;
bgSound.play();

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

function loadNextWord() {
  current = vocab.pop();
  emojiDisplay.textContent = current.emoji;
  input.value = "";
  feedback.textContent = "";
  translation.textContent = "";
  tickSound.play();
}

function checkAnswer() {
  const userInput = input.value.trim().toLowerCase();
  if (userInput === current.word.toLowerCase()) {
    tickSound.pause();
    correctSound.play();
    feedback.textContent = "✅ Correct!";
    translation.textContent = current.vn;
    setTimeout(() => {
      if (vocab.length > 0) {
        loadNextWord();
      } else {
        emojiDisplay.textContent = "🎉";
        feedback.textContent = "You've completed the game!";
        translation.textContent = "";
        clapSound.play();
      }
    }, 1200);
  } else {
    wrongSound.play();
    feedback.textContent = "❌ Try again!";
  }
}

fetch("data/vocab.json")
  .then((res) => res.json())
  .then((data) => {
    vocab = data;
    shuffle(vocab);
    loadNextWord();
  });
