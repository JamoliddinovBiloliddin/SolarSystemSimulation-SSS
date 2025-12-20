import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const InfoPanel = ({ activeLayer, layersData }) => {
  // activeLayer is a string key like 'crust', 'mantle', etc.
  const data = layersData[activeLayer];

  if (!data) return null;

  return (
    <div className="absolute top-1/2 right-10 -translate-y-1/2 w-80 pointer-events-none z-10">
      <AnimatePresence mode='wait'>
        <motion.div
          key={activeLayer}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 50 }}
          transition={{ duration: 0.5 }}
          className="bg-black/60 backdrop-blur-md p-6 rounded-2xl border border-white/10 text-white shadow-2xl pointer-events-auto"
        >
          <h2 className="text-3xl font-bold mb-4 uppercase tracking-widest text-blue-400">
            {data.name}
          </h2>
          <div className="space-y-4">
            <InfoItem label="Depth" value={data.depth} unit="km" />
            <InfoItem label="Temp" value={data.temp} unit="°C" />
            <InfoItem label="Pressure" value={data.pressure} unit="GPa" />
            <InfoItem label="Density" value={data.density} unit="g/cm³" />
          </div>
          <p className="mt-6 text-sm text-gray-300 leading-relaxed">
            {data.description}
          </p>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

const InfoItem = ({ label, value, unit }) => (
  <div className="flex justify-between border-b border-white/10 pb-2">
    <span className="text-gray-400 font-medium">{label}</span>
    <span className="font-mono text-blue-200">
      {value} <span className="text-xs text-gray-500">{unit}</span>
    </span>
  </div>
);

export default InfoPanel;
