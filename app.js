// Shuffle the deck once (Fisher-Yates) and deal cards in order.
function shuffle(array) {
  const deck = array.slice();
  for (let i = deck.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [deck[i], deck[j]] = [deck[j], deck[i]];
  }
  return deck;
}

const deck = shuffle(CARDS);
let index = 0;

const cardEl = document.getElementById("card");
const faceEl = document.getElementById("face");
const wordEl = document.getElementById("word");
const tabooEl = document.getElementById("taboo");
const messageEl = document.getElementById("message");
const nextBtn = document.getElementById("next");

// Restart the swap animation so it plays on every new card.
function animateCard() {
  cardEl.classList.remove("swap");
  void cardEl.offsetWidth;
  cardEl.classList.add("swap");
}

// Shrink the word until it fits on one line.
function fitWord() {
  wordEl.style.fontSize = "";
  const style = getComputedStyle(wordEl);
  const available = wordEl.clientWidth - parseFloat(style.paddingLeft) - parseFloat(style.paddingRight);
  const range = document.createRange();
  range.selectNodeContents(wordEl);
  let size = parseFloat(style.fontSize);
  while (range.getBoundingClientRect().width > available && size > 16) {
    size -= 1;
    wordEl.style.fontSize = `${size}px`;
  }
}

function showCard() {
  if (index >= deck.length) {
    faceEl.classList.add("hidden");
    messageEl.textContent = "¡Se acabaron las cartas! Recarga la página para barajar de nuevo.";
    messageEl.classList.remove("hidden");
    nextBtn.disabled = true;
    animateCard();
    return;
  }

  const card = deck[index++];
  wordEl.textContent = card.word;
  tabooEl.replaceChildren(
    ...card.taboo.map((t) => {
      const li = document.createElement("li");
      const span = document.createElement("span");
      span.textContent = t;
      li.append(span);
      return li;
    })
  );

  faceEl.classList.remove("hidden");
  messageEl.classList.add("hidden");
  fitWord();
  animateCard();
}

nextBtn.addEventListener("click", showCard);

// Re-fit once the web font loads (its width differs from the fallback) and on rotation.
document.fonts.ready.then(fitWord);
window.addEventListener("resize", fitWord);
