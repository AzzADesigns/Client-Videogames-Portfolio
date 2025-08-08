'use client';

import { useEffect, useRef } from 'react';

export default function Background() {
    const videoRef = useRef<HTMLVideoElement>(null);
    const rafRef = useRef<number>(null);

    useEffect(() => {
        const video = videoRef.current;
        if (!video) return;

        const totalDuration = 8;

        const updatePlaybackRate = () => {
            if (!video) return;

            const t = video.currentTime;

            let rate = 1;

            if (t < 5) {
                // Aceleración suave: de 0.4x a 2x
                rate = 0.9 + (1.6 * (t / 5)) ** 1.5;
            } else if (t < 15) {
                // Velocidad constante alta
                rate = 2;
            } else if (t <= totalDuration) {
                // Desaceleración suave: de 2x a 0.5x
                const progress = (t - 15) / 5;
                rate = 2 - (1.5 * progress ** 1.5);
            } else {
                // Si por alguna razón sigue corriendo, mantener mínimo
                rate = 0.5;
            }

            video.playbackRate = rate;

            rafRef.current = requestAnimationFrame(updatePlaybackRate);
        };

        rafRef.current = requestAnimationFrame(updatePlaybackRate);

        return () => {
            if (rafRef.current) {
                cancelAnimationFrame(rafRef.current);
            }
        };
    }, []);

    return (
        <div className="fixed inset-0 z-[-1] overflow-hidden">
            <video
                ref={videoRef}
                autoPlay
                muted
                playsInline
                className="absolute inset-0 w-full h-full object-cover"
            >
                <source src="/background.mp4" type="video/mp4" />
                Tu navegador no soporta video HTML5.
            </video>
        </div>
    );
}
