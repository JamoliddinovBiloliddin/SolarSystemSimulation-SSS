import React, { useState, useRef, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useTexture, Html, Stars, OrbitControls, Sky } from '@react-three/drei';
import * as THREE from 'three';
import { FaCube, FaInfoCircle, FaArrowLeft } from 'react-icons/fa';
import { solarData } from './data/solarData';

// Components
import Planet from './components/Planet';
import Sun from './components/Sun';

// UI Components
const translations = {
  uz: {
    temp: 'Harorat',
    year: 'Yil davomiyligi',
    rotation: 'Aylanish',
    composition: 'Tarkibi',
    atmosphere: 'Atmosfera',
    moons: 'Tabiiy Yo‘ldoshlar',
    back: 'Ortga',
    loading: 'Yuklanmoqda...',
    viewModel: 'Modelni Ko‘rish',
    viewInfo: 'Ma\'lumot'
  },
  en: {
    temp: 'Temperature',
    year: 'Year Duration',
    rotation: 'Rotation',
    composition: 'Composition',
    atmosphere: 'Atmosphere',
    moons: 'Moons',
    back: 'Back',
    loading: 'Loading...',
    viewModel: 'View Model',
    viewInfo: 'Info'
  },
  ru: {
    temp: 'Температура',
    year: 'Продолжительность года',
    rotation: 'Вращение',
    composition: 'Состав',
    atmosphere: 'Атмосфера',
    moons: 'Спутники',
    back: 'Назад',
    loading: 'Загрузка...',
    viewModel: 'Смотреть модель',
    viewInfo: 'Инфо'
  }
};

