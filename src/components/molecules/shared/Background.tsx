'use client'

import { animateVideoPlayback } from "@/animations/videBackground"
import { useEffect, useRef } from "react"



export default function Background() {
    const videoRef = useRef<HTMLVideoElement>(null)

    useEffect(() => {
        const cancel = animateVideoPlayback(videoRef.current)
        return () => cancel?.()
    }, [])

    return (
        <div className="fixed h-[100vh] xl:h-screen inset-0 z-[-1] overflow-hidden">
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
    )
}
