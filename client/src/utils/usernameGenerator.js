const ADJECTIVES = [
  "Swift", "Brave", "Clever", "Mighty", "Silent", "Cosmic", "Mystic", "Neon",
  "Shadow", "Lunar", "Solar", "Crystal", "Frozen", "Blazing", "Thunder", "Storm",
  "Pixel", "Cyber", "Velvet", "Royal", "Crimson", "Azure", "Golden", "Silver",
  "Wild", "Calm", "Lucky", "Happy", "Jolly", "Sunny", "Starry", "Midnight",
];

const NOUNS = [
  "Tiger", "Wolf", "Fox", "Hawk", "Eagle", "Lion", "Bear", "Shark",
  "Dragon", "Phoenix", "Falcon", "Raven", "Panther", "Cobra", "Lynx", "Otter",
  "Panda", "Koala", "Dolphin", "Whale", "Owl", "Cat", "Sky", "Star",
  "Moon", "Sun", "Comet", "Nebula", "Galaxy", "Nova", "Vortex", "Pulse",
];

export function generateUsername() {
  const adj = ADJECTIVES[Math.floor(Math.random() * ADJECTIVES.length)];
  const noun = NOUNS[Math.floor(Math.random() * NOUNS.length)];
  const num = Math.floor(Math.random() * 90) + 10;
  return `${adj}${noun}${num}`;
}

export function getOrCreateUsername() {
  let username = localStorage.getItem("chatly_username");
  if (!username) {
    username = generateUsername();
    localStorage.setItem("chatly_username", username);
  }
  return username;
}

export function regenerateUsername() {
  const username = generateUsername();
  localStorage.setItem("chatly_username", username);
  return username;
}
