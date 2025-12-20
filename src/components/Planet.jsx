import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { useTexture, Text } from '@react-three/drei';
import * as THREE from 'three';

const Planet = ({ planet, onPlanetClick, isActive, lang }) => {
    const meshRef = useRef();
    const orbitGroupRef = useRef();

    // Load texture
    const colorMap = useTexture(planet.texture);
    const ringMap = planet.hasRing ? useTexture(planet.ringTexture) : null;
    const cloudMap = planet.clouds ? useTexture(planet.clouds) : null;

    // Random initial orbit position offset
    const initialAngle = useMemo(() => Math.random() * Math.PI * 2, []);

    useFrame(({ clock }) => {
        const t = clock.getElapsedTime();

        // Orbital Rotation (Revolution around Sun)
        if (orbitGroupRef.current) {
            // Speed scaled by distance
            const speed = 10 / planet.distance;
            orbitGroupRef.current.rotation.y = initialAngle + t * speed * 0.1;
        }

        // Axial Rotation (Day/Night cycle)
        if (meshRef.current) {
            meshRef.current.rotation.y += 0.005; // Standard rotation
        }
    });

    // Helper to safely get localized text
    const getText = (obj) => (obj && obj[lang]) ? obj[lang] : (obj?.uz || '');

    return (
        <group>
            {/* Visual Orbit Line (Optional, for easy tracking) */}
            <mesh rotation={[-Math.PI / 2, 0, 0]}>
                <ringGeometry args={[planet.distance - 0.2, planet.distance + 0.2, 128]} />
                <meshBasicMaterial color="#ffffff" opacity={0.1} transparent side={THREE.DoubleSide} />
            </mesh>

            {/* Orbit Group: Rotates around center (Sun) */}
            <group ref={orbitGroupRef}>
                {/* Planet Container at distance */}
                <group position={[planet.distance, 0, 0]}>

                    {/* Main Planet Mesh */}
                    <mesh
                        ref={meshRef}
                        name={planet.name.en} // Debug name
                        onClick={(e) => {
                            e.stopPropagation();
                            onPlanetClick({ data: planet, type: 'planet', object: meshRef.current });
                        }}
                        onPointerOver={() => document.body.style.cursor = 'pointer'}
                        onPointerOut={() => document.body.style.cursor = 'auto'}
                    >
                        <sphereGeometry args={[planet.radius, 64, 64]} />
                        <meshStandardMaterial
                            map={colorMap}
                            metalness={0.2}
                            roughness={0.7}
                        />
                        {/* Active Indicator Highlight */}
                        {isActive && (
                            <mesh>
                                <sphereGeometry args={[planet.radius * 1.05, 32, 32]} />
                                <meshBasicMaterial color="#00ff00" wireframe transparent opacity={0.3} />
                            </mesh>
                        )}
                    </mesh>

                    {/* Clouds Layer (for Earth) */}
                    {planet.clouds && (
                        <mesh scale={[1.02, 1.02, 1.02]}>
                            <sphereGeometry args={[planet.radius, 64, 64]} />
                            <meshStandardMaterial
                                map={cloudMap}
                                transparent
                                opacity={0.4}
                                depthWrite={false}
                                side={THREE.DoubleSide}
                            />
                        </mesh>
                    )}

                    {/* Rings (Saturn) */}
                    {planet.hasRing && ringMap && (
                        <mesh rotation={[-Math.PI / 2.5, 0, 0]}>
                            <ringGeometry args={[planet.radius * 1.4, planet.radius * 2.2, 64]} />
                            <meshStandardMaterial
                                map={ringMap}
                                side={THREE.DoubleSide}
                                transparent
                                opacity={0.8}
                            />
                        </mesh>
                    )}

                    {/* Planet Label */}
                    <Text
                        position={[0, planet.radius + 1.5, 0]}
                        fontSize={1.5}
                        color="white"
                        anchorX="center"
                        anchorY="middle"
                    >
                        {getText(planet.name)}
                    </Text>

                    {/* Moons */}
                    {planet.moons && planet.moons.map((moon, idx) => (
                        <Moon
                            key={idx}
                            moonData={moon}
                            parentPlanet={planet}
                            planetRadius={planet.radius}
                            onClick={onPlanetClick}
                            lang={lang}
                        />
                    ))}

                </group>
            </group>
        </group>
    );
};

// Sub-component for Moon
const Moon = ({ moonData, planetRadius, parentPlanet, onClick, lang }) => {
    const moonRef = useRef();
    const texture = useTexture(moonData.texture);

    useFrame(({ clock }) => {
        const t = clock.getElapsedTime();
        if (moonRef.current) {
            // Rotation around the planet
            moonRef.current.position.x = Math.sin(t * moonData.speed) * (planetRadius + moonData.distance);
            moonRef.current.position.z = Math.cos(t * moonData.speed) * (planetRadius + moonData.distance);
            moonRef.current.rotation.y += 0.01;
        }
    });

    return (
        <mesh
            ref={moonRef}
            name={moonData.name.en}
            onClick={(e) => {
                e.stopPropagation();
                // Enrich moon data with localized parent info for UI
                const enrichedData = {
                    ...moonData,
                    description: {
                        uz: `${parentPlanet.name.uz}ning tabiiy yo'ldoshi.`,
                        en: `Natural satellite of ${parentPlanet.name.en}.`,
                        ru: `Естественный спутник ${parentPlanet.name.ru}.`
                    },
                    type: {
                        uz: 'Tabiiy Yo\'ldosh',
                        en: 'Natural Satellite',
                        ru: 'Естественный спутник'
                    }
                };
                onClick({ data: enrichedData, type: 'moon', object: moonRef.current });
            }}
            onPointerOver={() => document.body.style.cursor = 'pointer'}
            onPointerOut={() => document.body.style.cursor = 'auto'}
        >
            <sphereGeometry args={[moonData.radius, 32, 32]} />
            <meshStandardMaterial map={texture} />
        </mesh>
    );
};

export default Planet;
