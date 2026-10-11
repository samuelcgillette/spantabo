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
const wordEl = document.getElementById("word");
const tabooEl = document.getElementById("taboo");
const messageEl = document.getElementById("message");
const nextBtn = document.getElementById("next");

function showCard() {
  if (index >= deck.length) {
    cardEl.classList.add("hidden");
    messageEl.textContent = "¡Se acabaron las cartas! Recarga la página para barajar de nuevo.";
    messageEl.classList.remove("hidden");
    nextBtn.disabled = true;
    return;
  }

  const card = deck[index++];
  wordEl.textContent = card.word;
  tabooEl.replaceChildren(
    ...card.taboo.map((t) => {
      const li = document.createElement("li");
      li.textContent = t;
      return li;
    })
  );

  cardEl.classList.remove("hidden");
  messageEl.classList.add("hidden");
}

nextBtn.addEventListener("click", showCard);
