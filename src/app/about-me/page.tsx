"use client";
import Image from "next/image";
import { useState, useRef } from "react";
import { RiArrowRightSLine } from "react-icons/ri";
import { FaMapMarkerAlt } from "react-icons/fa";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

export default function Page() {
    const markerRef = useRef(null);
    const colors = [
      { name: "Rojo", class: "bg-red-400" },
      { name: "Amarillo", class: "bg-yellow-400" },
      { name: "Verde", class: "bg-green-400" },
    ];

    const preguntas = [
        {
            pregunta: "About Me",
            respuesta:"Gaming for me is a portal to other worlds — a blend of creativity, challenge, and connection. I love how games can tell stories in interactive ways and push the boundaries of technology and art.",
        },
        {
            pregunta: "My Thoughts on Gaming",
            respuesta:"Gaming for me is a portal to other worlds — a blend of creativity, challenge, and connection. I love how games can tell stories in interactive ways and push the boundaries of technology and art.",
        },
        {
          pregunta: "What I like",
          respuesta:
            " innovative gameplay, strong narratives, and vibrant communities.",
        },
        {
          pregunta: "My goal",
          respuesta:
            "create immersive experiences that engage players emotionally and intellectually. I enjoy experimenting with unique mechanics and visuals that surprise and delight.",
        },
        {
          pregunta: "What I don’t like",
          respuesta: " repetitive mechanics, pay-to-win models, and lack of accessibility.",
        },
    ];

    const [activo, setActivo] = useState<number | null>(null);
    const toggle = (index: number) =>
        setActivo(activo === index ? null : index);

    const counterRef = useRef<HTMLSpanElement>(null);
    const mapRef = useRef<HTMLImageElement>(null);

    // Animación del contador
    useGSAP(() => {
        gsap.fromTo(
            counterRef.current,
            { innerText: 0 },
            {
                innerText: 10,
                duration: 12.4,
                ease: "power2.out",
                snap: { innerText: 1 },
                onUpdate: function () {
                    if (counterRef.current) {
                        counterRef.current.innerText =
                          "+ " + Math.floor(this.targets()[0].innerText);
                    }
                },
            }
        );
    }, []);

  // Animación automática del mapa (zoom hacia abajo)
// Animación automática del mapa (zoom hacia abajo y derecha)
useGSAP(() => {
  gsap.fromTo(
    mapRef.current,
    { scale: 1, y: 0, x: 0 },
    {
      scale: 5,      // zoom
      y: -340,       // hacia abajo
      x: -260,        // hacia la derecha
      duration: 8,
      ease: "power2.inOut",
      yoyo: true,    // vuelve al inicio
    }
  );
}, []);


  useGSAP(() => {
    gsap.fromTo(
      markerRef.current,
      { opacity: 0, scale: 0.5 },
      {
        opacity: 1,
        scale: 1,
        duration: 1,
        ease: "back.out(1.7)",
        delay: 8, // aparece a los 8s
      }
    );
  }, []);


  return (
    <section className="relative h-screen w-screen overflow-hidden">
      {/* Video de fondo */}
      <video
        autoPlay
        loop
        muted
        className="absolute top-0 left-0 w-full h-full object-cover z-0"
      >
        <source src="/background.mp4" type="video/mp4" />
        Tu navegador no soporta videos HTML5.
      </video>

      {/* Contenido encima */}
      <article className="relative z-10 backdrop-blur-3xl h-[87%] w-[60%] rounded-4xl shadow-xl border border-gray-600 p-5 flex flex-col mx-auto my-10">
        {/* Colores */}
        <ul className="flex gap-2 mb-5">
          {colors.map((color) => (
            <li
              key={color.name}
              className={`h-5 w-5 rounded-full ${color.class}`}
            ></li>
          ))}
        </ul>

        {/* Perfil */}
        <figure className=" h-[40%] w-[65%]  flex flex-col gap-5 mt-5 justify-center items-center">
          <div
            className="w-45 h-45 rounded-full bg-cover flex justify-center items-center bg-center"
            style={{ backgroundImage: "url('/bg-img-perfil.jpg')" }}
          >
            <Image
              src="/profile.png"
              alt="Foto de perfil"
              width={250}
              height={250}
              className="brightness-10 xl:w-35 xl:h-35"
            />
          </div>
          <figcaption className="text-2xl font-bold text-center text-white">
            Lucio Misael Aquino
          </figcaption>
        </figure>

        {/* Acordeón */}
        <div className="w-full absolute mt-93 right-50 max-h-90 flex justify-center">
          <div className="w-full max-w-xl h-auto border border-white/20 bg-gray-900/82 rounded-xl shadow-lg overflow-hidden">
            {preguntas.map((item, index) => (
              <article
                key={index}
                className="border-b border-gray-500 last:border-none transition-all duration-300"
              >
                <header>
                  <button
                    onClick={() => toggle(index)}
                    className="w-full text-left px-6 py-4 flex justify-between items-center text-white font-semibold hover:bg-gray-900/50 cursor-pointer transition-colors"
                  >
                    <span className="text-lg">{item.pregunta}</span>
                    <span
                      className={`transform transition-transform ${
                        activo === index ? "rotate-90" : ""
                      }`}
                    >
                      <RiArrowRightSLine />
                    </span>
                  </button>
                </header>
                <div
                  className={`px-6 overflow-hidden text-gray-200 transition-all duration-300 ${
                    activo === index ? "max-h-40 py-2" : "max-h-0"
                  }`}
                >
                  {item.respuesta}
                </div>
              </article>
            ))}
          </div>
        </div>

        {/* Mapa + contador + download cv */}
        <div className="absolute right-16 top-30 flex flex-col items-center">
          {/* Mapa animado */}

          <section className="relative">
            <div className="backdrop-blur-md bg-gray-900/82 border border-white/20 rounded-2xl overflow-hidden">
                <Image
                ref={mapRef}
                src="/mapa.png"
                alt="Mapa"
                width={1950}
                height={1950}
                className="xl:w-65 xl:h-85 rounded-3xl"
                />
            </div>
            {/*ubicacion */}
                <div
                  ref={markerRef}
                  className="absolute w-5 h-5 rounded-full bottom-18.5 right-23"
                >
                  <FaMapMarkerAlt className="text-red-500" />
                </div>
          </section>
          {/* Contador */}
          <div className="mt-10 bg-gray-900/82 flex flex-col justify-center items-center w-65 backdrop-blur-md rounded-2xl p-4 shadow-lg border border-white/20">
            <span
              ref={counterRef}
              className="text-4xl font-bold text-white w-full justify-center items-center flex pr-8"
            >
              + 0
            </span>
            <p className="text-sm text-white/80 mt-1">
              Years of Experience
            </p>
          </div>

           {/* Botón Download CV */} 
          <button className="mt-10 cursor-pointer hover:bg-gray-950 bg-gray-900/82 flex flex-col justify-center items-center w-65 backdrop-blur-md rounded-2xl p-4 shadow-lg border border-white/20">
              <p className="font-semibold">Donwload CV</p>
          </button>
        </div>
      </article>
    </section>
  );
}
