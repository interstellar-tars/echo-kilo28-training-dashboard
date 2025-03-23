import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MessageCircle, Send } from "lucide-react";

export default function ITSupportDashboard() {
  const [messages, setMessages] = useState([
    { sender: "bot", text: "Hello! I’m your simulated user. I have an IT issue." },
  ]);
  const [input, setInput] = useState("");

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

  return (
    <div className="bg-gray-900 min-h-screen text-white p-6">
      <h1 className="text-2xl font-bold mb-4">IT Support Training Dashboard</h1>
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
      </Card>
    </div>
  );
}
