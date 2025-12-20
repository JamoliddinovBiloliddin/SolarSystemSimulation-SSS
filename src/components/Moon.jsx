import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useTexture } from '@react-three/drei';

const Moon = () => {
  const moonRef = useRef();

  // Load Texture
  const [moonMap] = useTexture([
    '/textures/moon.jpg'
  ]);

  // Rotating Orbit Logic
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime() * 0.2;
    // Orbit radius = 8
    if (moonRef.current) {
      moonRef.current.position.x = Math.sin(t) * 8;
      moonRef.current.position.z = Math.cos(t) * 8;
      moonRef.current.rotation.y += 0.005;
    }
  });

  return (
    <mesh ref={moonRef} position={[8, 0, 0]} castShadow receiveShadow>
      <sphereGeometry args={[0.6, 64, 64]} /> {/* Reduced size slightly for scale */}
      <meshStandardMaterial
        map={moonMap}
        roughness={0.8}
        metalness={0.1}
        bumpMap={moonMap}
        bumpScale={0.05}
      />
    </mesh>
  );
};

export default Moon;
