import { gsap } from 'gsap'

export const fadeUpStagger = (elements: HTMLElement[], delay = 0) => {
  return gsap.fromTo(
    elements,
    { opacity: 0, y: 40 },
    {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: 'power3.out',
      stagger: 0.5,
      delay,
    }
  )
}