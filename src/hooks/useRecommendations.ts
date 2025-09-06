// src/hooks/useRecommendations.ts
import { useState } from "react";
import { useSwipeable } from "react-swipeable";
import { type MovieItem } from "../components/Card";

export function useRecommendations(items: MovieItem[] = []) {
  const [index, setIndex] = useState(0);
  const [accepted, setAccepted] = useState<MovieItem[]>([]);

  const handleSwipe = (dir: "left" | "right") => {
    if (dir === "right" && items[index]) {
      setAccepted((prev) => [...prev, items[index]]);
    }
    setIndex((prev) => prev + 1);
  };

  const swipeHandlers = useSwipeable({
    onSwipedLeft: () => handleSwipe("left"),
    onSwipedRight: () => handleSwipe("right"),
    trackMouse: true,
    preventScrollOnSwipe: true, // replaces preventDefaultTouchmoveEvent
});
  const current = items[index];
  return { current, swipeHandlers, index, accepted };
}
