'use client';

import { useEffect, useRef } from 'react';

export default function Background() {
  const textRef = useRef<HTMLDivElement>(null);

  // Opcional: Efecto de animación suave
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (textRef.current) {
        const x = e.clientX / window.innerWidth - 0.5;
        const y = e.clientY / window.innerHeight - 0.5;
        textRef.current.style.transform = `rotateY(${x * 20}deg) rotateX(${y * -20}deg)`;
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="fixed inset-0 z-[-1] overflow-hidden">
      {/* Video de fondo (igual que tu versión original) */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src="/background.mp4" type="video/mp4" />
        Tu navegador no soporta video HTML5.
      </video>

      {/* Contenedor del texto 3D con CSS */}
      <div className="absolute inset-0  flex items-center rounded-2xl justify-center">
        <div 
          ref={textRef}
          className="text-3d backdrop-blur-2xl px-20 shadow-2xl  rounded-2xl " 
          style={{
            transformStyle: 'preserve-3d',
            transition: 'transform 0.1s ease-out',
            boxShadow: `
                0 0 10px #FFBCAC,
                0 0 20px #FFBCAC,
                0 0 30px #FFBCAC,
                0 0 40px #E04635,
                0 0 70px #E04635,
                0 0 80px #E04635
              `,
              textShadow: `
                0 0 5px #FFBCAC,
                0 0 10px #FFBCAC,
                0 0 15px #E04635
              `,
              border: '1px solid rgba(255, 188, 172, 0.3)'
          }}
        >
          <h1 className="text-3d-text">Lucio-</h1>
          <h1 className="text-3d-text">Aquino</h1>
        </div>
      </div>
    </div>
  );
}