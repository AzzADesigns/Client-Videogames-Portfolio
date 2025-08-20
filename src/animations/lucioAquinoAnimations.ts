import { gsap } from 'gsap'

type LucioRefs = {
  textRef: HTMLElement | null
  imageRef: HTMLElement | null
}

/**
 * Aplica animación tipo PS5: texto + imagen con retardo.
 */
export const playLucioAnimation = ({ textRef, imageRef }: LucioRefs) => {
  const tl = gsap.timeline({ delay: 7 })

  // Fase 1: Texto
  tl.fromTo(
    textRef,
    { opacity: 0, scale: 0.95, filter: 'blur(20px)' },
    { opacity: 1, scale: 1, filter: 'blur(0px)', duration: 2, ease: 'expo.out' }
  )

  // Fase 2: Imagen
  tl.fromTo(
    imageRef,
    { opacity: 0, y: 30, scale: 0.9, filter: 'blur(10px)' },
    { opacity: 1, y: 0, scale: 1, filter: 'blur(0px)', duration: 1.5, ease: 'power3.out' },
    '-=0.10'
  )
}
