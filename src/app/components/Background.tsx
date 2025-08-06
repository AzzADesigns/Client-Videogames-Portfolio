'use client';

import { useEffect, useRef } from 'react';

export default function Background() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 0.5;
    }
  }, []);

  return (
    <div className="fixed inset-0 z-[-1] overflow-hidden">
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover blur-lg"
      >
        <source src="/background2.mp4" type="video/mp4" />
        Tu navegador no soporta video HTML5.
      </video>
    </div>
  );
}
