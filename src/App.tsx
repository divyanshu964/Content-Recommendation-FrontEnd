import React, { useState } from "react";
import Card from "./components/Card";
import type { MovieItem } from "./types";
import ChatBar from "./components/ChatBar";
import { useRecommendations } from "./hooks/useRecommendations";
import { AnimatePresence, motion } from "framer-motion";

const App: React.FC = () => {
  const [results, setResults] = useState<MovieItem[]>([]);
  const { current, swipeHandlers } = useRecommendations(results);
  const [loading, setLoading] = useState(false);

  const API_URL =
    import.meta.env.MODE === "development"
      ? import.meta.env.VITE_API
      : "https://nodejs-production-0625.up.railway.app/webhook/Content";

  const fetchRecommendations = async (query: string) => {
    setLoading(true);
    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user_query: query, region: "IN" }),
      });
      if (!response.ok) throw new Error("Failed fetch");

      const raw = await response.json();
      let data: any = { results: [] };

      if (raw.results) data = raw;
      else if (raw.text) {
        try {
          data = JSON.parse(raw.text.replace(/```json|```/g, "").trim());
        } catch {
          data = { results: [] };
        }
      }

      setResults(data.results || []);
      if (!data.results?.length) alert("No recommendations found");
    } catch (e) {
      console.error(e);
      alert("Error fetching recommendations");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      {/* Main content */}
      <div className="relative flex-1 w-full h-full">
        {/* Loading */}
        {loading && (
          <div className="absolute inset-0 flex justify-center items-center">
            <div className="animate-spin h-12 w-12 border-b-2 border-gray-800 rounded-full"></div>
          </div>
        )}

        {/* Card display */}
        <AnimatePresence>
          {current && swipeHandlers && !loading && (
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[90vw] max-w-[500px]">
              <motion.div
                key={current.id}
                {...swipeHandlers}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -50 }}
              >
                <Card item={current} />
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>

      {/* Chat input */}
      <div className="p-3 sm:p-4 md:p-6 border-t bg-white shadow-lg">
        <div className="max-w-4xl mx-auto w-full">
          <ChatBar onSend={fetchRecommendations} />
        </div>
      </div>
    </div>
  );
};

export default App;
