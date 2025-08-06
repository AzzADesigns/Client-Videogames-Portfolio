'use client'

import React from 'react'

export const LucioAquino = () => {
  return (
    <div className="absolute top-70 left-75 flex perspective-1000">
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

      <style jsx>{`
        .perspective-1000 {
          perspective: 1000px;
        }

        .holographic-cone {
          position: relative;
          transform-style: preserve-3d;
          animation: rotate-cone 20s infinite linear;
        }

        .cone-layer {
          position: absolute;
          display: flex;
          color: rgba(255, 188, 164, 1);
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
          opacity: 0.0;
          filter: blur(1px);
        }

        .text-3d-text {
          font-size: 7rem;
          font-weight: 800;
          text-transform: uppercase;
          margin: 0 0.5rem;
        }

        @keyframes rotate-cone {
          0% {
            transform: rotateX(60deg) rotateY(0deg);
          }
          100% {
            transform: rotateX(60deg) rotateY(0deg);
          }
        }


      `}</style>
    </div>
  )
}
