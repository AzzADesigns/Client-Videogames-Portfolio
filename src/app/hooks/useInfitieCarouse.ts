import { useEffect, useRef, useState, useCallback } from "react";

export function useInfiniteCarousel(
  scrollRef: React.RefObject<HTMLDivElement>,
  totalGames: number
) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const cardRefs = useRef<HTMLDivElement[]>([]);
  const clickAudio = useRef<HTMLAudioElement | null>(null);
  const lastPlayedIndex = useRef<number | null>(null);

  // Cargar sonido
  useEffect(() => {
    clickAudio.current = new Audio("/click.wav");
  }, []);

  const updateSelectedIndex = useCallback(() => {
    const container = scrollRef.current;
    if (!container) return;

    const cardWidth = cardRefs.current[0]?.offsetWidth || 0;
    const gap = 5;
    const total = cardWidth + gap;
    const scrollLeft = container.scrollLeft;

    let idx = Math.round(scrollLeft / total);

    // scroll infinito
    if (idx >= totalGames) {
      container.scrollLeft = (idx - totalGames) * total;
      idx = idx - totalGames;
    }
    if (idx < 0) {
      container.scrollLeft = (idx + totalGames) * total;
      idx = idx + totalGames;
    }

    if (idx !== selectedIndex) {
      setSelectedIndex(idx);

      if (clickAudio.current && lastPlayedIndex.current !== idx) {
        clickAudio.current.pause();
        clickAudio.current.currentTime = 0;
        clickAudio.current.play().catch(() => {});
        lastPlayedIndex.current = idx;
      }
    }

    requestAnimationFrame(updateSelectedIndex);
  }, [scrollRef, selectedIndex, totalGames]);

  useEffect(() => {
    const id = requestAnimationFrame(updateSelectedIndex);
    return () => cancelAnimationFrame(id);
  }, [updateSelectedIndex]);

  return { selectedIndex, cardRefs };
}
