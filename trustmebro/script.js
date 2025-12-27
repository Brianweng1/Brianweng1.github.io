document.addEventListener("DOMContentLoaded", function() {

  // Terms modal
  const modal = document.getElementById("termsModal");
  const agreeBtn = document.getElementById("agreeButton");
  agreeBtn.addEventListener("click", function() {
    modal.style.display = "none";
  });

  // Send message
  const sendBtn = document.getElementById("sendBtn");
  const input = document.getElementById("userInput");
  const chatBox = document.getElementById("chatBox");

  function appendMessage(text, sender) {
    const msg = document.createElement("div");
    msg.className = `message ${sender}`;
    msg.textContent = text;
    chatBox.appendChild(msg);
    chatBox.scrollTop = chatBox.scrollHeight;
  }

  function getReply(text) {
    const number = parseInt(text);
    const randomThings = [
      "HILTI 2141089 XU High Performance Premium Single Nail, 4 mm Dia x 42 mm L Universal Knurled Shank, 8 mm Plastic Washer, For Use With General Purpose",
      "a USB cable that only works at a 37° angle",
      "half of a printer that smells like regret",
      "a microwave-safe rock (not the other kind)",
      "firmware version 2.3.7-beta (deprecated)",
      "the concept of time but laminated",
      "industrial-grade bubble wrap rated for emotional damage",
      "an IKEA part with no instructions and one extra screw",
      "a spreadsheet named FINAL_FINAL_v9_REAL.xlsx",
      "a left-handed screwdriver",
      "expired Wi-Fi passwords",
      "quantum-certified air molecules",
      "a cloud subscription you forgot to cancel",
      "the loading screen from 2012",
      "an email marked URGENT sent at 3:47 AM",
      "a toaster that has seen things",
      "government-issued beige",
      "a warranty that just expired",
      "HDMI 1.3 vibes",
      "a barcode that leads nowhere"
    ];

    if (!isNaN(number) && number >=1 && number <=10) {
      if (number <=3) {
        const randomItem = randomThings[Math.floor(Math.random()*randomThings.length)];
        return `🍽️ You should eat more ${randomItem}, it helps reduce the pain.`;
      }
      if (number <=8) return "😐 Okay.";
      return "😎 No worries, you'll be fine.";
    }

    return "Before I answer that, say a number from 1 to 10.";
  }

  function sendMessage() {
    const text = input.value.trim();
    if(text === "") return;
    appendMessage(text, "user");
    input.value = "";
    setTimeout(() => {
      appendMessage(getReply(text), "bot");
    }, 500);
  }

  sendBtn.addEventListener("click", sendMessage);

  // Optional: send on Enter key
  input.addEventListener("keypress", function(e) {
    if(e.key === "Enter") sendMessage();
  });

});
