"use client";
import React, { useRef, useState, useEffect } from "react";
import Image from "next/image";
import gsap from "gsap";

export default function Page() {
    const scrollRef = useRef<HTMLDivElement | null>(null);
    const cardRefs = useRef<HTMLDivElement[]>([]);
    const [selectedIndex, setSelectedIndex] = useState(0);

  // Resalta la tarjeta seleccionada
    const highlightCard = (index: number) => {
      cardRefs.current.forEach((card, i) => {
        if (!card) return;
        gsap.to(card, {
          scale: i === index ? 1.1 : 1,
          boxShadow:
            i === index
              ? "0 0 20px rgb(255,0,255), 0 0 40px rgb(0,255,255)"
              : "none",
          duration: 0.3,
        });
      });
    };

  // Detección del índice según el scroll actual
  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    const handleScroll = () => {
      const scrollLeft = container.scrollLeft;
      const cardWidth = cardRefs.current[0]?.offsetWidth || 0;
      const gap = 80; // gap-20 de Tailwind
      const total = cardWidth + gap;
      const idx = Math.round(scrollLeft / total);

      if (idx !== selectedIndex) {
        setSelectedIndex(idx);
        highlightCard(idx);
      }
    };

    container.addEventListener("scroll", handleScroll);
    return () => container.removeEventListener("scroll", handleScroll);
  }, [selectedIndex]);

  // Scroll con la rueda -> mover en X
  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    const handleWheel = (e: WheelEvent) => {
      if (e.deltaY !== 0) {
        e.preventDefault(); // evita scroll vertical de la página
        const speed = 1; // ajustá si querés más/menos sensible
        container.scrollLeft += e.deltaY * speed;
      }
    };

    container.addEventListener("wheel", handleWheel, { passive: false });
    return () => container.removeEventListener("wheel", handleWheel);
  }, []);

  // Resalta la primera al montar
  useEffect(() => {
    highlightCard(0);
  }, []);

  return (
    <div className="w-screen h-screen flex flex-col items-center justify-center">
      <div className="flex w-[80%] h-150 items-center justify-center">
        <div
          ref={scrollRef}
          className="flex flex-nowrap gap-20 h-150 items-center overflow-x-auto overflow-y-hidden scrollbar-hide"
        >
          {Array.from({ length: 11 }, (_, i) => (
            <div
              key={i}
              ref={(el) => {
                if (el) cardRefs.current[i] = el;
              }}
              className="h-90 w-180 flex-shrink-0 ml-20 bg-red-300 overflow-hidden rounded-2xl"
            >
              <Image
                src={`/juego${i + 1}.png`}
                alt={`Juego ${i + 1}`}
                width={560}
                height={560}
                className="w-full h-full object-cover rounded-2xl"
                quality={100}
              />
              <span className="bg-red-300 block text-center">
                Juego {i + 1}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
