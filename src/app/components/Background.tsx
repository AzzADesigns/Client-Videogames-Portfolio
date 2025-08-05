'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import { Text3D, Environment, Stars } from '@react-three/drei';
import { useRef } from 'react';
import * as THREE from 'three';

// Componente del texto 3D animado
function AnimatedText() {
  // Referencias para manipular el texto y el grupo
  const textRef = useRef<THREE.Mesh>(null);
  const groupRef = useRef<THREE.Group>(null);

  // Función que se ejecuta en cada frame para las animaciones
  useFrame((state) => {
    
    if (groupRef.current) {
      // MOVIMIENTO HORIZONTAL - De derecha a izquierda
      const time = state.clock.elapsedTime;
      // Movimiento lineal de derecha a izquierda
      // Comienza en 8 (extremo derecho) y se mueve hacia -8 (extremo izquierdo)
      const moveX = 5 - (time * 2); // Velocidad de 2 unidades por segundo
      
      // MOVIMIENTO FLOTANTE VERTICAL - Para un efecto más dinámico
      // Math.sin(time * 0.5) * 0.1
      // 0.5 = velocidad del flotamiento (más alto = más rápido)
      // 0.1 = intensidad del flotamiento (más alto = más movimiento)

      // Aplica la posición al grupo (Y = -2 para bajar el texto)
      groupRef.current.position.set(moveX, -2.5, 0);
    }
  });

  return (

    <group ref={groupRef}>
      {/* TEXTO 3D - Configuración del texto */}
      <Text3D
        ref={textRef}
        font="/fonts/helvetiker_regular.typeface.json" // Fuente 3D
        size={6.0}           // Tamaño del texto (más alto = más grande)
        height={1}         // Profundidad/extrusión del texto
        curveSegments={12}   // Suavidad de las curvas (más alto = más suave)
        bevelEnabled         // Habilita el bisel (bordes redondeados)
        bevelThickness={0.02} // Grosor del bisel
        bevelSize={0.02}     // Tamaño del bisel
        bevelOffset={0}      // Desplazamiento del bisel
        bevelSegments={5}    // Segmentos del bisel (más alto = más suave)
      >
        Lucio  Aquino
        {/* MATERIAL DEL TEXTO - Azul Switch con reflejos rojos */}
        <meshStandardMaterial
            color="#00A8E8"
            emissive="#003366"
            metalness={0.95}
            roughness={0.2}
        />
      </Text3D>
    </group>
  );
}

// Componente principal del fondo 3D
export default function Background() {
  return (
    <div className="fixed inset-0 z-[-1]">
      <Canvas
        // POSICIÓN DE LA CÁMARA - [X, Y, Z]
        // X = -4 (más negativo = más a la izquierda, para perspectiva inicial)
        // Y = 0 (más alto = más arriba)
        // Z = 4 (más cerca para ver mejor el texto)
        camera={{ position: [-1, 0, 4], fov: 75 }}
        // DESHABILITAR DRAG DE LA CÁMARA - Para mantener la vista fija
        dpr={[1, 2]} // Pixel ratio para mejor calidad
      >
        {/* LUZ AMBIENTAL - Iluminación general suave */}
        <ambientLight intensity={0.5} />

        {/* LUZ DIRECCIONAL - Luz principal */}
        <directionalLight 
          position={[-8, 10, 5]}  // Posición de la luz (desde la izquierda)
          intensity={1}            // Intensidad
          color="#ffffff"          // Color (blanco)
        />

        {/* LUZ DE PUNTO ROJO SWITCH - Reflejos rojos */}
        <pointLight 
          position={[-12, -10, -5]} // Posición
          intensity={0.8}           // Intensidad
          color="#FF375F"           // Color (rojo Switch para reflejos)
        />
        
        {/* LUZ DE PUNTO ROJO SWITCH ADICIONAL - Más reflejos rojos */}
        <pointLight 
          position={[-2, -10, -5]}  // Posición
          intensity={0.8}           // Intensidad
          color="#FF375F"           // Color (rojo Switch para reflejos)
        />

        {/* ENTORNO - Para reflejos y ambiente */}
        <Environment preset="sunset"  /> {/* Ambiente de atardecer cálido */}

        {/* ESTRELLAS - Efecto de partículas en el fondo */}
        <Stars 
          radius={100}    // Radio del campo de estrellas
          depth={50}      // Profundidad
          count={5000}    // Cantidad de estrellas
          factor={4}      // Tamaño de las estrellas
          saturation={0}  // Saturación (0 = blanco y negro)
          fade            // Efecto de desvanecimiento
        />

        {/* CONTROLES DE ÓRBITA - Deshabilitados para mantener la vista fija */}


        {/* COMPONENTE DEL TEXTO ANIMADO */}
        <AnimatedText />
      </Canvas>
    </div>
  );
}