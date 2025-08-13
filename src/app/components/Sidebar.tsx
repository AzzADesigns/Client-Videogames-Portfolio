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
      icon: <FaHome className="text-2xl text-orange-400 hover:text-orange-300 transition-colors" />, 
      label: 'Inicio',
    },
    {
      href: '/proyectos',
      icon: <PiGameControllerBold className="text-2xl z-50 text-yellow-400 hover:text-yellow-300 transition-colors" />, 
      label: 'Proyectos',
    },
    {
      href: '/sobre-mi',
      icon: <FaUserAlt className="text-2xl text-blue-400 hover:text-blue-300 transition-colors" />, 
      label: 'Sobre mí',
    },
    {
      href: '/contacto',
      icon: <FaEnvelope className="text-2xl text-white hover:text-blue-200 transition-colors" />, 
      label: 'Contacto',
    },
  ];

  return (
    <nav className="px-8 md:px-30 z-50 xl:px-0 xl:h-screen xl:items-center xl:justify-center xl:gap-25 w-full fixed bottom-5 xl:left-8 flex xl:flex-col justify-between xl:w-auto">
      {navItems.map((item, idx) => (
        <Link
          key={item.href}
          href={item.href}
          className="relative border-2 p-4 rounded-full group"
          aria-label={item.label}
          tabIndex={0}
          ref={(el: HTMLAnchorElement | null) => {
            if (el) buttonsRef.current[idx] = el
          }}
        >
          {item.icon}

          {/* Tooltip */}
          <span className="
            absolute bottom-full mb-2 left-[230%] top-3  transform -translate-x-1/2
            opacity-0 pointer-events-none
            bg-gray-900 text-white text-lg h-8 w-30 flex justify-center items-center rounded
            whitespace-nowrap
            transition-opacity duration-300
            group-hover:opacity-100
            select-none
            z-50
          ">
            {item.label}
          </span>
        </Link>
      ))}
    </nav>
  )
}
