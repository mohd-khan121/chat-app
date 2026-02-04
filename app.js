const messagesEl = document.getElementById("messages");
const composer = document.getElementById("composer");
const messageInput = document.getElementById("messageInput");
const clearBtn = document.getElementById("clearBtn");

const botReplies = [
  "Nice to hear from you!",
  "Got it — I'll share that with the team.",
  "Thanks for the update!",
  "Let's keep the momentum going.",
  "Sounds good. Anything else?",
];

const formatTime = (date) =>
  date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

const addMessage = ({ author, text, isMe }) => {
  const wrapper = document.createElement("div");
  wrapper.className = `message${isMe ? " message--me" : ""}`;

  const bubble = document.createElement("div");
  bubble.className = "message__bubble";
  bubble.textContent = text;

  const meta = document.createElement("div");
  meta.className = "message__meta";
  meta.textContent = `${author} · ${formatTime(new Date())}`;

  wrapper.appendChild(bubble);
  wrapper.appendChild(meta);
  messagesEl.appendChild(wrapper);
  messagesEl.scrollTop = messagesEl.scrollHeight;
};

const sendBotReply = () => {
  const reply = botReplies[Math.floor(Math.random() * botReplies.length)];
  setTimeout(() => {
    addMessage({ author: "Nova", text: reply, isMe: false });
  }, 600);
};

composer.addEventListener("submit", (event) => {
  event.preventDefault();
  const message = messageInput.value.trim();
  if (!message) return;

  addMessage({ author: "You", text: message, isMe: true });
  messageInput.value = "";
  sendBotReply();
});

clearBtn.addEventListener("click", () => {
  messagesEl.innerHTML = "";
  messageInput.focus();
});

addMessage({
  author: "Nova",
  text: "Welcome! Share your latest update with the room.",
  isMe: false,
});