const InfoPanel = ({ data, lang, onClose }) => {
  const [minimized, setMinimized] = useState(false);

  // Reset minimized state when data changes (new planet selected)
  useEffect(() => {
    setMinimized(false);
  }, [data]);

  if (!data) return null;
  const t = translations[lang];

  // Helper to safely get localized text or fallback
  const getText = (obj) => (obj && obj[lang]) ? obj[lang] : (obj?.uz || '');

  // Minimized State (Mobile only mostly)
  if (minimized) {
    return (
      <button
        onClick={() => setMinimized(false)}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 px-6 py-3 bg-blue-600/90 text-white font-bold rounded-full shadow-[0_0_20px_rgba(0,100,255,0.5)] animate-bounce-in backdrop-blur-md border border-white/20 hover:scale-105 active:scale-95 transition-all flex items-center gap-2"
      >
        <FaInfoCircle className="text-xl" /> {t.viewInfo}
      </button>
    );
  }

  return (
    <div className="absolute z-20 bg-black/80 text-white backdrop-blur-md border border-blue-500/30 shadow-[0_0_50px_rgba(0,100,255,0.3)] animate-fade-in
                    bottom-0 left-0 w-full max-h-[60vh] rounded-t-2xl border-b-0 p-6 overflow-y-auto
                    md:top-10 md:right-10 md:bottom-auto md:left-auto md:w-96 md:max-h-[80vh] md:rounded-xl md:border-b"
    >
      <button onClick={onClose} className="absolute top-4 right-4 p-2 text-gray-400 hover:text-white bg-white/10 rounded-full md:bg-transparent md:p-0">✕</button>

      <h1 className="text-3xl md:text-4xl font-bold mb-1 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent uppercase">
        {getText(data.name)}
      </h1>
      <p className="text-xs md:text-sm text-gray-400 mb-6 uppercase tracking-widest">{getText(data.type)}</p>

      {/* Mobile View Model Button */}
      <button
        onClick={() => setMinimized(true)}
        className="w-full mb-6 py-2 bg-gradient-to-r from-blue-900/50 to-purple-900/50 border border-white/20 rounded-lg text-blue-200 text-sm font-bold hover:bg-white/10 active:scale-95 transition-all flex items-center justify-center gap-2 md:hidden"
      >
        <FaCube className="text-lg" /> {t.viewModel}
      </button>

      <div className="space-y-3 md:space-y-4 text-sm">
        {data.details && (
          <>
            <div className="flex justify-between border-b border-white/10 pb-2">
              <span className="text-gray-400">{t.temp}</span>
              <span className="font-mono text-yellow-300 text-right">{getText(data.details.temp)}</span>
            </div>
            <div className="flex justify-between border-b border-white/10 pb-2">
              <span className="text-gray-400">{t.year}</span>
              <span className="font-mono text-blue-300 text-right">{getText(data.details.year)}</span>
            </div>
            <div className="flex justify-between border-b border-white/10 pb-2">
              <span className="text-gray-400">{t.rotation}</span>
              <span className="font-mono text-green-300 text-right">{getText(data.details.rotation)}</span>
            </div>
            <div className="border-b border-white/10 pb-2">
              <span className="text-gray-400 block mb-1">{t.composition}</span>
              <span className="font-mono text-white">{getText(data.details.composition)}</span>
            </div>
            <div className="border-b border-white/10 pb-2">
              <span className="text-gray-400 block mb-1">{t.atmosphere}</span>
              <span className="font-mono text-white">{getText(data.details.atmosphere)}</span>
            </div>
          </>
        )}
      </div>

      <p className="mt-6 text-gray-300 italic leading-relaxed text-sm md:text-base">
        "{getText(data.description)}"
      </p>

      {/* Fun Fact Section */}
      {data.funFact && (
        <div className="mt-4 p-3 bg-yellow-500/10 border-l-2 border-yellow-500 rounded-r">
          <span className="text-xs text-yellow-500 font-bold uppercase block mb-1">💡 FACT</span>
          <p className="text-sm text-yellow-100">{getText(data.funFact)}</p>
        </div>
      )}

      {data.moons && (
        <div className="mt-4">
          <h3 className="text-sm text-gray-400 uppercase mb-2">{t.moons}</h3>
          <div className="flex flex-wrap gap-2">
            {data.moons.map(m => (
              <span key={getText(m.name)} className="px-2 py-1 bg-white/10 rounded text-xs hover:bg-white/20 cursor-pointer">
                {getText(m.name)}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

const WarpEffect = ({ active }) => {
  if (!active) return null;
  return (
    <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-none transition-all duration-500 pointer-events-none">
      {/* Visual only, no blocking */}
    </div>
  );
};

const CameraController = ({ focusTarget, isTraveling, onTravelComplete }) => {
  const { camera, controls } = useThree();
  const vec = new THREE.Vector3();
  const targetPos = new THREE.Vector3();
  const worldPos = new THREE.Vector3();

  useFrame((state, delta) => {
    // If we have a focus target (Planet/Moon object)
    if (focusTarget && focusTarget.object) {
      // Get exact world position of the moving object
      focusTarget.object.getWorldPosition(worldPos);

      // Desired camera position: worldPos + offset
      // Offset depends on object size (radius).
      const radius = focusTarget.data.radius || 1;
      const offsetDistance = radius * 4 + 5;

      // Fixed angle (e.g. slightly above and front) is smoother.
      targetPos.copy(worldPos).add(new THREE.Vector3(offsetDistance, radius, offsetDistance * 0.5));

      // Lerp camera position
      state.camera.position.lerp(targetPos, 0.05);

      // Look at the object
      state.camera.lookAt(worldPos);

      // Update controls target so if user tries to rotate, it rotates around the object
      if (controls) {
        controls.target.lerp(worldPos, 0.1);
        controls.update();
      }

    } else {
      // Overview Mode (Sun centered)
      if (controls) {
        controls.target.lerp(new THREE.Vector3(0, 0, 0), 0.1);
        controls.update();
      }
    }
  });
  return null;
};

const Scene = ({ onPlanetSelect, setIsTraveling, lang }) => {
  return (
    <>
      <Stars radius={300} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
      <ambientLight intensity={0.1} />

      <Sun onClick={(e) => {
        e.stopPropagation();
        // Sun doesn't move, but we can focus it. Passing dummy object or self.
        // Since Sun is at 0,0,0 and static, we can just focus origin.
        // For now, let's treat it like a planet for consistent structure.
        onPlanetSelect({ data: solarData[0], object: e.object, type: 'star' });
      }} />

      {solarData.filter(p => p.id !== 'sun').map((planet) => (
        <Planet
          key={planet.id}
          planet={planet}
          lang={lang}
          onPlanetClick={onPlanetSelect}
          isActive={false}
        />
      ))}

      <OrbitControls enablePan={true} enableZoom={true} maxDistance={500} minDistance={2} />
    </>
  );
};

const App = () => {
  const [focusTarget, setFocusTarget] = useState(null); // { data, object, type }
  const [isTraveling, setIsTraveling] = useState(false);
  const [lang, setLang] = useState('uz'); // 'uz', 'en', 'ru'

  // Handle selection
  const handleFocus = (payload) => {
    setFocusTarget(payload);
    setIsTraveling(true);
    setTimeout(() => setIsTraveling(false), 1000);
  };

  const handleBack = () => {
    setFocusTarget(null);
  };

  const t = translations[lang];

  return (
    <div className="w-full h-full bg-black relative overflow-hidden">
      <WarpEffect active={isTraveling} />
      <InfoPanel data={focusTarget?.data} lang={lang} onClose={handleBack} />

      {/* Language Switcher - Responsive Positioning */}
      <div className="absolute top-4 right-4 z-30 flex gap-2 md:top-6 md:right-6">
        {['uz', 'en', 'ru'].map((l) => (
          <button
            key={l}
            onClick={() => setLang(l)}
            className={`px-3 py-1.5 rounded border shadow-lg ${lang === l ? 'bg-blue-600 border-blue-500 text-white shadow-blue-500/50' : 'bg-black/40 border-white/20 text-gray-400 hover:text-white'}
                       uppercase text-xs md:text-sm font-bold backdrop-blur-md transition-all active:scale-95`}
          >
            {l}
          </button>
        ))}
      </div>

      {focusTarget && (
        <button
          className="absolute top-4 left-4 z-10 text-white border border-white/20 px-4 py-2 md:px-6 md:py-2 rounded-full
                     bg-black/50 hover:bg-white/10 backdrop-blur-md transition-all flex items-center gap-2
                     text-sm md:text-base active:scale-95 shadow-lg"
          onClick={handleBack}
        >
          <FaArrowLeft /> <span className="hidden md:inline">{t.back}</span><span className="md:hidden">{t.back.split(' ')[0]}</span>
        </button>
      )}

      <Canvas camera={{ position: [0, 80, 250], fov: 60 }} shadows dpr={[1, 2]}>
        <React.Suspense fallback={<Html center><div className="text-white text-xl animate-pulse font-mono tracking-widest">{t.loading}</div></Html>}>
          <Scene
            onPlanetSelect={handleFocus}
            setIsTraveling={setIsTraveling}
            lang={lang}
          />
          <CameraController
            focusTarget={focusTarget}
            isTraveling={isTraveling}
            onTravelComplete={() => { }}
          />
        </React.Suspense>
      </Canvas>
    </div>
  );
};

export default App;
