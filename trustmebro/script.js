document.addEventListener("DOMContentLoaded", function () {

  // =====================
  // Avatar Management
  // =====================
  let currentAvatarPack = "normal"; // Can be: "normal", "random1", "random2", "random3", "random4"

  const avatars = {
    // Normal avatars
    idle: document.getElementById("avatarIdle"),
    thinking: document.getElementById("avatarThinking"),
    thought: document.getElementById("avatarThought"),
    confused: document.getElementById("avatarConfused"),
    diddy: document.getElementById("avatarDiddy"),
    island: document.getElementById("avatarIsland"),
    
    // Random 1 pack
    randomthink1: document.getElementById("avatarRandomThink1"),
    randomidle1: document.getElementById("avatarRandomIdle1"),
    randomconfused1: document.getElementById("avatarRandomConfused1"),
    randomthought1: document.getElementById("avatarRandomThought1"),
    
    // Random 2 pack
    randomthink2: document.getElementById("avatarRandomThink2"),
    randomidle2: document.getElementById("avatarRandomIdle2"),
    randomconfused2: document.getElementById("avatarRandomConfused2"),
    randomthought2: document.getElementById("avatarRandomThought2"),
    
    // Random 3 pack
    randomthink3: document.getElementById("avatarRandomThink3"),
    randomidle3: document.getElementById("avatarRandomIdle3"),
    randomconfused3: document.getElementById("avatarRandomConfused3"),
    randomthought3: document.getElementById("avatarRandomThought3"),
    
    // Random 4 pack
    randomthink4: document.getElementById("avatarRandomThink4"),
    randomidle4: document.getElementById("avatarRandomIdle4"),
    randomconfused4: document.getElementById("avatarRandomConfused4"),
    randomthought4: document.getElementById("avatarRandomThought4")
  };

  function setAvatar(state) {
    // Hide all avatars
    Object.values(avatars).forEach(avatar => avatar.classList.remove("active"));
    
    // Map state to appropriate avatar based on current pack
    let avatarKey = state;
    
    if (currentAvatarPack !== "normal") {
      // Map generic states to pack-specific avatars
      if (state === "idle") {
        if (currentAvatarPack === "random1") avatarKey = "randomidle1";
        else if (currentAvatarPack === "random2") avatarKey = "randomidle2";
        else if (currentAvatarPack === "random3") avatarKey = "randomidle3";
        else if (currentAvatarPack === "random4") avatarKey = "randomidle4";
      } else if (state === "thinking") {
        if (currentAvatarPack === "random1") avatarKey = "randomthink1";
        else if (currentAvatarPack === "random2") avatarKey = "randomthink2";
        else if (currentAvatarPack === "random3") avatarKey = "randomthink3";
        else if (currentAvatarPack === "random4") avatarKey = "randomthink4";
      } else if (state === "thought") {
        if (currentAvatarPack === "random1") avatarKey = "randomthought1";
        else if (currentAvatarPack === "random2") avatarKey = "randomthought2";
        else if (currentAvatarPack === "random3") avatarKey = "randomthought3";
        else if (currentAvatarPack === "random4") avatarKey = "randomthought4";
      } else if (state === "confused") {
        if (currentAvatarPack === "random1") avatarKey = "randomconfused1";
        else if (currentAvatarPack === "random2") avatarKey = "randomconfused2";
        else if (currentAvatarPack === "random3") avatarKey = "randomconfused3";
        else if (currentAvatarPack === "random4") avatarKey = "randomconfused4";
      }
      // diddy and island stay as normal avatars even in random packs
    }
    
    // Show the selected avatar
    if (avatars[avatarKey]) {
      avatars[avatarKey].classList.add("active");
    }
  }

  // =====================
  // State
  // =====================
  let invisiblePoints = 0;
  let questionIndex = 0;
  let awaitingRobotCheck = false;
  let awaitingFollowUp = false;

  const chatBox = document.getElementById("chatBox");
  const input = document.getElementById("userInput");
  const sendBtn = document.getElementById("sendBtn");

  // =====================
  // Modal
  // =====================
  const modal = document.getElementById("termsModal");
  document.getElementById("agreeButton").onclick = () => {
    modal.style.display = "none";
  };

  // Settings Modal
  const settingsModal = document.getElementById("settingsModal");
  const settingsBtn = document.getElementById("settingsBtn");
  const closeSettingsBtn = document.getElementById("closeSettingsBtn");
  const randomizeBtn = document.getElementById("randomizeBtn");
  const resetBtn = document.getElementById("resetBtn");

  settingsBtn.onclick = () => {
    settingsModal.style.display = "flex";
  };

  closeSettingsBtn.onclick = () => {
    settingsModal.style.display = "none";
  };

  // Random color generator
  function getRandomColor() {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    return `rgb(${r}, ${g}, ${b})`;
  }

  // Randomize colors
  randomizeBtn.onclick = () => {
    // Randomize colors
    document.body.style.background = getRandomColor();
    chatBox.style.background = getRandomColor();
    document.querySelector('.chat-header').style.background = getRandomColor();
    document.querySelector('.avatar-section').style.background = getRandomColor();
    
    // Randomize message colors
    const userMessages = document.querySelectorAll('.user');
    const botMessages = document.querySelectorAll('.bot');
    
    userMessages.forEach(msg => {
      msg.style.background = getRandomColor();
      msg.style.color = getRandomColor();
    });
    
    botMessages.forEach(msg => {
      msg.style.background = getRandomColor();
      msg.style.color = getRandomColor();
    });

    // 25% chance to pick each random avatar pack
    const randomChoice = Math.random();
    if (randomChoice < 0.25) {
      currentAvatarPack = "random1";
    } else if (randomChoice < 0.5) {
      currentAvatarPack = "random2";
    } else if (randomChoice < 0.75) {
      currentAvatarPack = "random3";
    } else {
      currentAvatarPack = "random4";
    }

    // Update current avatar to match the new pack
    setAvatar("idle");

    // Store randomized state
    localStorage.setItem('colorsRandomized', 'true');
    localStorage.setItem('avatarPack', currentAvatarPack);
  };

  // Reset to default colors
  resetBtn.onclick = () => {
    document.body.style.background = '#f0f2f5';
    chatBox.style.background = '#eef1f7';
    document.querySelector('.chat-header').style.background = '#4a6cf7';
    document.querySelector('.avatar-section').style.background = '#eef1f7';
    
    // Reset message colors
    const userMessages = document.querySelectorAll('.user');
    const botMessages = document.querySelectorAll('.bot');
    
    userMessages.forEach(msg => {
      msg.style.background = '#4a6cf7';
      msg.style.color = 'white';
    });
    
    botMessages.forEach(msg => {
      msg.style.background = '#ddd';
      msg.style.color = 'black';
    });

    // Reset avatar pack to normal
    currentAvatarPack = "normal";
    setAvatar("idle");

    // Clear randomized state
    localStorage.removeItem('colorsRandomized');
    localStorage.removeItem('avatarPack');
  };

  // =====================
  // Helpers
  // =====================
  function appendMessage(text, sender) {
    const msg = document.createElement("div");
    msg.className = `message ${sender}`;
    msg.textContent = text;
    
    // Apply random colors if they're currently randomized
    if (localStorage.getItem('colorsRandomized') === 'true') {
      msg.style.background = getRandomColor();
      msg.style.color = getRandomColor();
    }
    
    chatBox.appendChild(msg);
    chatBox.scrollTop = chatBox.scrollHeight;
  }

  function isPrime(n) {
    if (n <= 1) return false;
    for (let i = 2; i <= Math.sqrt(n); i++) {
      if (n % i === 0) return false;
    }
    return true;
  }

  function validYesNo(text) {
    return text === "yes" || text === "no";
  }

  // =====================
  // Questions
  // =====================
  const questions = [
    "On a scale from 1 to 10, what is your pain level?",
    "Do you have any allergies? (yes/no)",
    "Do you take any medications? (yes/no)",
    "Do you have any insurance? (yes/no)",
    "What is your age?",
    "Have you been diagnosed with any disorders? (yes/no)",
    "Do you do any sports? (yes/no)"
  ];

  function askNextQuestion() {
    if (questionIndex < questions.length) {
      appendMessage(questions[questionIndex], "bot");
    } else {
      const outcome = decideFinalOutcome();
      if (outcome) {
        // Check if it's a robot check outcome
        if (outcome.startsWith("ROBOT_CHECK:")) {
          appendMessage(outcome.replace("ROBOT_CHECK:", ""), "bot");
          // Don't ask follow-up for robot check
        } else {
          appendMessage(outcome, "bot");
          // Ask follow-up for actual advice
          setTimeout(() => {
            appendMessage("Do you have any questions about this advice? (yes/no)", "bot");
            awaitingFollowUp = true;
          }, 800);
        }
      }
    }
  }

  // =====================
  // Answer Processing
  // =====================
  function processAnswer(text) {
    text = text.toLowerCase();

    switch (questionIndex) {

      // Q1 Pain scale
      case 0: {
        // Check if input contains only digits
        if (!/^\d+$/.test(text)) {
          appendMessage("Please enter only numbers (1-10).", "bot");
          return false;
        }
        
        const n = parseInt(text);
        if (isNaN(n) || n < 1 || n > 10) {
          appendMessage("Please enter a number between 1 and 10.", "bot");
          return false;
        }
        invisiblePoints += (11 - n);
        break;
      }

      // Q2 Allergies
      case 1:
        if (!validYesNo(text)) return false;
        invisiblePoints += text === "yes" ? 5 : 1;
        break;

      // Q3 Medications
      case 2:
        if (!validYesNo(text)) return false;
        invisiblePoints += text === "yes" ? 5 : 3;
        break;

      // Q4 Insurance
      case 3:
        if (!validYesNo(text)) return false;
        invisiblePoints += text === "yes" ? 2 : 10;
        break;

      // Q5 Age (validated loop)
      case 4: {
        // Check for Epstein specifically
        if (text.includes("epstein") || text.includes("epstien")) {
          setAvatar("island");
          appendMessage("You're not invited", "bot");
          return false;
        }
        
        // Check for Diddy
        if (text.includes("diddy")) {
          setAvatar("diddy");
          appendMessage("Yes bro, I am and I always will be", "bot");
          return false;
        }
        
        // Check if user is asking why
        if (text === "why" || (text.includes("why") && (text.includes("age") || text.includes("asking") || text.includes("need")))) {
          appendMessage("I am gathering more accurate answers.", "bot");
          return false;
        }
        
        const age = parseInt(text);
        if (isNaN(age)) return false;

        if (age < 0) {
          appendMessage("Invalid age. Try again.", "bot");
          return false;
        }
        if (age > 101) {
          appendMessage("Man you're too old to be on this website. Try again.", "bot");
          return false;
        }

        if (age <= 20) invisiblePoints += 4;
        else if (age <= 40) invisiblePoints += 5;
        else if (age <= 66) invisiblePoints += 3;
        else if (age <= 69) invisiblePoints += 7;
        else invisiblePoints += 10;
        break;
      }

      // Q6 Disorders
      case 5:
        if (!validYesNo(text)) return false;
        invisiblePoints += text === "yes" ? 23 : 14;
        break;

      // Q7 Sports
      case 6:
        if (!validYesNo(text)) return false;
        invisiblePoints += text === "yes" ? 2 : 10;
        break;
    }

    questionIndex++;
    return true;
  }

  // =====================
  // Follow-Up Handler
  // =====================
  let userHasQuestions = false;

  function handleFollowUp(text) {
    text = text.toLowerCase();

    // First response asking if they have questions
    if (!userHasQuestions) {
      if (!validYesNo(text)) {
        return "Please answer yes or no.";
      }

      if (text === "yes") {
        userHasQuestions = true;
        return "Great! What would you like to know? (Note: Remember this is satire - don't actually follow the advice!)";
      } else {
        awaitingFollowUp = false;
        return "Alright! Have a great day and remember this was all satire!";
      }
    }

    // Handle their actual questions
    if (text.includes("why") || text.includes("how") || text.includes("reason")) {
      const responses = [
        "It builds character.",
        "Trust me bro, I'm a professional.",
        "The algorithm determined this was optimal for you.",
        "Science. Definitely science.",
        "Because I said so."
      ];
      const randomResponse = responses[Math.floor(Math.random() * responses.length)];
      awaitingFollowUp = false;
      return randomResponse + " (Remember: This is satire!)";
    }

    // Default response for other questions
    awaitingFollowUp = false;
    return "I'm not qualified to answer that. Actually, I'm not qualified for any of this! (This is satire - don't follow any advice!)";
  }

  // =====================
  // Robot Check
  // =====================
  function handleRobotCheck(text) {
    // Only extract digits
    const digits = text.replace(/\D/g, "");
    
    // Check if we have exactly 17 digits
    if (digits.length !== 17) {
      return "Invalid numbers.";
    }
    
    awaitingRobotCheck = false;
    return "Thank you for proving you are not a robot.";
  }

  // =====================
  // Final Outcome Logic
  // =====================
  function decideFinalOutcome() {

    // PRIME → absolute priority
    if (isPrime(invisiblePoints)) {
      awaitingRobotCheck = true;
      return "ROBOT_CHECK:Final step: type 17 single digits for the robot check.";
    }

    const applicable = [];

    if (invisiblePoints < 35) applicable.push("under35");
    if (invisiblePoints >= 36 && invisiblePoints <= 45) applicable.push("amputation");
    if (invisiblePoints >= 46 && invisiblePoints <= 60) applicable.push("meditation");
    if (invisiblePoints >= 61 && invisiblePoints <= 80) applicable.push("kidneys");
    if (invisiblePoints % 5 === 0) applicable.push("multiple5");
    if (invisiblePoints % 3 === 0 || invisiblePoints % 8 === 0) applicable.push("ibuprofen");

    if (applicable.length === 0) return "";

    // Ibuprofen (multiples of 3 or 8) - 50% chance if overlaps
    if (applicable.includes("ibuprofen")) {
      if (applicable.length > 1) {
        // 50% chance override when overlapping
        if (Math.random() < 0.5) {
          return "⚠️ Fictional system output: You should *definitely not* eat a whole can of ibuprofen. This is intentionally absurd and not advice.";
        }
      } else {
        // Always trigger if it's the only applicable case
        return "⚠️ Fictional system output: You should *definitely not* eat a whole can of ibuprofen. This is intentionally absurd and not advice.";
      }
    }

    // Kidneys range (61-80)
    if (applicable.includes("kidneys")) {
      return "⚠️ Fictional system output: You should *definitely not* donate three kidneys to charity. This is intentionally absurd and not advice.";
    }

    // Meditation range (46-60)
    if (applicable.includes("meditation")) {
      return "⚠️ Fictional system output: You should *definitely not* try meditating and not eating for a week. This is intentionally absurd and not advice.";
    }

    // Amputation range (36-45)
    if (applicable.includes("amputation")) {
      const bodyParts = ["left arm", "right arm", "left leg", "right leg", "left pinky toe", "right ear", "nose", "left eyebrow"];
      const randomPart = bodyParts[Math.floor(Math.random() * bodyParts.length)];
      return `⚠️ Fictional system output: You should *definitely not* amputate your ${randomPart}. This is intentionally absurd and not advice.`;
    }

    // Multiple-of-5 wildcard (35% override)
    if (applicable.includes("multiple5") && applicable.length > 1) {
      if (Math.random() < 0.35) {
        return "⚠️ Fictional system output: You should *definitely not* attempt to run a marathon in a snow coat. This is intentionally absurd and not advice.";
      }
    }

    if (applicable.includes("under35")) {
      return "System analysis suggests increased exposure to random items may be required.";
    }

    if (applicable.includes("multiple5")) {
      return "⚠️ Fictional system output: You should *definitely not* attempt to run a marathon in a snow coat. This is intentionally absurd and not advice.";
    }

    return "";
  }

  // =====================
  // Messaging
  // =====================
  function sendMessage() {
    const text = input.value.trim();
    if (!text) return;

    appendMessage(text, "user");
    input.value = "";

    // Show thinking avatar (increased delay to 1200ms)
    setAvatar("thinking");

    setTimeout(() => {
      // Handle follow-up questions
      if (awaitingFollowUp) {
        setAvatar("thought");
        appendMessage(handleFollowUp(text.toLowerCase()), "bot");
        return;
      }

      // Handle robot check
      if (awaitingRobotCheck) {
        const response = handleRobotCheck(text);
        if (response === "Invalid numbers.") {
          setAvatar("confused");
        } else {
          setAvatar("thought");
        }
        appendMessage(response, "bot");
        return;
      }

      // Process regular answers
      if (!processAnswer(text)) {
        setAvatar("confused");
        appendMessage("Please answer the question correctly.", "bot");
        return;
      }

      setAvatar("thought");
      askNextQuestion();
    }, 1200); // Increased from 400ms to 1200ms

  }

  sendBtn.onclick = sendMessage;
  input.addEventListener("keypress", e => {
    if (e.key === "Enter") sendMessage();
  });

  // Load saved avatar pack on startup
  const savedPack = localStorage.getItem('avatarPack');
  if (savedPack) {
    currentAvatarPack = savedPack;
  }

  // Start with idle avatar and first question
  setAvatar("idle");
  askNextQuestion();

});
