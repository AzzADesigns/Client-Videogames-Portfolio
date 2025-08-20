"use client";
import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import { RiArrowRightSLine } from "react-icons/ri";
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

export default function Page() {
    const colors = [
        { name: "Rojo", class: "bg-red-400" },
        { name: "Amarillo", class: "bg-yellow-400" },
        { name: "Verde", class: "bg-green-400" },
    ];

    const preguntas = [
        { pregunta: "My Thoughts on Gaming", respuesta: "Gaming for me is a portal to other worlds — a blend of creativity, challenge, and connection. I love how games can tell stories in interactive ways and push the boundaries of technology and art." },
        { pregunta: "What I like", respuesta: " innovative gameplay, strong narratives, and vibrant communities." },
        { pregunta: "My goal", respuesta: "create immersive experiences that engage players emotionally and intellectually. I enjoy experimenting with unique mechanics and visuals that surprise and delight." },
        { pregunta: "What I don’t like", respuesta: " repetitive mechanics, pay-to-win models, and lack of accessibility." },
    ];

    const [activo, setActivo] = useState<number | null>(null);
    const toggle = (index: number) => setActivo(activo === index ? null : index);

    const counterRef = useRef(null);

    useGSAP(() => {
        gsap.fromTo(
            counterRef.current,
            { innerText: 0 },
            {
                innerText: 10,
                duration: 2,
                ease: 'power2.out',
                snap: { innerText: 1 },
                onUpdate: function () {
                    counterRef.current.innerText = "+ " + Math.floor(this.targets()[0].innerText);
                },
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
                        <li key={color.name} className={`h-5 w-5 rounded-full ${color.class}`}></li>
                    ))}
                </ul>
                
                {/* Perfil */}

                <figure className=" h-[40%] w-[80%] flex flex-col gap-5 justify-center items-center">
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
                <div className="w-full absolute mt-95 right-25 max-h-90 flex justify-center">
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
                                        <span className={`transform transition-transform ${activo === index ? "rotate-90" : ""}`}>
                                            <RiArrowRightSLine />
                                        </span>
                                    </button>
                                </header>
                                <div
                                    className={`px-6 overflow-hidden text-gray-200 transition-all duration-300 ${
                                        activo === index ? "max-h-40 py-2" : "max-h-0"}`}
                                >
                                    {item.respuesta}
                                </div>
                            </article>
                        ))}
                    </div>
                </div>
                    <div className="absolute right-12 top-40 flex flex-col items-center">
                        <div className="backdrop-blur-md bg-gray-900/82 border border-white/20 rounded-2xl">
                            <Image
                                src="/mapa.png"
                                alt="Foto de perfil"
                                width={550}
                                height={550}
                                className="xl:w-65 xl:h-70 rounded-3xl revert"
                            />
                        </div>
                        <div className="mt-10 bg-gray-900/82 flex flex-col justify-center items-center w-65 backdrop-blur-md rounded-2xl p-4 shadow-lg border border-white/20">
                            <span ref={counterRef} className="text-4xl font-bold text-white w-full justify-center items-center flex pr-8">+ 0</span>
                            <p className="text-sm text-white/80 mt-1">Years of Experience</p>
                        </div>
                    </div>
            </article>
        </section>
    );
}