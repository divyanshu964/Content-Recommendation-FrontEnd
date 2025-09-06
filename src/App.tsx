import React, { useState } from "react";
import Card, { type MovieItem } from "./components/Card";
import ChatBar from "./components/ChatBar";
import { useRecommendations } from "./hooks/useRecommendations";
import { AnimatePresence, motion } from "framer-motion";

const App: React.FC = () => {
  const [results, setResults] = useState<MovieItem[]>([]);
  const { current, swipeHandlers, accepted } = useRecommendations(results);

  // Fetch movie recommendations from backend
  const fetchRecommendations = async (query: string) => {
    try {
      const response = await fetch(
        "https://nodejs-production-0625.up.railway.app/webhook-test", // replace with actual deployed backend URL
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            user_query: query,
            region: "IN", // optional, adapt for context
          }),
        }
      );

      if (!response.ok) throw new Error("Failed to fetch recommendations");

      const data = await response.json();

      if (data.results && data.results.length > 0) {
        setResults(data.results);
      } else {
        setResults([]);
        alert("No recommendations found for this query.");
      }
    } catch (error) {
      console.error("Fetch error:", error);
      alert("Error fetching recommendations. Please try again.");
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      {/* Movie Card Area */}
      <div className="flex-1 flex items-center justify-center overflow-hidden">
        <AnimatePresence>
          {current && (
            <motion.div
              key={current.id}
              {...swipeHandlers}
              className="w-full max-w-md mx-auto"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
            >
              <Card item={current} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Chat input at bottom */}
      <ChatBar onSend={fetchRecommendations} />
    </div>
  );
};

export default App;
