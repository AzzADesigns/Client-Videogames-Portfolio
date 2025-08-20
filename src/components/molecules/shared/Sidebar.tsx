'use client'

import Link from 'next/link'
import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { FaEnvelope, FaHome, FaUserAlt } from 'react-icons/fa'
import { PiGameControllerBold } from 'react-icons/pi'
import { fadeUpStagger } from '../../../animations/fadeUpStagger'
import NavIcon from '../../atoms/NavItem'
import Tooltip from '../../atoms/Toolip'


export default function Sidebar() {
  const buttonsRef = useRef<HTMLAnchorElement[]>([])

  useGSAP(() => {
    fadeUpStagger(buttonsRef.current, 10)
  }, [])

  const navItems = [
    { href: '/', icon: <NavIcon Icon={FaHome} />, label: 'Inicio' },
    { href: '/proyects', icon: <NavIcon Icon={PiGameControllerBold} />, label: 'Proyectos' },
    { href: '/about-me', icon: <NavIcon Icon={FaUserAlt} />, label: 'Sobre mí' },
    { href: '/contacto', icon: <NavIcon Icon={FaEnvelope} />, label: 'Contacto' },
  ]

  return (
    <nav className="px-8 md:px-30 z-50 xl:backdrop-blur-3xl xl:px-0 xl:h-screen xl:items-center xl:justify-center xl:gap-25 w-full fixed bottom-5 xl:bottom-0 xl:left-5 flex xl:flex-col justify-between xl:w-25">
      {navItems.map((item, idx) => (
        <Link
          key={item.href}
          href={item.href}
          className="relative p-4 h-16 w-16 rounded-full flex justify-center items-center transition-transform duration-300 will-change-transform hover:!scale-125 group hover:z-50 animated-border"
          aria-label={item.label}
          tabIndex={0}
          ref={(el: HTMLAnchorElement | null) => {
            if (el) buttonsRef.current[idx] = el
          }}
        >
          {item.icon}
          <Tooltip label={item.label} />
        </Link>
      ))}
    </nav>
  )
}
