import React, { useState, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Html, Stars, OrbitControls } from '@react-three/drei';
import * as THREE from 'three';
import {
  FaArrowLeft,
  FaCube,
  FaInfoCircle,
  FaRocket,
  FaSatellite,
  FaStar,
  FaUserAstronaut,
  FaGlobeAsia,
  FaRegLightbulb,
} from 'react-icons/fa';
import { solarData } from './data/solarData';

import Planet from './components/Planet';
import Sun from './components/Sun';

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
    viewInfo: 'Ma\'lumot',
    nav: {
      hero: 'Bosh sahifa',
      discovery: 'Kashfiyot',
      missions: 'Missiyalar',
      gallery: 'Galereya',
      faq: 'Savollar',
      contact: 'Bog‘lanish',
    },
    heroTitle: 'Koinotga yangi nigoh: Quyosh tizimini jonli kuzating',
    heroSubtitle:
      'Interaktiv 3D modeli, ilmiy faktlar va kosmik missiyalar bilan to‘ldirilgan to‘liq tajriba. Har bir sayyorani bosib, detallarni kashf eting.',
    heroCtaPrimary: 'Sayohatni boshlash',
    heroCtaSecondary: 'Missiya rejamiz',
    heroTag: 'SSS Kosmik Markazi',
    statsTitle: 'Bizning kashfiyotlar',
    discoveryTitle: 'Kashfiyot yo‘nalishlari',
    discoverySubtitle:
      'Keng koinot uchun tayyorlangan ilmiy markaz: ta\'lim, kuzatuv va ilhom manbai.',
    missionTitle: 'Kosmik missiya bosqichlari',
    missionSubtitle:
      'Har bir sayohat aniq reja va ilg‘or texnologiyaga tayanadi. Siz ham ushbu sayohatga qo‘shiling.',
    galleryTitle: 'Sayyoralar galereyasi',
    gallerySubtitle: 'Quyosh tizimidagi har bir jismning eng muhim faktlari va tavsifi.',
    faqTitle: 'Ko‘p so‘raladigan savollar',
    faqSubtitle: 'Loyiha, texnologiya va ishtirok bo‘yicha javoblar.',
    contactTitle: 'Missiyaga qo‘shiling',
    contactSubtitle:
      'Kosmik hamjamiyatga qo‘shilish uchun ariza yuboring yoki yangiliklardan xabardor bo‘ling.',
    contactButton: 'Ariza yuborish',
    footerText: 'SSS Kosmik Markazi — kelajakni kashf etamiz.',
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
    viewInfo: 'Info',
    nav: {
      hero: 'Home',
      discovery: 'Discovery',
      missions: 'Missions',
      gallery: 'Gallery',
      faq: 'FAQ',
      contact: 'Contact',
    },
    heroTitle: 'A new look at space: explore the Solar System in 3D',
    heroSubtitle:
      'A full experience with interactive 3D models, scientific facts, and mission planning. Click any planet to dive deeper.',
    heroCtaPrimary: 'Start the journey',
    heroCtaSecondary: 'Mission roadmap',
    heroTag: 'SSS Space Center',
    statsTitle: 'Our discoveries',
    discoveryTitle: 'Discovery tracks',
    discoverySubtitle: 'A space-ready hub for education, observation, and inspiration.',
    missionTitle: 'Mission stages',
    missionSubtitle: 'Every voyage follows a clear plan and cutting-edge technology.',
    galleryTitle: 'Planet gallery',
    gallerySubtitle: 'Key facts and summaries for every object in the Solar System.',
    faqTitle: 'Frequently asked questions',
    faqSubtitle: 'Answers about the project, tech stack, and participation.',
    contactTitle: 'Join the mission',
    contactSubtitle: 'Apply to join the cosmic community or subscribe for updates.',
    contactButton: 'Submit application',
    footerText: 'SSS Space Center — discovering the future.',
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
    viewInfo: 'Инфо',
    nav: {
      hero: 'Главная',
      discovery: 'Открытия',
      missions: 'Миссии',
      gallery: 'Галерея',
      faq: 'Вопросы',
      contact: 'Контакты',
    },
    heroTitle: 'Новый взгляд на космос: изучайте Солнечную систему в 3D',
    heroSubtitle:
      'Полный опыт с интерактивной 3D моделью, научными фактами и планом миссий. Нажмите на любую планету, чтобы узнать больше.',
    heroCtaPrimary: 'Начать путешествие',
    heroCtaSecondary: 'План миссий',
    heroTag: 'SSS Космический центр',
    statsTitle: 'Наши открытия',
    discoveryTitle: 'Направления исследований',
    discoverySubtitle: 'Космический центр для обучения, наблюдения и вдохновения.',
    missionTitle: 'Этапы миссии',
    missionSubtitle: 'Каждое путешествие следует плану и опирается на технологии.',
    galleryTitle: 'Галерея планет',
    gallerySubtitle: 'Ключевые факты и описание каждого объекта.',
    faqTitle: 'Частые вопросы',
    faqSubtitle: 'Ответы о проекте, технологиях и участии.',
    contactTitle: 'Присоединиться к миссии',
    contactSubtitle: 'Подайте заявку или подпишитесь на новости.',
    contactButton: 'Отправить заявку',
    footerText: 'SSS Космический центр — открываем будущее.',
  },
};

