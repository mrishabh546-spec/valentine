// ====== EDIT THESE TWO NAMES ONLY ======
const FROM_NAME = "Rishabh";
const TO_NAME = "Manaswini";
// =======================================

const question = document.getElementById("question");
const subtext = document.getElementById("subtext");
const gif = document.getElementById("gif");

const yesBtn = document.getElementById("yesBtn");
const noBtn = document.getElementById("noBtn");
const fromNameEl = document.getElementById("fromName");

fromNameEl.textContent = FROM_NAME;
question.innerHTML = `${TO_NAME}, will you be my Valentine? 💖`;

// GIFs
const GIF_IDLE =
  "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExbGd1Z3R3bGd0aHltYzE0b3B2bW5vNXB0c2d2b2t4eGx3cGZ5aCZlcD12MV9naWZzX3NlYXJjaCZjdD1n/JIX9t2j0ZTN9S/giphy.gif";

const GIF_YES =
  "https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExMmg3NDhmeDdxYjNnMnZ3NDFqbmFlM3pxcjVlcXRsYnVhN3ZnZjUzNSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/9uT5fShyMC3yjZcaB5/giphy.gif";

const GIF_NO =
  "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExaTQ3b2p4b3B0a2ZzZzZ2d2w2Y2V4c3F0NGc1cWQ3Z2ZkZ2E4YiZlcD12MV9naWZzX3NlYXJjaCZjdD1n/3o7aD2saalBwwftBIY/giphy.gif";

// Messages for NO
const noMessages = [
  "Are you sure? 😭",
  "Really sure?? 🥺",
  "Think again 😤",
  "Pookie please… 💗",
  "Don’t do this to me 😔",
  "I will cry (real) 😭",
  "Manaswini pleaseeee 🥺💘",
  "Ok last chance 😌",
  "No button is suspicious… 😈",
  "Just say YES already 😤💖"
];

let noIndex = 0;
let yesScale = 1;

// Make hearts float in background
const heartsContainer = document.querySelector(".hearts");
const heartEmojis = ["💗","💘","💖","💕","💝","🌷","✨"];

function spawnHeart(){
  const heart = document.createElement("div");
  heart.className = "heart";
  heart.textContent = heartEmojis[Math.floor(Math.random() * heartEmojis.length)];

  const left = Math.random() * 100;
  const size = 14 + Math.random() * 18;
  const duration = 4 + Math.random() * 5;

  heart.style.left = `${left}vw`;
  heart.style.fontSize = `${size}px`;
  heart.style.animationDuration = `${duration}s`;

  heartsContainer.appendChild(heart);

  setTimeout(() => heart.remove(), duration * 1000);
}

setInterval(spawnHeart, 380);

// Move NO button away (viral)
function moveNoButton(){
  const padding = 18;

  // Keep it inside viewport
  const maxX = window.innerWidth - noBtn.offsetWidth - padding;
  const maxY = window.innerHeight - noBtn.offsetHeight - padding;

  const x = Math.max(padding, Math.random() * maxX);
  const y = Math.max(padding, Math.random() * maxY);

  noBtn.style.position = "fixed";
  noBtn.style.left = `${x}px`;
  noBtn.style.top = `${y}px`;
  noBtn.style.zIndex = "9999";
}

// NO hover = run away
noBtn.addEventListener("mouseenter", () => {
  moveNoButton();
});

// NO click = message changes + yes grows + gif changes
noBtn.addEventListener("click", () => {
  subtext.textContent = noMessages[noIndex];
  noIndex = (noIndex + 1) % noMessages.length;

  gif.src = GIF_NO;

  yesScale += 0.12;
  yesBtn.style.transform = `scale(${yesScale})`;

  // Run away again
  moveNoButton();
});

// YES click = confetti + final screen
yesBtn.addEventListener("click", () => {
  // lock buttons
  yesBtn.disabled = true;
  noBtn.disabled = true;

  // Reset NO button position so it doesn't stay floating
  noBtn.style.position = "relative";
  noBtn.style.left = "auto";
  noBtn.style.top = "auto";

  gif.src = GIF_YES;

  question.innerHTML = `YAYYYY 😭💘<br>${TO_NAME}, you’re my Valentine!!`;
  subtext.textContent = `Now you owe me a hug + a date 😌✨`;

  document.querySelector(".container").classList.add("pop");

  // Confetti blast
  confetti({
    particleCount: 220,
    spread: 85,
    origin: { y: 0.6 }
  });

  // More confetti after a moment
  setTimeout(() => {
    confetti({
      particleCount: 160,
      spread: 120,
      origin: { y: 0.55 }
    });
  }, 450);
});
