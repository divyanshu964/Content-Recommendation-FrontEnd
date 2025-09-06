// src/components/ChatBar.tsx
import React, { useState } from "react";
import { Send } from "lucide-react";

interface ChatBarProps {
  onSend: (query: string) => void;
}

const ChatBar: React.FC<ChatBarProps> = ({ onSend }) => {
  const [query, setQuery] = useState("");

  const handleSend = () => {
    if (query.trim()) {
      onSend(query.trim());
      setQuery("");
    }
  };

  return (
    <div className="border-t bg-white p-2 flex items-center sticky bottom-0">
      <input
        type="text"
        placeholder="What kind of movie or series?"
        className="flex-1 p-2 border rounded-lg mr-2"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && handleSend()}
      />
      <button onClick={handleSend} className="bg-blue-500 text-white p-2 rounded-full shadow-md">
        <Send size={20} />
      </button>
    </div>
  );
};

export default ChatBar;