const featureCards = [
  {
    icon: FaRocket,
    title: { uz: '3D sayohatlar', en: '3D journeys', ru: '3D-путешествия' },
    description: {
      uz: 'Sayyoralar, yo‘ldoshlar va Quyoshni to‘liq hajmda kuzatish imkoniyati.',
      en: 'Explore planets, moons, and the Sun in full 3D detail.',
      ru: 'Изучайте планеты, спутники и Солнце в полном 3D.',
    },
  },
  {
    icon: FaSatellite,
    title: { uz: 'Missiya analitikasi', en: 'Mission analytics', ru: 'Аналитика миссий' },
    description: {
      uz: 'Har bir sayyora bo‘yicha asosiy ko‘rsatkichlar va orbitadagi ma’lumotlar.',
      en: 'Key metrics and orbital insights for every planet.',
      ru: 'Ключевые показатели и орбитальные данные.',
    },
  },
  {
    icon: FaStar,
    title: { uz: 'Ilmiy faktlar', en: 'Scientific facts', ru: 'Научные факты' },
    description: {
      uz: 'Tanlangan faktlar, qiziqarli ma’lumotlar va tarixiy kashfiyotlar.',
      en: 'Curated facts, highlights, and historical discoveries.',
      ru: 'Подборка фактов, открытий и историй.',
    },
  },
  {
    icon: FaUserAstronaut,
    title: { uz: 'O‘quv dasturlari', en: 'Learning programs', ru: 'Образовательные программы' },
    description: {
      uz: 'Talabalar va tadqiqotchilar uchun interaktiv darsliklar.',
      en: 'Interactive learning paths for students and researchers.',
      ru: 'Интерактивные курсы для студентов и исследователей.',
    },
  },
];

const missionSteps = [
  {
    title: { uz: 'Tadqiqot & Maqsad', en: 'Research & Goals', ru: 'Исследование и цель' },
    description: {
      uz: 'Sayyora haqida ilmiy savollar va missiya rejalari shakllantiriladi.',
      en: 'Define the scientific questions and mission objectives.',
      ru: 'Формируем вопросы и цели миссии.',
    },
  },
  {
    title: { uz: 'Trayektoriya & Logistika', en: 'Trajectory & Logistics', ru: 'Траектория и логистика' },
    description: {
      uz: 'Eng samarali yo‘nalish, vaqt va resurslar hisoblanadi.',
      en: 'Calculate the most efficient route, timing, and resources.',
      ru: 'Рассчитываем маршрут, время и ресурсы.',
    },
  },
  {
    title: { uz: 'Missiya starti', en: 'Launch execution', ru: 'Запуск миссии' },
    description: {
      uz: 'Kosmik apparat jo‘natiladi va real vaqt monitoringi boshlanadi.',
      en: 'Launch the spacecraft and start real-time monitoring.',
      ru: 'Запускаем аппарат и включаем мониторинг.',
    },
  },
];

