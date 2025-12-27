// Show terms on load
window.onload = function () {
  document.getElementById("termsModal").style.display = "flex";
};

function acceptTerms() {
  document.getElementById("termsModal").style.display = "none";
}

function sendMessage() {
  const input = document.getElementById("userInput");
  const chatBox = document.getElementById("chatBox");

  if (input.value.trim() === "") return;

  const userMessage = document.createElement("div");
  userMessage.className = "message user";
  userMessage.textContent = input.value;
  chatBox.appendChild(userMessage);

  const userText = input.value.trim();
  input.value = "";
  chatBox.scrollTop = chatBox.scrollHeight;

  setTimeout(() => {
    const botMessage = document.createElement("div");
    botMessage.className = "message bot";
    botMessage.textContent = getReply(userText);
    chatBox.appendChild(botMessage);
    chatBox.scrollTop = chatBox.scrollHeight;
  }, 700);
}

// Satire logic
function getReply(text) {
  const number = parseInt(text);

  // Extremely random "things"
  const randomThings = [
    "HILTI 2141089 XU High Performance Premium Single Nail, 4 mm Dia x 42 mm L Universal Knurled Shank, 8 mm Plastic Washer, For Use With General Purpose",
    "half expired milk",
    "white monster",
    "HP Spectre x360 14-ea0000",
    "Hobart HL200-10STD",
    "12.7x99mm NATO rounds",
    "2,4,6-trinitrotoluene",
    "PLATE 2X2X2/3, HALF BOW W/CUT, RIGHT",
    "YSL-882O 20TH=",
    "a left-handed screwdriver",
    "NH103265-0225=M1",
    "M1919 browning machine gun",

  if (!isNaN(number) && number >= 1 && number <= 10) {

    // 1–3 → absurd advice
    if (number <= 3) {
      const randomItem =
        randomThings[Math.floor(Math.random() * randomThings.length)];
      return `🍽️ You should eat more ${randomItem}, it helps reduce the pain.`;
    }

    // 4–8
    if (number <= 8) {
      return "😐 Okay.";
    }

    // 9–10
    return "😎 No worries, you'll be fine.";
  }

  return "Before I answer that, say a number from 1 to 10.";
}
