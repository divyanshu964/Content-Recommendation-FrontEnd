// src/components/Card.tsx
import React from "react";

export interface MovieItem {
  id: string;
  title: string;
  year?: number;
  poster: string;
  genres: string[];
  why_this: string;
  platforms?: string[];
  tmdb_url?: string;
  rating?: number;
}

interface CardProps {
  item: MovieItem;
}

const Card: React.FC<CardProps> = ({ item }) => {
  return (
    <div className="bg-white shadow-lg rounded-2xl p-4 max-w-md w-full mx-auto">
      <img src={item.poster} alt={item.title} className="rounded-xl mb-4 w-full" />
      <h2 className="text-xl font-semibold mb-1">
        {item.title} <span className="text-gray-500">({item.year})</span>
      </h2>
      <p className="text-sm text-gray-500 mb-2">{item.genres.join(", ")}</p>
      <p className="text-gray-700 mb-2">{item.why_this}</p>
      {item.platforms?.length && (
        <p className="text-sm text-gray-600">Available on: {item.platforms.join(", ")}</p>
      )}
      {item.tmdb_url && (
        <a href={item.tmdb_url} target="_blank" rel="noreferrer" className="text-blue-600 text-sm mt-2 inline-block">
          More details →
        </a>
      )}
    </div>
  );
};

export default Card;
