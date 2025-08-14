"use client";
import React, { useRef, useState, useEffect } from "react";
import Image from "next/image";
import gsap from "gsap";
import Lenis from "@studio-freight/lenis";

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

  // Resalta la primera al montar
  useEffect(() => {
    highlightCard(0);
  }, []);

  // Lenis para suavizado sin romper layout
  useEffect(() => {
    const lenis = new Lenis({
    smooth: true,
    smoothWheel: true,
    orientation: 'horizontal',
    });

    const container = scrollRef.current;
    if (!container) return;

    // Reemplaza el scroll horizontal de la rueda
    const handleWheel = (e: WheelEvent) => {
      if (e.deltaY !== 0) {
        e.preventDefault();
        const speed = 0.6;
        container.scrollLeft += e.deltaY * speed;
      }
    };

    container.addEventListener("wheel", handleWheel, { passive: false });

    const raf = (time: number) => {
      lenis.raf(time);

      // Detecta índice según scroll
      const scrollLeft = container.scrollLeft;
      const cardWidth = cardRefs.current[0]?.offsetWidth || 0;
      const gap = 1;
      const total = cardWidth + gap;
      const idx = Math.round(scrollLeft / total);

      if (idx !== selectedIndex) {
        setSelectedIndex(idx);
        highlightCard(idx);
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
      <div className="flex w-[95%] h-screen ml-24 items-center justify-center">
        <div
          ref={scrollRef}
          className="flex flex-nowrap gap-5 h-full items-center overflow-x-auto overflow-y-hidden scrollbar-hide"
        >
          {Array.from({ length: 11 }, (_, i) => (
            <div
              key={i}
              ref={(el) => {
                if (el) cardRefs.current[i] = el;
              }}
              className="h-90 w-180 flex-shrink-0 ml-20 overflow-hidden rounded-2xl relative"
            >
              <Image
                src={`/juego${i + 1}.png`}
                alt={`Juego ${i + 1}`}
                width={560}
                height={560}
                className="w-full h-full object-cover rounded-2xl"
                quality={100}
              />
              <span className="absolute bottom-2 w-full text-center text-white font-bold">
                Juego {i + 1}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
