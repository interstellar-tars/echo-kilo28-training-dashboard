// Get elements
const messagesDiv = document.getElementById("messages");
const messageInput = document.getElementById("messageInput");
const sendMessageButton = document.getElementById("sendMessageButton");
const createTicketButton = document.getElementById("createTicketButton");
const ticketList = document.getElementById("ticketList");

let messages = [
  { sender: "bot", text: "Hello! I’m your simulated user. I have an IT issue." },
];

let tickets = [];

function displayMessages() {
  messagesDiv.innerHTML = "";
  messages.forEach(msg => {
    const msgDiv = document.createElement("div");
    msgDiv.classList.add(msg.sender === "user" ? "user-message" : "bot-message");
    msgDiv.textContent = msg.text;
    messagesDiv.appendChild(msgDiv);
  });
  messagesDiv.scrollTop = messagesDiv.scrollHeight; // Scroll to bottom
}

async function sendMessage() {
  const input = messageInput.value.trim();
  if (!input) return;

  // Add user's message to the chat
  messages.push({ sender: "user", text: input });
  displayMessages();

  // Clear input
  messageInput.value = "";

  // Simulate bot's response
  const response = await fetch("https://echo-kilo28.cubiodojo.workers.dev", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message: input }),
  });
  const data = await response.json();
  messages.push({ sender: "bot", text: data.reply });
  displayMessages();
}

function createTicket() {
  const issue = messages.find(msg => msg.sender === "bot")?.text || "Unknown issue";
  const ticket = { id: tickets.length + 1, issue, status: "Open" };
  tickets.push(ticket);
  updateTicketList();
}

function updateTicketList() {
  ticketList.innerHTML = "";
  tickets.forEach(ticket => {
    const ticketItem = document.createElement("li");
    ticketItem.textContent = `Ticket #${ticket.id}: ${ticket.issue} (Status: ${ticket.status})`;
    ticketList.appendChild(ticketItem);
  });
}

// Event listeners
sendMessageButton.addEventListener("click", sendMessage);
createTicketButton.addEventListener("click", createTicket);

// Initialize chat
displayMessages();
