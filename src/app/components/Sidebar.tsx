'use client'

import Link from 'next/link'
import { FaEnvelope, FaHome, FaUserAlt, FaPowerOff } from 'react-icons/fa'
import { PiGameControllerBold } from 'react-icons/pi'
import { useRef } from 'react'
import { gsap } from 'gsap'
import { useGSAP } from '@gsap/react'

export default function Sidebar() {
  const sidebarRef = useRef<HTMLDivElement>(null)
  const buttonsRef = useRef<HTMLAnchorElement[]>([])

  useGSAP(() => {


    // Animación escalonada para los botones
    gsap.fromTo(
      buttonsRef.current,
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power3.out',
        stagger: 0.5, // ⏳ delay entre cada botón
        delay: 10, // ⏳ sincronizado con el sidebar
      }
    )
  }, [])

  return (
    <aside
      ref={sidebarRef}
      className="xl:h-screen h-20 w-[85%] sticky bg-red-400 xl:w-25 ml-8 flex md:flex-col items-center justify-between py-6 px-2 shadow-xl"
    >
      <div className="flex relative flex-col items-center justify-center h-full gap-6 mt-2">
        {/* Avatar */}
        <section className="flex absolute top-0 w-75 p-0 h-20 gap-5 justify-center items-center left-0"></section>

        {/* Menú de íconos */}
        <nav className="flex md:flex-col h-full justify-between py-35 gap-7 items-center">
          <Link
            href="/"
            className="border-2 p-4 rounded-full"
            ref={(el) => el && (buttonsRef.current[0] = el)}
          >
            <FaHome className="text-2xl text-orange-400 hover:text-orange-300 transition-colors" />
          </Link>
          <Link
            href="/proyectos"
            className="border-2 p-4 rounded-full"
            ref={(el) => el && (buttonsRef.current[1] = el)}
          >
            <PiGameControllerBold className="text-2xl text-yellow-400 hover:text-yellow-300 transition-colors" />
          </Link>
          <Link
            href="/sobre-mi"
            className="border-2 p-4 rounded-full"
            ref={(el) => el && (buttonsRef.current[2] = el)}
          >
            <FaUserAlt className="text-2xl text-blue-400 hover:text-blue-300 transition-colors" />
          </Link>
          <Link
            href="/contacto"
            className="border-2 p-4 rounded-full"
            ref={(el) => el && (buttonsRef.current[3] = el)}
          >
            <FaEnvelope className="text-2xl text-white hover:text-blue-200 transition-colors" />
          </Link>
        </nav>
      </div>

    </aside>
  )
}