const faqItems = [
  {
    question: {
      uz: 'Sayyoralarni qanday boshqaraman?',
      en: 'How do I control the planets?',
      ru: 'Как управлять планетами?',
    },
    answer: {
      uz: 'Sichqoncha bilan aylantiring, scroll bilan yaqinlashtiring va sayyorani bosib ma’lumot oling.',
      en: 'Drag to rotate, scroll to zoom, and click a planet to view details.',
      ru: 'Тяните для вращения, используйте скролл для зума и нажмите на планету.',
    },
  },
  {
    question: {
      uz: 'Ma’lumotlar qayerdan olinadi?',
      en: 'Where does the data come from?',
      ru: 'Откуда берутся данные?',
    },
    answer: {
      uz: 'Ma’lumotlar NASA va ochiq ilmiy manbalardan jamlangan.',
      en: 'Data is sourced from NASA and open scientific resources.',
      ru: 'Данные собраны из NASA и открытых источников.',
    },
  },
  {
    question: {
      uz: 'Missiyaga qanday qo‘shilsam bo‘ladi?',
      en: 'How can I join the mission?',
      ru: 'Как присоединиться к миссии?',
    },
    answer: {
      uz: 'Ariza formasini to‘ldiring va yangiliklar uchun ro‘yxatdan o‘ting.',
      en: 'Submit an application and subscribe for updates.',
      ru: 'Заполните заявку и подпишитесь на новости.',
    },
  },
];

const stats = [
  { value: '8', label: { uz: 'Sayyora', en: 'Planets', ru: 'Планет' } },
  { value: '5 000+', label: { uz: 'Yulduzlar', en: 'Stars', ru: 'Звёзд' } },
  { value: '120+', label: { uz: 'Missiyalar', en: 'Missions', ru: 'Миссий' } },
  { value: '24/7', label: { uz: 'Monitoring', en: 'Monitoring', ru: 'Мониторинг' } },
];

const InfoPanel = ({ data, lang, onClose }) => {
  const [minimized, setMinimized] = useState(false);

  useEffect(() => {
    setMinimized(false);
  }, [data]);

  if (!data) return null;
  const t = translations[lang];
  const getText = (obj) => (obj && obj[lang]) ? obj[lang] : (obj?.uz || '');

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
    <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-none transition-all duration-500 pointer-events-none" />
  );
};

const CameraController = ({ focusTarget }) => {
  const { controls } = useThree();
  const targetPos = new THREE.Vector3();
  const worldPos = new THREE.Vector3();

  useFrame((state) => {
    if (focusTarget && focusTarget.object) {
      focusTarget.object.getWorldPosition(worldPos);

      const radius = focusTarget.data.radius || 1;
      const offsetDistance = radius * 4 + 5;

      targetPos.copy(worldPos).add(new THREE.Vector3(offsetDistance, radius, offsetDistance * 0.5));
      state.camera.position.lerp(targetPos, 0.05);
      state.camera.lookAt(worldPos);

      if (controls) {
        controls.target.lerp(worldPos, 0.1);
        controls.update();
      }
    } else if (controls) {
      controls.target.lerp(new THREE.Vector3(0, 0, 0), 0.1);
      controls.update();
    }
  });
  return null;
};

const Scene = ({ onPlanetSelect, lang }) => (
  <>
    <Stars radius={300} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
    <ambientLight intensity={0.1} />

    <Sun
      onClick={(e) => {
        e.stopPropagation();
        onPlanetSelect({ data: solarData[0], object: e.object, type: 'star' });
      }}
    />

    {solarData.filter(p => p.id !== 'sun').map((planet) => (
      <Planet
        key={planet.id}
        planet={planet}
        lang={lang}
        onPlanetClick={onPlanetSelect}
        isActive={false}
      />
    ))}

    <OrbitControls enablePan enableZoom maxDistance={500} minDistance={2} />
  </>
);

