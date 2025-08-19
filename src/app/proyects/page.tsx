"use client";
import React, { useRef, useState, useEffect } from "react";
import Image from "next/image";

export default function Page() {
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const cardRefs = useRef<HTMLDivElement[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isGameSelectionActive, setIsGameSelectionActive] = useState(false);

  const totalGames = 11;
  const duplicateCount = 3;
  const games = Array.from({ length: totalGames }, (_, i) => i);
  const displayGames = [...games, ...games.slice(0, duplicateCount)];

  const clickAudio = useRef<HTMLAudioElement | null>(null);
  const lastPlayedIndex = useRef<number | null>(null);

  useEffect(() => {
    clickAudio.current = new Audio("/click.wav");
  }, []);

  useEffect(() => {
    setIsGameSelectionActive(true);
    return () => setIsGameSelectionActive(false);
  }, []);

  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    const handleWheel = (e: WheelEvent) => {
      if (e.deltaY !== 0) {
        e.preventDefault();
        const speed = 0.5; // velocidad de scroll
        container.scrollLeft += e.deltaY * speed;
      }
    };

    container.addEventListener("wheel", handleWheel, { passive: false });

    const updateSelectedIndex = () => {
      const scrollLeft = container.scrollLeft;
      const cardWidth = cardRefs.current[0]?.offsetWidth || 0;
      const gap = 5;
      const total = cardWidth + gap;

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
    };

    requestAnimationFrame(updateSelectedIndex);

    return () => {
      container.removeEventListener("wheel", handleWheel);
    };
  }, [selectedIndex]);

  const getCardStyles = (index: number) => {
    const relativeIndex = index - selectedIndex;

    if (relativeIndex < 0) {
      return {
        transform: `translateX(-100%) scale(0.9)`,
        opacity: 0,
        zIndex: 0,
        border: "none",
        padding: 0,
      };
    } else if (relativeIndex === 0) {
      return {
        transform: `translateX(0px) scale(1.25)`,
        opacity: 1,
        zIndex: 50,
        border: "4px solid #FFEDD6",
        padding: "0.5rem",
      };
    } else {
      const translateX = relativeIndex * 160;
      return {
        transform: `translateX(${translateX}px) scale(0.9)`,
        opacity: 1,
        zIndex: 10,
        border: "none",
        padding: 0,
      };
    }
  };

  return (
    <div className="w-screen h-[100vh] xl:h-screen flex flex-col items-center justify-center relative">
      {/* Fondo dinámico */}
      <div className="fixed inset-0 z-[-1] h-[100vh] xl:h-screen overflow-hidden">
        {isGameSelectionActive && selectedIndex !== null && (
          <Image
            src={`/juego${selectedIndex + 1}.png`}
            alt={`Fondo Juego ${selectedIndex + 1}`}
            fill
            priority
            className="object-cover blur-xs scale-110 brightness-40"
          />
        )}
      </div>

      <div className="flex w-full xl:w-[95%] z-10 h-screen xl:ml-18 2xl:ml-24 items-center justify-center relative">
        <div
          ref={scrollRef}
          className="relative flex flex-nowrap xl:ml-15 2xl:ml-6 h-full pl-30 items-center overflow-x-auto overflow-y-hidden scrollbar-hide"
        >
          {displayGames.map((i, index) => {
            const style = getCardStyles(index);
            return (
              <div
                key={index}
                ref={(el) => {
                  if (el && index < totalGames) cardRefs.current[index] = el;
                }}
                className="xl:h-90 mb-30 xl:mb-0 xl:w-160 w-80 flex-shrink-0 overflow-hidden rounded-2xl relative transition-all duration-300"
                style={{
                  transform: style.transform,
                  opacity: style.opacity,
                  zIndex: style.zIndex,
                  border: style.border,
                  padding: style.padding,
                }}
              >
                <Image
                  src={`/juego${(i % totalGames) + 1}.png`}
                  alt={`Juego ${(i % totalGames) + 1}`}
                  width={560}
                  height={560}
                  className="w-full h-full object-cover rounded-2xl"
                  quality={100}
                />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
