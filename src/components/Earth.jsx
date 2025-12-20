import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useTexture } from '@react-three/drei';
import * as THREE from 'three';

const Earth = () => {
  const crustRef = useRef();
  const cloudsRef = useRef();
  const mantleRef = useRef();
  const outerCoreRef = useRef();
  const innerCoreRef = useRef();

  // Load Textures
  const [
    colorMap,
    normalMap,
    specularMap,
    cloudsMap,
    moonMap
  ] = useTexture([
    '/textures/earth.jpg',
    '/textures/earth_normal.jpg',
    '/textures/earth_specular.jpg',
    '/textures/earth-clouds.png',
    '/textures/moon.jpg'
  ]);

  useFrame((state, delta) => {
    // Rotation
    if (crustRef.current) crustRef.current.rotation.y += delta * 0.05;
    if (cloudsRef.current) cloudsRef.current.rotation.y += delta * 0.07; // Clouds move faster
    if (mantleRef.current) mantleRef.current.rotation.y += delta * 0.02;
    if (outerCoreRef.current) outerCoreRef.current.rotation.y += delta * 0.03;
    if (innerCoreRef.current) innerCoreRef.current.rotation.y += delta * 0.05;
  });

  return (
    <group>
      {/* 0. ATMOSPHERE / CLOUDS - Radius 2.53 */}
      <mesh ref={cloudsRef}>
        <sphereGeometry args={[2.53, 64, 64]} />
        <meshStandardMaterial
          map={cloudsMap}
          transparent={true}
          opacity={0.4}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* 1. CRUST OUTER - Radius 2.5 */}
      <mesh ref={crustRef}>
        <sphereGeometry args={[2.5, 64, 64]} />
        <meshStandardMaterial
          map={colorMap}
          normalMap={normalMap}
          roughnessMap={specularMap}
          roughness={0.5}
          metalness={0.1}
        />
      </mesh>

      {/* 1.b CRUST INNER (The "Inside" view) - Radius 2.49 */}
      {/* Visible when camera goes inside Earth. Represents bedrock/rocky underground. */}
      <mesh>
        <sphereGeometry args={[2.49, 64, 64]} />
        <meshStandardMaterial
          map={moonMap} // Reusing a rocky texture
          color="#443333" // Darkish rock
          side={THREE.BackSide} // Visible from inside
          roughness={0.9}
        />
      </mesh>

      {/* 2. MANTLE - Radius 2.4 */}
      <mesh ref={mantleRef}>
        <sphereGeometry args={[2.4, 64, 64]} />
        <meshStandardMaterial
          color="#cf1020" // Magma Red
          emissive="#b00000"
          emissiveIntensity={0.5}
          roughness={0.4}
          metalness={0.8}
          // Simple procedural noise via normalScale or map if we had one.
          // For now, relies on color. Ideally user wants texture.
          // Let's use the rock map but tinted red/orange for lava look?
          map={moonMap}
          bumpMap={moonMap}
          bumpScale={0.1}
        />
      </mesh>

      {/* 3. OUTER CORE - Radius 1.6 */}
      <mesh ref={outerCoreRef}>
        <sphereGeometry args={[1.6, 64, 64]} />
        <meshStandardMaterial
          color="#ff8c00"
          emissive="#ff4400"
          emissiveIntensity={0.8}
          metalness={0.9}
          roughness={0.1}
        />
      </mesh>

      {/* Internal Light to simulate glowing Core/Mantle illuminating the rock walls from inside */}
      <pointLight position={[0, 0, 0]} intensity={2} distance={5} color="#ff8c00" decay={2} />

      {/* 4. INNER CORE - Radius 0.8 */}
      <mesh ref={innerCoreRef}>
        <sphereGeometry args={[0.8, 64, 64]} />
        <meshStandardMaterial
          color="#ffff00"
          emissive="#ffffff"
          emissiveIntensity={1}
        />
      </mesh>
    </group>
  );
};

export default Earth;