const App = () => {
  const [focusTarget, setFocusTarget] = useState(null);
  const [isTraveling, setIsTraveling] = useState(false);
  const [lang, setLang] = useState('uz');

  const handleFocus = (payload) => {
    setFocusTarget(payload);
    setIsTraveling(true);
    setTimeout(() => setIsTraveling(false), 1000);
  };

  const handleBack = () => {
    setFocusTarget(null);
  };

  const t = translations[lang];
  const getText = (obj) => (obj && obj[lang]) ? obj[lang] : (obj?.uz || '');

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <header className="sticky top-0 z-40 border-b border-white/10 bg-black/60 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-500/20 text-blue-300">
              <FaGlobeAsia />
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-blue-300">{t.heroTag}</p>
              <p className="text-lg font-semibold">Solar System Simulation</p>
            </div>
          </div>
          <nav className="hidden items-center gap-6 text-sm text-gray-300 lg:flex">
            <a className="hover:text-white" href="#hero">{t.nav.hero}</a>
            <a className="hover:text-white" href="#discovery">{t.nav.discovery}</a>
            <a className="hover:text-white" href="#missions">{t.nav.missions}</a>
            <a className="hover:text-white" href="#gallery">{t.nav.gallery}</a>
            <a className="hover:text-white" href="#faq">{t.nav.faq}</a>
            <a className="hover:text-white" href="#contact">{t.nav.contact}</a>
          </nav>
          <div className="flex items-center gap-2">
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
        </div>
      </header>

      <main>
        <section id="hero" className="relative h-[85vh] overflow-hidden">
          <WarpEffect active={isTraveling} />
          <InfoPanel data={focusTarget?.data} lang={lang} onClose={handleBack} />

          {focusTarget && (
            <button
              className="absolute top-6 left-6 z-10 text-white border border-white/20 px-4 py-2 md:px-6 md:py-2 rounded-full
                     bg-black/50 hover:bg-white/10 backdrop-blur-md transition-all flex items-center gap-2
                     text-sm md:text-base active:scale-95 shadow-lg"
              onClick={handleBack}
            >
              <FaArrowLeft /> <span className="hidden md:inline">{t.back}</span><span className="md:hidden">{t.back.split(' ')[0]}</span>
            </button>
          )}

          <div className="absolute inset-0">
            <Canvas camera={{ position: [0, 80, 250], fov: 60 }} shadows dpr={[1, 2]}>
              <React.Suspense fallback={<Html center><div className="text-white text-xl animate-pulse font-mono tracking-widest">{t.loading}</div></Html>}>
                <Scene
                  onPlanetSelect={handleFocus}
                  lang={lang}
                />
                <CameraController
                  focusTarget={focusTarget}
                />
              </React.Suspense>
            </Canvas>
          </div>

          <div className="relative z-10 h-full">
            <div className="mx-auto flex h-full max-w-6xl flex-col justify-center px-6">
              <div className="max-w-2xl space-y-6">
                <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1 text-xs uppercase tracking-[0.3em] text-blue-200">
                  <FaRegLightbulb /> {t.heroTag}
                </div>
                <h1 className="text-4xl font-semibold leading-tight md:text-6xl">
                  {t.heroTitle}
                </h1>
                <p className="text-base text-gray-300 md:text-lg">
                  {t.heroSubtitle}
                </p>
                <div className="flex flex-wrap gap-4">
                  <a
                    href="#gallery"
                    className="rounded-full bg-blue-500 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-500/30 transition hover:bg-blue-400"
                  >
                    {t.heroCtaPrimary}
                  </a>
                  <a
                    href="#missions"
                    className="rounded-full border border-white/20 px-6 py-3 text-sm font-semibold text-white transition hover:border-white/50"
                  >
                    {t.heroCtaSecondary}
                  </a>
                </div>
              </div>
            </div>
            <div className="absolute bottom-8 left-1/2 w-[90%] max-w-5xl -translate-x-1/2 rounded-2xl border border-white/10 bg-black/60 px-6 py-4 backdrop-blur-md">
              <div className="grid gap-4 text-center text-sm text-gray-300 md:grid-cols-4">
                {stats.map((item) => (
                  <div key={item.value} className="space-y-1">
                    <p className="text-2xl font-semibold text-white md:text-3xl">{item.value}</p>
                    <p className="uppercase tracking-[0.2em] text-xs text-blue-200">{getText(item.label)}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="discovery" className="bg-gradient-to-b from-slate-950 via-slate-950 to-black py-20">
          <div className="mx-auto max-w-6xl px-6">
            <div className="mb-12 max-w-2xl">
              <p className="text-sm uppercase tracking-[0.3em] text-blue-300">{t.statsTitle}</p>
              <h2 className="mt-3 text-3xl font-semibold md:text-4xl">{t.discoveryTitle}</h2>
              <p className="mt-4 text-gray-300">{t.discoverySubtitle}</p>
            </div>
            <div className="grid gap-6 md:grid-cols-2">
              {featureCards.map((feature) => {
                const Icon = feature.icon;
                return (
                  <div key={getText(feature.title)} className="rounded-2xl border border-white/10 bg-white/5 p-6 shadow-lg shadow-black/30">
                    <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-blue-500/20 text-blue-300">
                      <Icon />
                    </div>
                    <h3 className="text-xl font-semibold">{getText(feature.title)}</h3>
                    <p className="mt-3 text-sm text-gray-300">{getText(feature.description)}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        <section id="missions" className="bg-black py-20">
          <div className="mx-auto max-w-6xl px-6">
            <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
              <div className="max-w-2xl">
                <p className="text-sm uppercase tracking-[0.3em] text-blue-300">Mission Control</p>
                <h2 className="mt-3 text-3xl font-semibold md:text-4xl">{t.missionTitle}</h2>
                <p className="mt-4 text-gray-300">{t.missionSubtitle}</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-6 text-sm text-gray-300">
                <p className="mb-2 text-white">2025-2030 roadmap</p>
                <p>AI navigatsiya, real-time monitoring va ilmiy laboratoriya modullari.</p>
              </div>
            </div>
            <div className="mt-12 grid gap-6 lg:grid-cols-3">
              {missionSteps.map((step, index) => (
                <div key={getText(step.title)} className="rounded-2xl border border-white/10 bg-gradient-to-br from-white/10 to-transparent p-6">
                  <p className="text-sm text-blue-300">0{index + 1}</p>
                  <h3 className="mt-3 text-xl font-semibold">{getText(step.title)}</h3>
                  <p className="mt-3 text-sm text-gray-300">{getText(step.description)}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="gallery" className="bg-slate-950 py-20">
          <div className="mx-auto max-w-6xl px-6">
            <div className="max-w-2xl">
              <p className="text-sm uppercase tracking-[0.3em] text-blue-300">Orbit Catalog</p>
              <h2 className="mt-3 text-3xl font-semibold md:text-4xl">{t.galleryTitle}</h2>
              <p className="mt-4 text-gray-300">{t.gallerySubtitle}</p>
            </div>
            <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {solarData.map((planet) => (
                <div key={planet.id} className="rounded-2xl border border-white/10 bg-white/5 p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-xl font-semibold text-white">{getText(planet.name)}</h3>
                      <p className="text-xs uppercase tracking-[0.2em] text-blue-200">{getText(planet.type)}</p>
                    </div>
                    <div className="rounded-full bg-blue-500/10 px-3 py-1 text-xs text-blue-200">{planet.id}</div>
                  </div>
                  <p className="mt-4 text-sm text-gray-300">{getText(planet.description)}</p>
                  <div className="mt-4 flex flex-wrap gap-2 text-xs text-gray-300">
                    <span className="rounded-full border border-white/10 px-3 py-1">{getText(planet.details?.rotation)}</span>
                    <span className="rounded-full border border-white/10 px-3 py-1">{getText(planet.details?.year)}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="faq" className="bg-black py-20">
          <div className="mx-auto max-w-6xl px-6">
            <div className="max-w-2xl">
              <p className="text-sm uppercase tracking-[0.3em] text-blue-300">Knowledge base</p>
              <h2 className="mt-3 text-3xl font-semibold md:text-4xl">{t.faqTitle}</h2>
              <p className="mt-4 text-gray-300">{t.faqSubtitle}</p>
            </div>
            <div className="mt-10 grid gap-6 lg:grid-cols-3">
              {faqItems.map((item) => (
                <div key={getText(item.question)} className="rounded-2xl border border-white/10 bg-white/5 p-6">
                  <h3 className="text-lg font-semibold text-white">{getText(item.question)}</h3>
                  <p className="mt-3 text-sm text-gray-300">{getText(item.answer)}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="contact" className="bg-gradient-to-b from-black to-slate-950 py-20">
          <div className="mx-auto max-w-6xl px-6">
            <div className="rounded-3xl border border-white/10 bg-white/5 p-10 md:p-16">
              <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
                <div>
                  <p className="text-sm uppercase tracking-[0.3em] text-blue-300">Mission Access</p>
                  <h2 className="mt-3 text-3xl font-semibold md:text-4xl">{t.contactTitle}</h2>
                  <p className="mt-4 text-gray-300">{t.contactSubtitle}</p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-black/40 p-6">
                  <label className="text-xs uppercase tracking-[0.3em] text-blue-200">Email</label>
                  <input
                    className="mt-3 w-full rounded-lg border border-white/10 bg-black/60 px-4 py-3 text-sm text-white placeholder:text-gray-500"
                    placeholder="you@cosmos.uz"
                  />
                  <button className="mt-4 w-full rounded-lg bg-blue-500 py-3 text-sm font-semibold text-white transition hover:bg-blue-400">
                    {t.contactButton}
                  </button>
                  <p className="mt-3 text-xs text-gray-500">Biz spam yubormaymiz. Har oy yangilanishlar.</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-white/10 bg-black py-10">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-6 text-center text-sm text-gray-400 md:flex-row md:text-left">
          <p>{t.footerText}</p>
          <p>© 2024 Solar System Simulation. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default App;
