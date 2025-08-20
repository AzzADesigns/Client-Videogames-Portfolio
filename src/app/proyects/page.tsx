"use client";
import React, { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { useHorizontalScroll } from "@/hooks/useHorizonatScroll";
import { useInfiniteCarousel } from "@/hooks/useInfiniteCarousel";
import { useCardStyles } from "@/hooks/useCardStyles";




export default function Page() {
  const scrollRef = useRef<HTMLDivElement | null>(null);

  useHorizontalScroll(scrollRef);

  const totalGames = 11;
  const duplicateCount = 3;
  const games = Array.from({ length: totalGames }, (_, i) => i);
  const displayGames = [...games, ...games.slice(0, duplicateCount)];

  const { selectedIndex, cardRefs } = useInfiniteCarousel(scrollRef, totalGames);

  // hook de estilos dinámicos para las cartas
  const getCardStyles = useCardStyles(selectedIndex);

  const [isGameSelectionActive, setIsGameSelectionActive] = useState(false);

  useEffect(() => {
    setIsGameSelectionActive(true);
    return () => setIsGameSelectionActive(false);
  }, []);

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
