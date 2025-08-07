'use client'

import Image from 'next/image'
import React, { useRef } from 'react'
import { gsap } from 'gsap'
import { useGSAP } from '@gsap/react'

export const LucioAquino = () => {
  const containerRef = useRef<HTMLDivElement>(null)
  const textRef = useRef<HTMLDivElement>(null)
  const imageRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    const tl = gsap.timeline({ delay: 13 }) // Delay global de encendido

    // Fase 1: Texto (tipo PS5)
    tl.fromTo(
      textRef.current,
      {
        opacity: 0,
        scale: 0.95,
        filter: 'blur(20px)',
      },
      {
        opacity: 1,
        scale: 1,
        filter: 'blur(0px)',
        duration: 2.2,
        ease: 'expo.out',
      }
    )

    // Fase 2: Imagen (con retardo luego del texto)
    tl.fromTo(
      imageRef.current,
      {
        opacity: 0,
        y: 30,
        scale: 0.9,
        filter: 'blur(10px)',
      },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        filter: 'blur(0px)',
        duration: 1.5,
        ease: 'power3.out',
      },
      '+=0.10' // pequeño delay luego del texto
    )
  }, [])

  return (
    <section
      ref={containerRef}
      className="absolute w-full h-100 items-center top-70 left-55 flex perspective-1000"
    >
      {/* Texto 3D */}
      <section ref={textRef}>
        <div className="holographic-cone">
          <div className="cone-layer cone-layer-1">
            <h1 className="text-3d-text">Lucio-</h1>
            <h1 className="text-3d-text">Aquino</h1>
          </div>
          <div className="cone-layer cone-layer-2">
            <h1 className="text-3d-text">Lucio-</h1>
            <h1 className="text-3d-text">Aquino</h1>
          </div>
          <div className="cone-layer cone-layer-3">
            <h1 className="text-3d-text">Lucio-</h1>
            <h1 className="text-3d-text">Aquino</h1>
          </div>
        </div>
      </section>

      {/* Imagen redonda */}
      <section
        ref={imageRef}
        className="bg-[#FFEDD6] shadow-2xl shadow-[#635d55] w-70 h-70 flex justify-center items-center z-50 rounded-full"
      >
        <Image
          src="/profile.png"
          alt="Foto de perfil"
          width={300}
          height={300}
          className="brightness-10 w-50 h-50"
        />
      </section>

      {/* Estilos */}
      <style jsx>{`
        @import url('https://fonts.googleapis.com/css2?family=Electrolize&display=swap');

        .holographic-cone {
          position: relative;
          transform-style: preserve-3d;
          animation: rotate-cone 20s infinite linear;
          left: 300px;
          top: -70px;
        }

        .cone-layer {
          position: absolute;
          display: flex;
          color: #ffedd6;
          transition: all 0.3s ease;
        }

        .cone-layer-1 {
          animation: floatZ1 6s ease-in-out infinite;
          opacity: 1;
          filter: blur(0.8px);
        }

        .cone-layer-2 {
          animation: floatZ2 7s ease-in-out infinite;
          opacity: 0.7;
          filter: blur(10px);
        }

        .cone-layer-3 {
          animation: floatZ3 8s ease-in-out infinite;
          opacity: 0;
          filter: blur(1px);
        }

        .text-3d-text {
          font-family: 'Electrolize', sans-serif;
          font-size: 7rem;
          font-weight: 800;
          text-transform: uppercase;
          margin: 0 0.5rem;
        }
      `}</style>
    </section>
  )
}
