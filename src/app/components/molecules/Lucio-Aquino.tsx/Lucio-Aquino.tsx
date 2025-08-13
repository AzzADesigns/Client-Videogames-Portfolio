'use client'

import Image from 'next/image'
import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { playLucioAnimation } from '../../animations/lucioAquinoAnimations'


export const LucioAquino = () => {
  const containerRef = useRef<HTMLDivElement>(null)
  const textRef = useRef<HTMLDivElement>(null)
  const imageRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    playLucioAnimation({ textRef: textRef.current, imageRef: imageRef.current })
  }, [])

  return (
    <section
      ref={containerRef}
      className="absolute xl:w-full xl:right-0 xl:h-100 justify-center items-center top-30 2xl:top-70 xl:top-45 md:top-30 flex flex-col xl:flex-row-reverse"
    >
      {/* Texto */}
      <section ref={textRef}>
        <div className="cone-layer flex mb-10 xl:mb-0 xl:ml-10 cone-layer-1 gap-5 font-electrolize text-[#ffedd6] text-6xl md:text-8xl xl:text-9xl">
          <h1 className="text-3d-text text-shadow">Lucio</h1>
          <h1 className="text-3d-text text-shadow">Aquino</h1>
        </div>
      </section>

      {/* Imagen redonda */}
      <section
        ref={imageRef}
        className="bg-background shadow-2xl shadow-[#635d55] w-75 h-75 xl:w-70 xl:h-70 flex justify-center items-center z-40 rounded-full"
      >
        <Image
          src="/profile.png"
          alt="Foto de perfil"
          width={250}
          height={250}
          className="brightness-10 xl:w-50 xl:h-50"
        />
      </section>
    </section>
  )
}
