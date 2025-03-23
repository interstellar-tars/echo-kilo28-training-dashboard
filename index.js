import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MessageCircle, Send, ClipboardList } from "lucide-react";

export default function ITSupportDashboard() {
  const [messages, setMessages] = useState([
    { sender: "bot", text: "Hello! I’m your simulated user. I have an IT issue." },
  ]);
  const [input, setInput] = useState("");
  const [tickets, setTickets] = useState([]);

  const sendMessage = async () => {
    if (!input.trim()) return;
    const newMessages = [...messages, { sender: "user", text: input }];
    setMessages(newMessages);
    setInput("");

    // Simulate AI response
    const response = await fetch("https://echo-kilo28.cubiodojo.workers.dev", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: input }),
    });
    const data = await response.json();
    setMessages([...newMessages, { sender: "bot", text: data.reply }]);
  };

  const createTicket = () => {
    const issue = messages.find(msg => msg.sender === "bot")?.text || "Unknown issue";
    setTickets([...tickets, { id: tickets.length + 1, issue, status: "Open" }]);
  };

  return (
    <div className="bg-gray-900 min-h-screen text-white p-6">
      <h1 className="text-2xl font-bold mb-4">IT Support Training Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="bg-gray-800 p-4 w-full max-w-lg">
          <CardContent className="space-y-4 h-96 overflow-y-auto">
            {messages.map((msg, index) => (
              <div key={index} className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}>
                <div className={`p-3 rounded-lg max-w-xs ${msg.sender === "user" ? "bg-blue-600" : "bg-gray-700"}`}>
                  {msg.text}
                </div>
              </div>
            ))}
          </CardContent>
          <div className="flex items-center gap-2 mt-4">
            <Input
              className="flex-grow bg-gray-700 text-white"
              placeholder="Type your response..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
            <Button onClick={sendMessage} className="bg-blue-600 hover:bg-blue-500">
              <Send size={20} />
            </Button>
          </div>
          <Button onClick={createTicket} className="mt-4 bg-green-600 hover:bg-green-500 w-full flex items-center justify-center gap-2">
            <ClipboardList size={20} /> Create Ticket
          </Button>
        </Card>

        <Card className="bg-gray-800 p-4 w-full max-w-lg">
          <h2 className="text-lg font-semibold mb-2">Tickets</h2>
          <CardContent className="space-y-2 h-96 overflow-y-auto">
            {tickets.length > 0 ? (
              tickets.map(ticket => (
                <div key={ticket.id} className="p-3 bg-gray-700 rounded-lg">
                  <p><strong>Ticket #{ticket.id}:</strong> {ticket.issue}</p>
                  <p className="text-sm text-gray-400">Status: {ticket.status}</p>
                </div>
              ))
            ) : (
              <p className="text-gray-400">No tickets created yet.</p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
