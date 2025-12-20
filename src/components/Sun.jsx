import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useTexture } from '@react-three/drei';

const Sun = ({ onClick }) => {
  const sunRef = useRef();

  // Use sun texture
  const sunMap = useTexture('/textures/sun.jpg');

  useFrame(() => {
    if (sunRef.current) {
      sunRef.current.rotation.y += 0.002;
    }
  });

  return (
    <group onClick={onClick}>
      {/* Light Source */}
      <pointLight intensity={2} distance={500} decay={0.5} color="#ffffff" castShadow />
      <ambientLight intensity={0.2} />

      {/* Sun Mesh */}
      <mesh ref={sunRef}>
        {/* Radius 15 for visual balance in this scene scale */}
        <sphereGeometry args={[15, 64, 64]} />
        <meshStandardMaterial
          map={sunMap}
          emissiveMap={sunMap}
          emissive="#ffcc00"
          emissiveIntensity={2}
          toneMapped={false}
        />
      </mesh>

      {/* Glow effect (simple sprite or billboard could be added here) */}
    </group>
  );
};

export default Sun;
