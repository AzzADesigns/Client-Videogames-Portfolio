"use client";
import React, { useRef, useState, useEffect } from "react";
import Image from "next/image";
import Lenis from "@studio-freight/lenis";

export default function Page() {
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const cardRefs = useRef<HTMLDivElement[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const totalGames = 11;
  const duplicateCount = 3; // elementos duplicados al final
  const games = Array.from({ length: totalGames }, (_, i) => i);
  const displayGames = [...games, ...games.slice(0, duplicateCount)];

  const clickAudio = useRef<HTMLAudioElement | null>(null);
  const lastPlayedIndex = useRef<number | null>(null);

  useEffect(() => {
    clickAudio.current = new Audio("/click.wav"); // tu audio
  }, []);

  useEffect(() => {
    const lenis = new Lenis({
      smoothWheel: true,
      orientation: "horizontal",
    });

    const container = scrollRef.current;
    if (!container) return;

    // Scroll horizontal con la rueda
    const handleWheel = (e: WheelEvent) => {
      if (e.deltaY !== 0) {
        e.preventDefault();
        const speed = 0.5;
        container.scrollLeft += e.deltaY * speed;
      }
    };

    container.addEventListener("wheel", handleWheel, { passive: false });

    const raf = (time: number) => {
      lenis.raf(time);

      const scrollLeft = container.scrollLeft;
      const cardWidth = cardRefs.current[0]?.offsetWidth || 0;
      const gap = 1;
      const total = cardWidth + gap;

      let idx = Math.round(scrollLeft / total);

      // Circular scroll: reset al llegar al final
      if (idx >= totalGames) {
        container.scrollLeft = (idx - totalGames) * total;
        idx = idx - totalGames;
      }
      if (idx < 0) {
        container.scrollLeft = (idx + totalGames) * total;
        idx = idx + totalGames;
      }

      // Cambio de selección
      if (idx !== selectedIndex) {
        setSelectedIndex(idx);

        // Reproducir sonido solo una vez por índice
        if (clickAudio.current && lastPlayedIndex.current !== idx) {
          clickAudio.current.pause();
          clickAudio.current.currentTime = 0;
          clickAudio.current.play().catch(() => {});
          lastPlayedIndex.current = idx;
        }
      }

      requestAnimationFrame(raf);
    };

    requestAnimationFrame(raf);

    return () => {
      container.removeEventListener("wheel", handleWheel);
      lenis.destroy();
    };
  }, [selectedIndex]);

  return (
    <div className="w-screen h-screen flex flex-col items-center justify-center">
      <div className="flex w-full xl:w-[95%] h-screen ml-24 items-center justify-center">
        <div
          ref={scrollRef}
          className="flex flex-nowrap gap-5 h-full pl-30 items-center overflow-x-auto overflow-y-hidden scrollbar-hide"
        >
          {displayGames.map((i, index) => (
            <div
              key={index}
              ref={(el) => {
                if (el && index < totalGames) cardRefs.current[index] = el;
              }}
              className={`h-90 w-160 flex-shrink-0 overflow-hidden 2xl:ml-15 rounded-2xl relative transition-all duration-300 ${
                index % totalGames === selectedIndex
                  ? " z-50 scale-125 border-background border-4 border-select-play p-2"
                  : "z-[-1]"
              }`}
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
          ))}
        </div>
      </div>
    </div>
  );
}
