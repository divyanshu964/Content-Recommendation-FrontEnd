import React, { useState } from "react";
import type { MovieItem } from "../types";

interface CardProps {
  item: MovieItem;
}

const Card: React.FC<CardProps> = ({ item }) => {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <div
      className="relative bg-white shadow-lg rounded-2xl overflow-hidden w-full cursor-pointer"
      onClick={() => setShowDetails(!showDetails)}
    >
      {/* Poster */}
      <div className="relative">
        <img
          src={item.poster}
          alt={item.title}
          className={`object-cover w-full h-96 transition duration-300 ${
            showDetails ? "blur-md scale-105" : ""
          }`}
        />

        {/* Desktop overlay */}
        {showDetails && (
          <div className="absolute inset-0 flex flex-col justify-center items-center bg-black/60 text-white p-6">
            <h2 className="text-2xl font-semibold mb-2">
              {item.title} {item.year && <span className="text-gray-300">({item.year})</span>}
            </h2>
            {item.genres?.length > 0 && (
              <p className="text-sm text-gray-300 mb-2">{item.genres.join(", ")}</p>
            )}
            <p className="text-sm md:text-base mb-4">{item.why_this}</p>
            {item.platforms?.length > 0 && (
              <p className="text-sm mb-2">Available on: {item.platforms.join(", ")}</p>
            )}
            {item.tmdb_url && (
              <a
                href={item.tmdb_url}
                target="_blank"
                rel="noreferrer"
                className="text-blue-400 underline text-sm"
              >
                More details →
              </a>
            )}
          </div>
        )}
      </div>

      {/* Mobile fallback */}
      <div className="p-4 md:hidden">
        <h2 className="text-lg font-semibold">
          {item.title} {item.year && <span className="text-gray-500">({item.year})</span>}
        </h2>
        {item.genres?.length > 0 && (
          <p className="text-sm text-gray-500">{item.genres.join(", ")}</p>
        )}
        <p className="text-gray-700 text-sm mt-2">{item.why_this}</p>
      </div>
    </div>
  );
};

export default Card;
