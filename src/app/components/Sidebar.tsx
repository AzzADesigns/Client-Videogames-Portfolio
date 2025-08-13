'use client'

import Link from 'next/link'
import { FaEnvelope, FaHome, FaUserAlt } from 'react-icons/fa'
import { PiGameControllerBold } from 'react-icons/pi'
import { useRef } from 'react'
import { gsap } from 'gsap'
import { useGSAP } from '@gsap/react'

export default function Sidebar() {
  const buttonsRef = useRef<HTMLAnchorElement[]>([])

  useGSAP(() => {
    gsap.fromTo(
      buttonsRef.current,
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power3.out',
        stagger: 0.5,
        delay: 10,
      }
    )
  }, [])

const navItems = [
  {
    href: '/',
    icon: <FaHome className="text-4xl text-background hover:text-background transition-colors icon-rgb" />,
    label: 'Inicio',
  },
  {
    href: '/proyectos',
    icon: <PiGameControllerBold className="text-4xl z-50 text-background hover:text-background/50 transition-colors icon-rgb" />,
    label: 'Proyectos',
  },
  {
    href: '/sobre-mi',
    icon: <FaUserAlt className="text-4xl text-background hover:text-background transition-colors icon-rgb" />,
    label: 'Sobre mí',
  },
  {
    href: '/contacto',
    icon: <FaEnvelope className="text-4xl text-background hover:text-background transition-colors icon-rgb" />,
    label: 'Contacto',
  },
];

  return (
    <nav className="px-8 md:px-30 z-50 backdrop-blur-2xl  xl:px-0 xl:h-screen xl:items-center xl:justify-center xl:gap-25 w-full fixed bottom-5 xl:left-5 flex xl:flex-col justify-between xl:w-25"> {/* group aquí */}
      {navItems.map((item, idx) => (
        <Link
          key={item.href}
          href={item.href}
          className="relative p-4 h-16 w-16  rounded-full flex justify-center items-center transition-transform duration-300 will-change-transform hover:!scale-125 group hover:z-50 animated-border"
          aria-label={item.label}
          tabIndex={0}
          ref={(el: HTMLAnchorElement | null) => {
            if (el) buttonsRef.current[idx] = el
          }}
        >
          {item.icon}
        
          {/* Tooltip */}
          <span className="
            absolute  mb-2 lg:left-30 top-[-30]  left-8 lg:top-5 transform -translate-x-1/2
            text-lg whitespace-nowrap select-none z-50
            tooltip-rgb-text flex items-start  justify-center
          ">
            {item.label}
          </span>

        </Link>
      ))}
    </nav>
  )
}
