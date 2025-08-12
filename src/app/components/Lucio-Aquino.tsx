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
    const tl = gsap.timeline({ delay: 7 }) // Delay global de encendido

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
        duration: 2,
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
      '-=0.10' // pequeño delay luego del texto
    )
  }, [])

  return (
    <section
      ref={containerRef}
      className="xl:absolute xl:w-full right-8 xl:right-0  xl:h-100 justify-center items-center top-60 xl:top-70 flex flex-col xl:flex-row-reverse"
    >
      {/* Texto 3D */}
      <section ref={textRef}>
        <div className="">
          <div className="cone-layer flex mb-10 xl:mb-0 xl:ml-10 cone-layer-1 gap-5 font-electrolize text-[#ffedd6] text-6xl xl:text-9xl">
            <h1 className="text-3d-text text-shadow">Lucio</h1>
            <h1 className="text-3d-text text-shadow">Aquino</h1>
          </div>
        </div>
      </section>

      {/* Imagen redonda */}
      <section
        ref={imageRef}
        className="bg-[#FFEDD6] shadow-2xl shadow-[#635d55] w-50 h-50 xl:w-70 xl:h-70 flex justify-center items-center z-50 rounded-full"
      >
        <Image
          src="/profile.png"
          alt="Foto de perfil"
          width={150}
          height={150}
          className="brightness-10 xl:w-50 xl:h-50"
        />
      </section>
    </section>
  )
}
