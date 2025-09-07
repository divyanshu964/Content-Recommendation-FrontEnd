import { useState } from "react";
import { useSwipeable } from "react-swipeable";
import { type MovieItem } from "../components/Card";

export function useRecommendations(items: MovieItem[] = []) {
  const [index, setIndex] = useState(0);
  const [accepted, setAccepted] = useState<MovieItem[]>([]);
  const [rejected, setRejected] = useState<MovieItem[]>([]);

  const handleSwipe = (dir: "left" | "right") => {
    if (!items[index]) return; // avoid overflow

    if (dir === "right") {
      setAccepted((prev) => [...prev, items[index]]);
    } else {
      setRejected((prev) => [...prev, items[index]]);
    }

    setIndex((prev) => Math.min(prev + 1, items.length)); // cap at length
  };

  const reset = () => {
    setIndex(0);
    setAccepted([]);
    setRejected([]);
  };

  const swipeHandlers = useSwipeable({
    onSwipedLeft: () => handleSwipe("left"),
    onSwipedRight: () => handleSwipe("right"),
    trackMouse: true,
    preventScrollOnSwipe: true,
  });

  const current = items[index];
  const hasMore = index < items.length;

  return { current, swipeHandlers, index, accepted, rejected, hasMore, reset };
}
